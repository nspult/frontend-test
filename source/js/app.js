import '@babel/polyfill/dist/polyfill.js';

window.paramsApp = window.paramsApp ? window.paramsApp : {};
window.$ = window.jQuery = require("jquery");

import './plugins/dloading';
import './plugins/tooltip';

import './components/form';
import './_react_app/app';

