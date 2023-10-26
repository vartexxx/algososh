import renderer, {ReactTestRendererJSON} from 'react-test-renderer';
import {Button} from './button';
import {fireEvent, render, screen} from '@testing-library/react';
import Mock = jest.Mock;


describe('Тестирование компонента Button', (): void => {
    test('Компонент Button корректно рендерится с текстом', (): void => {
        const buttonText: string = 'Нажми меня';
        const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = renderer.create(<Button text={buttonText} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('Компонент Button корректно рендерится без текста', (): void => {
        const buttonText: string = '';
        const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = renderer.create(<Button text={buttonText} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('Компонент Button корректно рендерится в заблокированном состоянии', (): void => {
        const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = renderer.create(<Button disabled={true} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('Компонент Button корректно рендерится с индикатором загрузки', (): void => {
        const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = renderer.create(<Button isLoader={true} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('Компонент Button корректно отрабатывает callback', (): void => {
        const onClick: Mock<any, any> = jest.fn();
        const buttonText: string = 'Нажми меня';
        render(<Button text={buttonText} onClick={onClick} />);
        const link: HTMLElement = screen.getByText('Нажми меня');
        fireEvent.click(link);
        expect(onClick).toHaveBeenCalledTimes(1);
    })
})