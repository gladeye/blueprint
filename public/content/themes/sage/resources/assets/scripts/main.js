require("core-js");
require("../styles/main.scss");

document.addEventListener("DOMContentLoaded", require("./bootstrap").default);

if (module.hot) {
    module.hot.accept();
}
