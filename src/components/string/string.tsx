import {nanoid} from "nanoid";
import {ChangeEvent, FC, FormEvent, useState} from "react";
import {DELAY_IN_MS} from "../../constants/delays";
import {ElementStates, ElementTypes} from "../../types/element-states";
import {setDelay} from "../../utils/utils";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {Input} from "../ui/input/input";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import style from "./string.module.css";


const MAX_INPUT: 11 = 11;


export const StringComponent: FC = () => {
    const swap = (
        value: ElementTypes[],
        firstItem: number,
        secondItem: number
    ): [ElementTypes, ElementTypes] => {
        return ([value[firstItem], value[secondItem]] = [value[secondItem], value[firstItem],])
    };

    const [input, setInput] = useState('');
    const [loader, setLoader] = useState(false);
    const [array, setArray] = useState<Array<ElementTypes>>();

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInput(e.target.value);
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const newArray: { letter: string; state: ElementStates }[] = input.split('').map((letter: string): {
            letter: string;
            state: ElementStates
        } => {
            return {letter, state: ElementStates.Default};
        });
        setArray(newArray);
        setLoader(true);
        const end: number = newArray.length - 1;
        const mid: number = Math.floor(newArray.length / 2);

        for (let i: number = 0; i < mid; i++) {
            let j: number = end - i;
            if (i !== j) {
                newArray[i].state = ElementStates.Changing;
                newArray[j].state = ElementStates.Changing;
                setArray([...newArray]);
                await setDelay(DELAY_IN_MS);
            }
            swap(newArray, i, j);
            newArray[i].state = ElementStates.Modified;
            newArray[j].state = ElementStates.Modified;
            setArray([...newArray]);
        }
        setLoader(false);
        setInput('');
    };

    return (
        <SolutionLayout title="Строка" extraClass={style.container}>
            <form className={style.form} onSubmit={onSubmit}>
                <Input
                    maxLength={MAX_INPUT}
                    isLimitText
                    onChange={onChange}
                    value={input}
                />
                <Button
                    text="Развернуть"
                    isLoader={loader}
                    type="submit"
                    disabled={!input}
                />
            </form>
            <ul className={style.list}>
                {array ? array.map((item: ElementTypes) => (
                    <Circle key={nanoid()} letter={item.letter} state={item.state}/>
                )) : undefined}
            </ul>
        </SolutionLayout>
    );
};
