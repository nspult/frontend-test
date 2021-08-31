import { observable, computed, action } from 'mobx';
import { RouterStore } from 'mobx-router';

class AppStore {

    @observable numCompare = 0;
    @observable numFavorite = 0;

    @observable modals = [];
    @observable contentRoots = [];

    @observable screen = 'lg';

    @observable showCompareSuccess = false;
    @observable lastCompareProduct = null;
    @observable compareIntervalShow = null;


    constructor() {
        this.router = new RouterStore();
    }

    @computed get pageName() {
        switch (window.location.pathname) {
            case '/':
                return 'main';
            default:
                return '';
        }
    }

    @computed get isScreen() {
        return (screens) => {
            if (Array.isArray(screens) && screens.length) {
                if (screens.indexOf(this.screen) > -1) {
                    return true;
                }
            } else {
                if (screens === this.screen) {
                    return true;
                }
            }
            return false;
        }
    }

    @action changeScreen(screen) {
        this.screen = screen;
    }
}

export default AppStore;