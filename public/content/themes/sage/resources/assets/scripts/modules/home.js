import Application from "libs/Application";

const app = Application.instance();

app.on('class:home', () => {
    console.log('home');
});
