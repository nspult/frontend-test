import 'bootstrap/js/dist/modal';

const Modal = (($) => {

    /**
     * ------------------------------------------------------------------------
     * Params
     * ------------------------------------------------------------------------
     */
    const Default = {
        dynamic: false,
        isLoading: false,
        patchTemplates: '/templates/modals/',
        templateName: ''
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    class Modal {

        linkTarget = null;

        constructor(modalId, options) {

            this.modalId = modalId;

            this.config = {
                ...this.constructor.Default,
                ...options
            };

            if (this.config.dynamic) {
                $(document).on('click', '[data-target="#' + this.modalId + '"]', (e) => {
                    if (!this.config.isLoading) {
                        e.preventDefault();
                        this.linkTarget = e.currentTarget;
                        this.open();
                    }
                });
            } else {
                this.settings(true);
            }
        }

        static get Default() {
            return Default
        }

        open() {
            if (this.config.dynamic && !this.config.isLoading) {
                this.load();
            } else {
                this.show();
            }
        }


        load() {
            $.ajax({
                type: "GET",
                url: this.config.patchTemplates + this.config.templateName + '.html',
                success: (template) => {
                    this.config.isLoading = true;

                    $('body').append(template);

                    this.settings(false);

                    this.config.isLoading = true;

                    this.show(true);
                    $('#' + this.modalId).on('show.bs.modal', this.config.afterShow);
                },
                error: function (data) {

                }
            });
        }

        settings(afterShow = true) {
            const $modal = $('#' + this.modalId);

            if (this.config.afterRender) {
                this.config.afterRender();
            }

            $modal.data('pult_modal', this);

            if (afterShow) {
                $modal.on('show.bs.modal', this.config.afterShow);
            }
        }

        show(showAfter = false) {
            $('#' + this.modalId).modal('show');

            if (showAfter && this.config.afterShow && this.linkTarget != null) {
                this.config.afterShow({
                    relatedTarget: this.linkTarget
                });
                this.linkTarget = null;
            }
        }
    }

    return Modal
})($);

export { Modal }
export default Modal;



