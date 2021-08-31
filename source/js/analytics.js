
/**
 * Events:
 * form-submit-success-audition
 * form-submit-success-callback
 * form-submit-success-reducePrice
 * form-submit-success-subscribe
 * form-submit-success-services
 * form-submit-success-qexpert
 * form-submit-success-oneclick
 * form-submit-success-card-registration
 *
 */

export default class Analytics {

    static sentEvent(name, params) {
        if (window.dataLayer) {
            dataLayer.push({'event': name, ...params});
        }
    }

}