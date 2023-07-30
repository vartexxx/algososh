import {nanoid} from "nanoid";
import {ChangeEvent, FC, useState} from "react";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {ElementStates} from "../../types/element-states";
import {setDelay} from "../../utils/utils";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {Input} from "../ui/input/input";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {stack} from "./Stack";
import style from "./stack-page.module.css";


const MAX_LENGTH: 4 = 4;


export const StackPage: FC = () => {
    const [input, setInput] = useState('');
    const [currIndex, setCurrIndex] = useState(0);
    const [loader, setLoader] = useState({
        add: false,
        delete: false,
        clear: false,
    });
    const [array, setArray] = useState<string[]>();

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInput(e.target.value);
    };

    const addElement = async (): Promise<void> => {
        setLoader({ ...loader, add: true });
        setCurrIndex(0);
        stack.push(input);
        setInput('');
        setArray([...stack.getElements()]);
        await setDelay(SHORT_DELAY_IN_MS);
        setCurrIndex(currIndex + 1);
        setLoader({ ...loader, add: false });
    };

    const deleteElement = async (): Promise<void> => {
        setLoader({ ...loader, delete: true });
        setCurrIndex(0);
        await setDelay(SHORT_DELAY_IN_MS);
        setCurrIndex(stack.getSize() - 1);
        stack.pop();
        setArray([...stack.getElements()]);
        setLoader({ ...loader, delete: false });
    };

    const clearElements = async (): Promise<void> => {
        setLoader({ ...loader, clear: true });
        setCurrIndex(0);
        await setDelay(SHORT_DELAY_IN_MS);
        stack.clear();
        setArray([...stack.getElements()]);
        setLoader({ ...loader, clear: false });
    };

    return (
        <SolutionLayout title="Стек">
            <div className={style.form}>
                <Input
                    maxLength={MAX_LENGTH}
                    onChange={onChange}
                    value={input}
                    isLimitText
                />
                <Button
                    disabled={!input}
                    onClick={addElement}
                    isLoader={loader.add}
                    text="Добавить"
                    type="button"
                />
                <Button
                    disabled={currIndex === 0}
                    onClick={deleteElement}
                    isLoader={loader.delete}
                    text="Удалить"
                    type="button"
                />
                <Button
                    disabled={currIndex === 0}
                    extraClass={style.button}
                    onClick={clearElements}
                    isLoader={loader.clear}
                    text="Очистить"
                    type="button"
                />
            </div>
            <ul className={style.list}>
                {array ? array.map((element: string, index: number) => {
                    return (
                        <Circle
                            key={nanoid()}
                            index={index}
                            letter={element}
                            state={
                                index === currIndex ? ElementStates.Changing : ElementStates.Default
                            }
                            head={stack.getSize() - 1 === index ? "top" : ''}
                        />
                    );
                }) : undefined}
            </ul>
        </SolutionLayout>
    );
};
