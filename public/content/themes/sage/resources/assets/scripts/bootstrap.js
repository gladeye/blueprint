import Application from "lib/Application";
import "modules/home";

const app = Application.instance();

export default function() {
    app.start();
}
