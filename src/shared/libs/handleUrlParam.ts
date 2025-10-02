export const handleUrlParam = (param: string, callback: () => void) => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get(param) !== null) {
        callback();
        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
    }
};
