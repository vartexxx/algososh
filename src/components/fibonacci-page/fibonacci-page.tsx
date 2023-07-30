import {nanoid} from "nanoid";
import {ChangeEvent, FC, FormEvent, useState} from "react";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {setDelay} from "../../utils/utils";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {Input} from "../ui/input/input";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from './fibonacci-page.module.css';
import {getFibonacciNumbers} from "./utils";


const [MAX_INPUT_VALUE, MIN_INPUT_VALUE]: number[] = [19, 1]


export const FibonacciPage: FC = () => {
    const [input, setInput] = useState('');
    const [loader, setLoader] = useState(false);
    const [array, setArray] = useState<Array<number>>();

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInput(e.target.value);
    };
    const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoader(true);
        const data: number[] = getFibonacciNumbers(Number(input));
        for (let i: number = 0; i < data.length; i++) {
            await setDelay(SHORT_DELAY_IN_MS);
            setArray(data.slice(0, i + 1));
        }
        setInput('');
        setLoader(false);
    };

    return (
        <SolutionLayout title="Последовательность Фибоначчи">
            <form className={styles.form} onSubmit={onSubmit}>
                <Input
                    max={Number(MAX_INPUT_VALUE)}
                    min={Number(MIN_INPUT_VALUE)}
                    type={'number'}
                    onChange={onChange}
                    value={input}
                    isLimitText
                />
                <Button
                    text="Рассчитать"
                    isLoader={loader}
                    type={"submit"}
                    disabled={
                        !input || Number(input) > Number(MAX_INPUT_VALUE) || Number(input) < Number(MIN_INPUT_VALUE)
                    }
                />
            </form>
            <ul className={styles.list}>
                {array ? array.map((item: number, index: number) => {
                    return <Circle letter={String(item)} index={index} key={nanoid()}/>;
                }) : undefined}
            </ul>
        </SolutionLayout>
    );
};
