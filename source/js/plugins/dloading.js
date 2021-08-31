/* ========================================================================
 * Plugins DLoading
 * Vadim Lisicyn
 * ======================================================================== */

(function ($) {
    'use strict';


    // SLTABS CLASS DEFINITION
    // ======================

    var DLoading = function (element, options) {

        this.options = $.extend({}, DLoading.DEFAULTS, options);
        this.$element = $(element);

        var pos = this.$element.css('position');

        if (pos !== 'absolute' && pos !== 'relative') {
            this.$element.css('position', 'relative');
        }

        if(!this.$element.children('.dloading-spinner').length){
            this.$element.append('<div class="dloading-spinner"></div>');
        }
    };

    DLoading.DEFAULTS = {
        isfix: false
    };

    DLoading.prototype.show = function () {

        var snippet = this.$element.find('>.dloading-spinner');

        if (snippet.length === 0) {
            snippet = $('<div class="dloading-spinner"></div>');
            this.$element.append(snippet);
        }

        if (this.options.isfix) {
            snippet.addClass('dloading-spinner-fix');
        }

        this.$element.addClass('dloading-box-active');
        snippet.show();
    };

    DLoading.prototype.hide = function () {

        var snippet = this.$element.find('>.dloading-spinner');

        if (snippet.length) {
            snippet.hide();
        }
        this.$element.removeClass('dloading-box-active');

    };


    // TAB PLUGIN DEFINITION
    // =====================

    function Plugin(option) {

        return this.each(function () {
            var $this = $(this);
            var data = $this.data('bs.dloading');

            if (!data) {
                $this.data('bs.dloading', (data = new DLoading(this, option)));
            }

            if (typeof option === 'string') {
                data[option].call(data)
            }
        })
    }


    var old = $.fn.dloading;

    $.fn.dloading = Plugin;
    $.fn.dloading.Constructor = DLoading;

    $.fn.dloading.noConflict = function () {
        $.fn.dloading = old;
        return this
    }
})(jQuery);
