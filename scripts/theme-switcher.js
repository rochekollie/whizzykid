// Create a link element to fetch the dark-mode.css file
let theme = document.createElement("link");
theme.setAttribute("rel", "stylesheet");
theme.setAttribute("type", "text/css");
const themeDirectory = './styles/themes/';
let themeName = '';

// Get the theme element and assign it to a variable
let themeSelector = document.getElementById("theme-selector");

//Load dark-mode.css file when the user selects the dark-mode option
themeSelector.addEventListener("change", function () {
    themeName = themeSelector.value;
    theme.setAttribute("href", `${themeDirectory}${themeName}.css`);
    if (themeSelector.value) {
        document.getElementsByTagName("head")[0].appendChild(theme);
    } else {
        document.getElementsByTagName("head")[0].removeChild(theme);
    }
    // Save the user's choice to local storage
    localStorage.setItem("theme", themeName);
});


const getThemeName = () => {

}

window.onload = () => {
    // Load the user's choice from local storage
    themeName = localStorage.getItem("theme");
    if (themeName) {
        theme.setAttribute("href", `${themeDirectory}${themeName}.css`);
        document.getElementsByTagName("head")[0].appendChild(theme);
        console.log(`${themeName} theme is loaded from local storage`);
    } else {
        // else load the first option as the default theme
        theme.setAttribute("href", `${themeDirectory}${themeSelector.value}.css`);
        document.getElementsByTagName("head")[0].appendChild(theme);
        console.log(`${themeSelector.value} theme is set as default`);
    }
};
