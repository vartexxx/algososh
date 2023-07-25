import {nanoid} from "nanoid";
import {ChangeEvent, FC, useState} from "react";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {HEAD, TAIL} from "../../constants/element-captions";
import {ElementStates} from "../../types/element-states";
import {setDelay} from "../../utils/utils";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {Input} from "../ui/input/input";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {queue} from "./Queue";
import style from "./queue-page.module.css";


export const QueuePage: FC = () => {
    const [input, setInput] = useState('');
    const [array, setArray] = useState<string[]>(queue.getElements());
    const [currIndex, setCurrIndex] = useState<number | null>(null);
    const [loader, setLoader] = useState({
        add: false,
        delete: false,
        clear: false,
    });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const addElement = async (): Promise<void> => {
        setLoader({ ...loader, add: true });
        setCurrIndex(queue.getTail());
        await setDelay(SHORT_DELAY_IN_MS);
        queue.enqueue(input);
        setArray([...queue.getElements()]);
        setInput("");
        setCurrIndex(null);
        setLoader({ ...loader, add: false });
    };

    const deleteElement = async (): Promise<void> => {
        setLoader({ ...loader, delete: true });
        setCurrIndex(queue.getHead());
        await setDelay(SHORT_DELAY_IN_MS);
        queue.dequeue();
        setArray([...queue.getElements()]);
        if (queue.isEmpty()) {
            queue.clear();
        }
        setCurrIndex(null);
        setLoader({ ...loader, delete: false });
    };

    const clearElements = async (): Promise<void> => {
        setLoader({ ...loader, clear: true });
        await setDelay(SHORT_DELAY_IN_MS);
        queue.clear();
        setArray([...queue.getElements()]);
        setLoader({ ...loader, clear: false });
    };

    return (
        <SolutionLayout title="Очередь">
            <div className={style.form}>
                <Input
                    maxLength={4}
                    onChange={onChange}
                    value={input}
                    disabled={queue.isFull()}
                    isLimitText
                />
                <Button
                    onClick={addElement}
                    isLoader={loader.add}
                    disabled={!input || queue.isFull()}
                    text="Добавить"
                    type="button"
                />
                <Button
                    onClick={deleteElement}
                    isLoader={loader.delete}
                    disabled={queue.isEmpty()}
                    text="Удалить"
                    type="button"
                />
                <Button
                    onClick={clearElements}
                    extraClass={style.button}
                    isLoader={loader.clear}
                    disabled={queue.isEmpty()}
                    text="Очистить"
                    type="button"
                />
            </div>
            <ul className={style.list}>
                {array?.map((element: string, index: number) => {
                    return (
                        <Circle
                            key={nanoid()}
                            index={index}
                            letter={element}
                            state={
                                index === currIndex  ? ElementStates.Changing : ElementStates.Default
                            }
                            head={
                                index === queue.getHead() && !queue.isEmpty() ? HEAD : ''
                            }
                            tail={
                                index === queue.getTailIndex() && !queue.isEmpty()  ? TAIL : ''
                            }
                        />
                    );
                })}
            </ul>
        </SolutionLayout>
    );
};
