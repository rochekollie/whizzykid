/**
 * Loads a resource from a specified path into a wrapper element.
 * @param {string} path The path to the resource to load.
 * @param {HTMLElement} wrapper The element to load the resource into.
 *
 * @returns {Promise<HTMLElement>} A promise that resolves with the loaded element.
 * @throws {Error} If the path is not a string.
 * @throws {Error} If the wrapper is not a HTMLElement.
 * */
export const load = (path, wrapper) => {
    if (typeof path !== 'string')
    {
        throw new Error('Path must be a string.');
    }
    if (!(wrapper instanceof HTMLElement))
    {
        throw new Error('Wrapper must be a HTMLElement.');
    }

    fetch(path)
        .then(r => r.text())
        .then(html => {
            wrapper.innerHTML = html;
            return wrapper;
        })
        .catch(e => {
            console.error(e);
        });
}

export const dynamicRoute = (pageName) => {
    const domain = "http://127.0.0.1:";
    const port = "8080"
    const url = `${ domain }${ port }/${ pageName }`;
    console.log(window.location.href);
    window.location = url;
}

export const generateStaticPage = () => {
    const e = document.createElement("h1");
    e.innerHTML = "Hello World";
    document.body.appendChild(e);
}
