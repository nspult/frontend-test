import React from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ Component, container, ...props }) => {

    const [innerHtmlEmptied, setInnerHtmlEmptied] = React.useState(false);

    React.useEffect(() => {
        if (!innerHtmlEmptied) {
            container.innerHTML = '';
            setInnerHtmlEmptied(true)
        }
    }, [innerHtmlEmptied]);

    if (!innerHtmlEmptied) {
        return null
    }
    return ReactDOM.createPortal(<Component {...props} />, container)
};

export default Portal;