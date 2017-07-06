import Application from "~/libs/Application";
import "~/modules/home";

const app = Application.instance();

export default function() {
    app.start();
}
