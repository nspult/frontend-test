import scriptLoader from "../utils/scriptLoader";


window.paramsApp = window.paramsApp ? window.paramsApp : {};


/**
 * Google ReCaptcha
 */

const Recapcha = (($) => {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    const SELECTOR = '.js-recapcha';

    const DATA_KEY = 'pult.recapcha';

    const Default = {
        siteKey: window.paramsApp.reCapchaKey !== undefined ? window.paramsApp.reCapchaKey : null
    };

    let loadingScript = false;

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    class Recapcha {

        constructor(selector, options) {

            this.config = {
                ...this.constructor.Default,
                ...$(selector).data(),
                ...options
            };

            this.$selector = $(selector);

            this.$selector.data(this.constructor.DATA_KEY, this);

            const id = this.$selector.attr('id');

            if (this.config.siteKey !== null) {

                const idCaptcha = grecaptcha.render(id, {
                    'sitekey': this.config.siteKey,
                    'theme': 'light',
                    'callback': () => {
                        this.$selector
                            .parent()
                            .find('.invalid-feedback')
                            .remove();
                    }
                });

                this.$selector.data('grecaptchaId', idCaptcha);
            }

        }

        static get Default() {
            return Default
        }

        static get DATA_KEY() {
            return DATA_KEY
        }


        validation() {
            const captcha = this.$selector.find('[name="g-recaptcha-response"]');

            if (!captcha.length) {
                return false;
            }

            if (!captcha.val().length) {
                const error = this.$selector.parent().find('.invalid-feedback');

                if (!error.length) {
                    this.$selector.parent().append(
                        '<label class="invalid-feedback">Пройдите проверку "Я не робот"</label>'
                    );
                }
                return false;
            } else {
                return true;
            }
        }

        getData() {

            if (!this.validation()) {
                return false;
            }

            const id = this.$selector.data('grecaptchaId');

            if (typeof id === 'undefined') {
                return false;
            }

            return {
                'g-recaptcha-response': grecaptcha.getResponse(id),
            };
        }

        reset() {
            const id = this.$selector.data('grecaptchaId');

            if (typeof id === 'undefined') {
                return false;
            }
            grecaptcha.reset(id);
        }

        static init($selectorBox = $('body')) {
            let items = $selectorBox.find(SELECTOR);
            if (items.length) {
                if (window.grecaptcha !== undefined) {

                    items.each((key, item) => {
                        let data = $(item).data(DATA_KEY);
                        if (!data) {
                            new Recapcha($(item), {});
                        }
                    });

                } else {
                    if (!loadingScript) {
                        scriptLoader(
                            ['https://www.google.com/recaptcha/api.js?onload=pultRecapchaLoad&render=explicit']);
                        loadingScript = true;
                    }
                }
            }
        }

        static getReCapchaForm($selectorForm) {
            const selectElement = $selectorForm.find(SELECTOR);

            if (!selectElement.length) {
                return false;
            }

            let data = selectElement.data(DATA_KEY);

            if (data) {
                return data;
            }
        }

        static getReCapchaID(idElement) {

            if (!$(idElement).length) {
                return false;
            }

            let data = $(idElement).data(DATA_KEY);

            if (data) {
                return data;
            }
        }
    }

    window.pultRecapchaLoad = function () {
        Recapcha.init();
        loadingScript = false;
    };

    $(document).ready(function () {
        Default.siteKey = window.paramsApp.reCapchaKey !== undefined ? window.paramsApp.reCapchaKey : null;
        Recapcha.init();
    });

    return Recapcha;
})($);



export default Recapcha;