let themeLink = document.createElement("link");
themeLink.setAttribute("rel", "stylesheet");
themeLink.setAttribute("type", "text/css");
const themeDirectory = './styles/themes/';
let themeSelectorOptions = document.getElementById("theme-selector");

export const switchTheme = () => {
    themeSelectorOptions.addEventListener("change", function () {
        const selectedThemeName = this.value;
        let themePath = `${themeDirectory}${selectedThemeName}.css`;
        themeLink.setAttribute("href", `${themePath}`);
        document.getElementsByTagName("head")[0].appendChild(themeLink);
        localStorage.setItem("theme", selectedThemeName);
    });
}

export const reloadTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme) {
        themeSelectorOptions.value = theme;
        themeLink.setAttribute("href", `${themeDirectory}${theme}.css`);
        document.getElementsByTagName("head")[0].appendChild(themeLink);
    } else {
        const defaultTheme = themeSelectorOptions.value;
        themeLink.setAttribute("href", `${themeDirectory}${defaultTheme}.css`);
        document.getElementsByTagName("head")[0].appendChild(themeLink);
    }
}
