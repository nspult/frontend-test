const getViewPort = () => {
    if (typeof window !== 'undefined' && window.innerWidth) {
        return window.innerWidth;
    }
    return null;
};

export const defaultBreakpoints = [576, 768, 992, 1260];

export const getScreen = () => {
    let screenClass = 'xl';

    const viewport = getViewPort();
    
    if (viewport) {
        screenClass = 'xs';
        if (defaultBreakpoints[0] && viewport >= defaultBreakpoints[0]) screenClass = 'sm';
        if (defaultBreakpoints[1] && viewport >= defaultBreakpoints[1]) screenClass = 'md';
        if (defaultBreakpoints[2] && viewport >= defaultBreakpoints[2]) screenClass = 'lg';
        if (defaultBreakpoints[3] && viewport >= defaultBreakpoints[3]) screenClass = 'xl';
    }

    return screenClass;
};