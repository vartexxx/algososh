import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FibonacciPage} from "../fibonacci-page/fibonacci-page";
import {ListPage} from "../list-page/list-page";
import {MainPage} from "../main-page/main-page";
import {QueuePage} from "../queue-page/queue-page";
import {StringComponent} from "../string/string";
import {SortingPage} from "../sorting-page/sorting-page";
import {StackPage} from "../stack-page/stack-page";
import styles from './app.module.css';
import {
    FIBONACCI_PAGE,
    LIST_PAGE,
    MAIN_PAGE,
    QUEUE_PAGE,
    SORTING_PAGE,
    STACK_PAGE,
    STRING_PAGE
} from "../../constants/routes";


export const App = () => {
    return (
        <div className={styles.app}>
            <BrowserRouter>
                <Routes>
                    <Route path={MAIN_PAGE} element={<MainPage />} />
                    <Route path={STRING_PAGE} element={<StringComponent />} />
                    <Route path={FIBONACCI_PAGE} element={<FibonacciPage />} />
                    <Route path={SORTING_PAGE} element={<SortingPage />} />
                    <Route path={STACK_PAGE} element={<StackPage />} />
                    <Route path={QUEUE_PAGE} element={<QueuePage />} />
                    <Route path={LIST_PAGE} element={<ListPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
