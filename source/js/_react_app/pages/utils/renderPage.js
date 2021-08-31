import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

const renderPage = (Component, root, stores, store) => {
    document.addEventListener('DOMContentLoaded', function () {
        ReactDOM.render(
            <Provider store={store} {...stores}>
                {Component}
            </Provider>,
            document.getElementById(root)
        );
    });
};

export default renderPage;