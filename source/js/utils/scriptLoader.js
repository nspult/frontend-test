export default function scriptLoader(scripts, callback) {

    let count = scripts.length;

    const urlCallback = function () {
        return function () {
            count--;
            if (count < 1 && callback && {}.toString.call(callback) === '[object Function]') {
                callback();
            }
        };
    };

    const loadScript = function (url) {
        const s = document.createElement('script');
        s.setAttribute('src', url);
        s.onload = urlCallback(url);
        document.body.appendChild(s);
    };
    for (let i = 0; i < scripts.length; i++) {
        loadScript(scripts[i]);
    }
}

