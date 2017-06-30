import EventEmitter from "./EventEmitter";

let instance;

export default class Application extends EventEmitter {

    static instance() {
        if(instance) return instance;
        return instance = new Application();
    }

    constructor() {
        if(instance) {
            throw new SyntaxError('Application is singleton, use Application.instance() instead');
        }

        super();
    }

    start() {
        this.emit('start');

        document.body.className
            .toLowerCase()
            .split(/\s+/)
            .forEach((className) => {
                this.emit(`class:${className}`);
            });
    }
}
