import $ from 'jquery'
import "jquery-validation"

import '../plugins/dloading';

import Recapcha from './recapcha';

$.validator.addMethod('telephone', function (value) {
    return value.replace(/-/gi, '')
        .replace(/ /gi, '')
        .replace(/\(/gi, '')
        .replace(/\)/gi, '')
        .replace(/1231231$/gi, '')
        .replace(/1234567$/gi, '')
        .replace(/1111111$/gi, '')
        .replace(/2222222$/gi, '')
        .replace(/3333333$/gi, '')
        .replace(/4444444$/gi, '')
        .replace(/5555555$/gi, '')
        .replace(/6666666$/gi, '')
        .replace(/7777777$/gi, '')
        .replace(/8888888$/gi, '')
        .replace(/9999999$/gi, '')
        .replace(/0000000$/gi, '')
        .match(/^\+{0,1}7\d{10}$/);
}, 'Укажите номер мобильного телефона');

$.extend($.validator.messages, {
    required: "Поле обязательно для заполнения",
    email: "Укажите корректный email"
});

const Form = (($) => {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    const Default = {
        validate: {
            rules: {},
            messages: {},
        },
        selectorError: '.form-main-error',
        fnAction: null,
        submitBefore: null,
        submitAfter: null,
        successShowModal: true,
        successReload: false,
        successReloadTimeOut: 0,
        successCallback: null,
        setUserLoginData: false
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    class Form {

        constructor(formSelector, options) {

            this.formSelector = formSelector;

            this.config = {
                ...this.constructor.Default,
                ...options
            };

            this.formSelector.validate({
                errorClass: "invalid-feedback",
                errorElement: "span",
                rules: this.config.validate.rules,
                messages: this.config.validate.messages,
                highlight: (element) => {
                    $(element).addClass('is-invalid');
                },
                unhighlight: (element) => {
                    $(element).removeClass('is-invalid');
                },
                errorPlacement: (error, element) => {
                    if (element.hasClass('custom-control-input')) {
                        $(element).parent().append(error);
                    } else {
                        $(element).parent().append(error);
                    }
                },
                submitHandler: () => {
                    this.submit();
                    return false;
                }
            });

            Recapcha.init(this.formSelector);

            this.selectorError = this.formSelector.find(this.config.selectorError);


            if (this.config.setUserLoginData) {
                this.setUserLogin();
            }
        }

        static get Default() {
            return Default
        }

        submit() {
            if (this.config.fnAction === null) {
                return false;
            }

            let params = this.formSelector.serialize();
            let paramsOb = this.formSelector.serializeObject();

            const recapcha = Recapcha.getReCapchaForm(this.formSelector);

            if (recapcha) {
                if (!recapcha.validation()) {
                    return false;
                }
            }

            this.formSelector.dloading('show');
            this.selectorError
                .text('')
                .hide();


            const filesInt = this.formSelector.find('input[type="file"]');
            let files = {};
            if (filesInt.length) {
                params = paramsOb;
                files = {
                    fileName: $(filesInt[0]).attr('name'),
                    file: $(filesInt[0]).prop('files')[0]
                }
            }

            if (this.config.submitBefore) {
                this.config.submitBefore(paramsOb, files)
            }

            this.config.fnAction(params, files, paramsOb).then((data) => {

                this.success(data);

                if (this.config.submitAfter) {
                    this.config.submitAfter(data, paramsOb)
                }

            }, (error) => {

                if (recapcha) {
                    recapcha.reset()
                }

                let data = error.data;
                if (data.error !== undefined && data.error.message !== undefined) {
                    this.selectorError
                        .text(data.error.message)
                        .show();
                }
            }).finally(() => {
                this.formSelector.dloading('hide');
            });
        }

        success(data) {
            const $modal = this.formSelector.parents('.modal');

            if (this.config.successShowModal && data.modal !== undefined) {
                this.showModalSuccess($modal, data);
            }

            if (this.config.successReload) {
                setTimeout(() => {
                    this.successReload($modal);
                }, this.config.successReloadTimeOut);
            }

            if ({}.toString.call(this.config.successCallback) === '[object Function]') {
                this.config.successCallback($modal, data);
            }
        }

        showModalSuccess($modal, data) {
            if ($modal.length) {
                $modal.find('.modal-title').eq(1).hide();
                $modal.find('.modal-title').text(data.modal.header);

                $modal.addClass('show-success');

                let inner = $modal.find('.modal-inner');

                if (inner.length) {
                    inner.html('<div class="modal-body"><p>' + data.modal.message + '</p></div>');
                } else {
                    $modal.find('.modal-body').html('<p>' + data.modal.message + '</p>');
                }

                $modal.on('hidden.bs.modal', this.removeModal);
            }
        }

        removeModal(e) {
            if (e.currentTarget) {
                const modal = $(e.currentTarget);
                const mod = modal.data('pult_modal');
                modal.remove();
                if (mod) {
                    mod.config.isLoading = false;
                }
            }
        }

        successReload($modal) {
            if ($modal.length) {
                $modal.modal('hide')
            }
            $('body')
                .dloading({isfix: true})
                .dloading('show');

            location.reload();
        }


        setUserLogin() {
            if (paramsApp && paramsApp.user) {
                const params = ['name', 'email', 'phone'];
                const {user} = paramsApp;
                if (user.login) {
                    params.map((item) => {
                        if (user[item] && user[item].length) {
                            let line = $(this.formSelector).find('input[name="' + item + '"]');
                            if (line.length) {
                                line.val(user[item]);
                            }
                        }
                    });
                }
            }
        }
    }

    return Form
})($);


$.fn.serializeObject = function () {
    const o = {};
    const a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

export default Form;


