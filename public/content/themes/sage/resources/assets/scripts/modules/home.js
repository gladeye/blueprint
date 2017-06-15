import Application from "lib/Application";

const app = Application.instance();

app.on('class:home', () => {
    console.log('home');
});
