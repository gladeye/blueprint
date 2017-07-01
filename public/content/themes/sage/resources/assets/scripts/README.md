# Scripts

Blueprint provides a simple system that helps you to execute Javascript module based on page slug and other contexts.

## Concept

Blueprint treats every single classes in the `body` tag as an event which will be triggered as soon as `DOMContentLoaded`

## Folder structure

```shell
scripts/                        # → Scripts root folder
├── bootstrap.js                # → Application bootstrap code
├── libs/                       # → Script additional libraries
├── main.js                     # → Main entry file, should stay intact
└── modules/                    # → Application modules

```

## Usage

Given this is a typical standard `body` tag

```html

<body class="home blog has-contact-form">
    ...
</body>
```

The following events will be fired consecutively `home`, `blog` and `has-contact-form`, which you can listen to by using `Application#on()` method

```js
// scripts/modules/home.js

import Application from "libs/Application";

const app = Application.instance();

app.on('class:home', () => {
    // any script that should execute if it's home page
});


// scripts/modules/contact-form.js

import Application from "libs/Application";

const app = Application.instance();

app.on('class:has-contact-form', () => {
    // any script that should execute on any pages that have contact-form
});

```

## Special events

- **`start`**: Will always trigger as soon as page has loaded, good place to execute any common required scripts across all pages.

    ```js
        // scripts/modules/common.js

        import Application from "libs/Application";

        const app = Application.instance();

        app.on('start', () => {
            // any script that should execute on any pages
        });
    ```
