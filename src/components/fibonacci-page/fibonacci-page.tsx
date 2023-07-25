import {ChangeEvent, FC, FormEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {setDelay} from "../../utils/utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from './fibonacci-page.module.css';
import {Circle} from "../ui/circle/circle";
import {nanoid} from "nanoid";

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
        const solve = (n: number): number[] => {
            let arr: number[] = [1, 1];
            for (let i: number = 2; i < n + 1; i++) {
                arr.push(arr[i - 2] + arr[i - 1]);
            }
            return arr;
        };
        const data: number[] = solve(Number(input));
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
                    max={19}
                    min={1}
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
                        !input || Number(input) > 19 || Number(input) < 1
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
