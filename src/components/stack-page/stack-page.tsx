import { ChangeEvent, FC, useState } from "react";
import { nanoid } from "nanoid";
import style from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { stack } from "./Stack";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import {setDelay} from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: FC = () => {
    const [inputValue, setInputValue] = useState("");
    const [currIndex, setCurrIndex] = useState(0);
    const [loader, setLoader] = useState({
        add: false,
        delete: false,
        clear: false,
    });
    const [array, setArray] = useState<string[]>();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const addElement = async () => {
        setLoader({ ...loader, add: true });
        stack.push(inputValue);
        setInputValue("");
        setArray([...stack.getElements()]);
        await setDelay(SHORT_DELAY_IN_MS);
        setCurrIndex(currIndex + 1);
        setLoader({ ...loader, add: false });
    };

    const deleteElement = async () => {
        setLoader({ ...loader, delete: true });
        setCurrIndex(stack.getSize() - 1);
        await setDelay(SHORT_DELAY_IN_MS);
        stack.pop();
        setArray([...stack.getElements()]);
        setLoader({ ...loader, delete: false });
    };

    const clearElements = async () => {
        setLoader({ ...loader, clear: true });
        await setDelay(SHORT_DELAY_IN_MS);
        stack.clear();
        setArray([...stack.getElements()]);
        setCurrIndex(0)
        setLoader({ ...loader, clear: false });
    };

    return (
        <SolutionLayout title="Стек">
            <div className={style.form}>
                <Input
                    maxLength={4}
                    isLimitText
                    onChange={onChange}
                    value={inputValue}
                />
                <Button
                    text="Добавить"
                    type="button"
                    disabled={!!!inputValue}
                    onClick={addElement}
                    isLoader={loader.add}
                />
                <Button
                    text="Удалить"
                    type="button"
                    disabled={currIndex === 0}
                    onClick={deleteElement}
                    isLoader={loader.delete}
                />
                <Button
                    text="Очистить"
                    type="button"
                    disabled={currIndex === 0}
                    extraClass={style.button}
                    onClick={clearElements}
                    isLoader={loader.clear}
                />
            </div>
            <ul className={style.symbolList}>
                {array?.map((element, index) => {
                    return (
                        <Circle
                            key={nanoid()}
                            index={index}
                            letter={element}
                            state={
                                index === currIndex
                                    ? ElementStates.Changing
                                    : ElementStates.Default
                            }
                            head={stack.getSize() - 1 === index ? "top" : ""}
                        />
                    );
                })}
            </ul>
        </SolutionLayout>
    );
};