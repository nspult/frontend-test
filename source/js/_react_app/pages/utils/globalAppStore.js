import AppStore from "../../stores/AppStore";

const globalAppStore = window && window.appStore ? window.appStore : new AppStore();

export default globalAppStore;