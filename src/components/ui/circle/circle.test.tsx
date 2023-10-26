import renderer, {ReactTestRendererJSON} from "react-test-renderer";
import {Circle} from "./circle";
import {ElementStates} from "../../../types/element-states";


describe('Тестирование компонента Circle', (): void => {
    test('Компонент Circle корректно рендерится без буквы', (): void => {
        const letter: string = '';
        const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = renderer.create(<Circle letter={letter} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('Компонент Circle корректно рендерится с буквами', (): void => {
        const letter: string = 'Буквы';
        const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = renderer.create(<Circle letter={letter} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('Компонент Circle корректно рендерится с head', (): void => {
        const head: string = 'head';
        const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = renderer.create(<Circle head={head} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('Компонент Circle корректно рендерится с react-элементом в head', (): void => {
        const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = renderer.create(<Circle head={<Circle letter={'letter'} />} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('Компонент Circle корректно рендерится с tail', (): void => {
        const tail: string = 'tail';
        const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = renderer.create(<Circle tail={tail} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('Компонент Circle корректно рендерится с react-элементом в tail', (): void => {
        const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = renderer.create(<Circle tail={<Circle letter={'letter'} />} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('Компонент Circle корректно рендерится с index', (): void => {
        const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = renderer.create(<Circle index={0} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('Компонент Circle корректно рендерится с пропсом isSmall == true', (): void => {
        const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = renderer.create(<Circle isSmall={true} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('Компонент Circle корректно рендерится в состоянии default', (): void => {
        const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null  = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('Компонент Circle корректно рендерится в состоянии changing', (): void => {
        const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null  = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('Компонент Circle корректно рендерится в состоянии modified', (): void => {
        const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null  = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
})