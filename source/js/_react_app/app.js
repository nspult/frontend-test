import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';

import App from './views/app/App';
import AppStore from './stores/AppStore';

const appStore = new AppStore();

if (window.paramsApp !== undefined) {
    if (window.paramsApp.numCompare !== undefined) {
        appStore.numCompare = parseInt(window.paramsApp.numCompare);
    }
    if (window.paramsApp.numFavorite !== undefined) {
        appStore.numFavorite = parseInt(window.paramsApp.numFavorite);
    }
}

const stores = {
    appStore: appStore
};

window.appStore = appStore;

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <Provider store={appStore} {...stores}>
            <App/>
        </Provider>,
        document.getElementById('root-app-content')
    );
});
