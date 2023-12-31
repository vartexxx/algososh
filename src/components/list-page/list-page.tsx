import {nanoid} from "nanoid";
import {ChangeEvent, FC, useState} from "react";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {CirclePosition, CircleState, ElementStates} from "../../types/element-states";
import {setDelay} from "../../utils/utils";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {Input} from "../ui/input/input";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {linkedList, NodeType} from "./List";
import style from "./list-page.module.css";


const [MIN_INPUT_VALUE, MAX_INPUT_VALUE, MAX_LENGTH]: number[] = [0, 7, 4];


export const ListPage: FC = () => {
    const setCircleState = (
        index: number,
        circleState: CircleState
    ): ElementStates => {
        return circleState.modifiedIndex === index
            ? ElementStates.Modified
            : circleState.changingIndex >= index
                ? ElementStates.Changing
                : ElementStates.Default;
    };
    const [state, setState] = useState({
        modifiedIndex: -1,
        changingIndex: -1,
    });
    const [array, setArray] = useState<NodeType<string>[]>(linkedList.getArray());
    const [loader, setLoader] = useState({
        addToHead: false,
        addToTail: false,
        deleteInHead: false,
        deleteInTail: false,
        addToIndex: false,
        deleteToIndex: false,
        disabled: false,
    });
    const [circleIndex, setCircleIndex] = useState(-1);
    const [position, setPosition] = useState<CirclePosition>();
    const [currentValue, setCurrentValue] = useState("");
    const [inputValue, setInputValue] = useState({
        value: "",
        index: "",
    });

    const addToFront = async (): Promise<void> => {
        setLoader({ ...loader, addToHead: true, disabled: true });
        setCurrentValue(inputValue.value);
        setCircleIndex(0);
        setPosition(CirclePosition.head);
        await setDelay(SHORT_DELAY_IN_MS);
        setCircleIndex(-1);
        linkedList.addToFront(inputValue.value);
        setArray([...linkedList.getArray()]);
        setState({ ...state, modifiedIndex: 0 });
        await setDelay(SHORT_DELAY_IN_MS);
        setState({ ...state, modifiedIndex: -1 });
        setInputValue({ value: "", index: "" });
        setLoader({ ...loader, addToHead: false, disabled: false });
    };

    const addToEnd = async (): Promise<void> => {
        setLoader({ ...loader, addToTail: true, disabled: true });
        setCurrentValue(inputValue.value);
        setCircleIndex(linkedList.getSize() - 1);
        setPosition(CirclePosition.head);
        await setDelay(SHORT_DELAY_IN_MS);
        setCircleIndex(-1);
        linkedList.addToEnd(inputValue.value);
        setArray([...linkedList.getArray()]);
        setState({ ...state, modifiedIndex: linkedList.getSize() - 1 });
        await setDelay(SHORT_DELAY_IN_MS);
        setState({ ...state, modifiedIndex: -1 });
        setInputValue({ value: "", index: "" });
        setLoader({ ...loader, addToTail: false, disabled: false });
    };

    const deleteAtFront = async (): Promise<void> => {
        setLoader({ ...loader, deleteInHead: true, disabled: true });
        setCurrentValue(linkedList.getFirst()!.val);
        linkedList.getFirst()!.val = "";
        setCircleIndex(0);
        setPosition(CirclePosition.tail);
        await setDelay(SHORT_DELAY_IN_MS);
        linkedList.deleteAtFront();
        setCircleIndex(-1);
        setArray([...linkedList.getArray()]);
        await setDelay(SHORT_DELAY_IN_MS);
        setInputValue({ value: "", index: "" });
        setLoader({ ...loader, deleteInHead: false, disabled: false });
    };

    const deleteAtEnd = async (): Promise<void> => {
        setLoader({ ...loader, deleteInTail: true, disabled: true });
        setCurrentValue(linkedList.getLast()!.val);
        linkedList.getLast()!.val = "";
        setCircleIndex(linkedList.getSize() - 1);
        setPosition(CirclePosition.tail);
        await setDelay(SHORT_DELAY_IN_MS);
        linkedList.deleteAtEnd();
        setCircleIndex(-1);
        setArray([...linkedList.getArray()]);
        await setDelay(SHORT_DELAY_IN_MS);
        setInputValue({ value: "", index: "" });
        setLoader({ ...loader, deleteInTail: false, disabled: false });
    };

    const addAtIndex = async (): Promise<void> => {
        setLoader({ ...loader, addToIndex: true, disabled: true });
        for (let i: number = -1; i <= Number(inputValue.index); i++) {
            setCurrentValue(inputValue.value);
            setPosition(CirclePosition.head);
            setCircleIndex(i);
            setState({ ...state, changingIndex: i - 1 });
            await setDelay(SHORT_DELAY_IN_MS);
        }
        linkedList.addAtIndex(Number(inputValue.index), inputValue.value);
        setCircleIndex(-1);
        setArray([...linkedList.getArray()]);
        setState({ ...state, modifiedIndex: Number(inputValue.index) });
        await setDelay(SHORT_DELAY_IN_MS);
        setState({ ...state, modifiedIndex: -1 });
        setInputValue({ value: "", index: "" });
        setLoader({ ...loader, addToIndex: false, disabled: false });
    };

    const deleteAtIndex = async (): Promise<void> => {
        setLoader({ ...loader, deleteToIndex: true, disabled: true });
        for (let i: number = 0; i <= Number(inputValue.index); i++) {
            setState({ ...state, changingIndex: i });
            await setDelay(SHORT_DELAY_IN_MS);
        }
        setState({ ...state, changingIndex: Number(inputValue.index) - 1 });
        setCurrentValue(
            String(linkedList.getAtIndex(Number(inputValue.index))?.val)
        );
        linkedList.getAtIndex(Number(inputValue.index))!.val = "";
        setArray([...linkedList.getArray()]);
        setCircleIndex(Number(inputValue.index));
        setPosition(CirclePosition.tail);
        linkedList.deleteAtIndex(Number(inputValue.index));
        await setDelay(SHORT_DELAY_IN_MS);
        setArray([...linkedList.getArray()]);
        setState({ ...state, changingIndex: -1 });
        setCircleIndex(-1);
        setInputValue({ value: "", index: "" });
        setLoader({ ...loader, deleteToIndex: false, disabled: false });
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    };

    const showHeadCircle = (index: number): JSX.Element | string | undefined => {
        if (circleIndex === index && position === CirclePosition.head) {
            return (
                <Circle isSmall letter={currentValue} state={ElementStates.Changing} />
            );
        } else if (index === 0) {
            return "head";
        }
        return undefined;
    };

    const showTailCircle = (index: number): JSX.Element | string | undefined => {
        if (circleIndex === index && position === CirclePosition.tail) {
            return (
                <Circle isSmall letter={currentValue} state={ElementStates.Changing} />
            );
        } else if (index === array.length - 1) {
            return "tail";
        }
        return undefined;
    };

    return (
        <SolutionLayout title="Связный список">
            <div className={style.form}>
                <div className={style.form__container}>
                    <Input
                        maxLength={MAX_LENGTH}
                        isLimitText
                        placeholder="Введите значение"
                        name="value"
                        value={inputValue.value}
                        onChange={onChange}
                    />
                    <Button
                        type="button"
                        text="Добавить в head"
                        extraClass={`${style.button} ${style.button_size_small}`}
                        onClick={addToFront}
                        disabled={
                            !inputValue.value || loader.disabled || array.length === Number(MAX_INPUT_VALUE)
                        }
                        isLoader={loader.addToHead}
                    />
                    <Button
                        type="button"
                        text="Добавить в tail"
                        extraClass={`${style.button} ${style.button_size_small}`}
                        onClick={addToEnd}
                        disabled={
                            !inputValue.value || loader.disabled || array.length === Number(MAX_INPUT_VALUE)
                        }
                        isLoader={loader.addToTail}
                    />
                    <Button
                        type="button"
                        text="Удалить из head"
                        extraClass={`${style.button} ${style.button_size_small}`}
                        onClick={deleteAtFront}
                        disabled={!array || loader.disabled || array.length === Number(MIN_INPUT_VALUE)}
                        isLoader={loader.deleteInHead}
                    />
                    <Button
                        type="button"
                        text="Удалить из tail"
                        extraClass={`${style.button} ${style.button_size_small}`}
                        onClick={deleteAtEnd}
                        disabled={!array || loader.disabled || array.length === Number(MIN_INPUT_VALUE)}
                        isLoader={loader.deleteInTail}
                    />
                </div>
                <div className={style.form__container}>
                    <Input
                        type="number"
                        placeholder="Введите индекс"
                        name="index"
                        min={MIN_INPUT_VALUE}
                        max={array.length - 1}
                        value={inputValue.index}
                        onChange={onChange}
                    />
                    <Button
                        type="button"
                        text="Добавить по индексу"
                        extraClass={`${style.button} ${style.button_size_large}`}
                        onClick={addAtIndex}
                        disabled={
                            !(inputValue.index && inputValue.value) ||
                            loader.disabled ||
                            Number(inputValue.index) > array.length - 1 ||
                            Number(inputValue.index) < Number(MIN_INPUT_VALUE)
                        }
                        isLoader={loader.addToIndex}
                    />
                    <Button
                        type="button"
                        text="Удалить по индексу"
                        extraClass={`${style.button} ${style.button_size_large}`}
                        onClick={deleteAtIndex}
                        disabled={
                            !inputValue.index ||
                            loader.disabled ||
                            Number(inputValue.index) > array.length - 1 ||
                            Number(inputValue.index) < Number(MIN_INPUT_VALUE)
                        }
                        isLoader={loader.deleteToIndex}
                    />
                </div>
            </div>
            <ul className={style.symbolList}>
                {array ? array.map((item: NodeType<string>, index: number) => {
                    return (
                        <li className={style.symbolList__item} key={nanoid()}>
                            <Circle
                                extraClass={style.circle}
                                index={index}
                                letter={item.val}
                                state={setCircleState(index, state)}
                                head={showHeadCircle(index)}
                                tail={showTailCircle(index)}
                            />
                            {index !== array.length - 1 && <ArrowIcon/>}
                        </li>
                    );
                }) : undefined}
            </ul>
        </SolutionLayout>
    );
};
