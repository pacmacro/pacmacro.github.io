# Pac Macro Mapview

[![License](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/pacmacro/pacmacro.github.io/blob/master/LICENSE)

Web application to display the Pac Macro game.

The web application is **not yet available** as a website due to issues with HTTP content served over an HTTPS connection.

To run the web application, download the project and open `index.html` in a browser. An [Electron](https://electronjs.org) application is also available as an option - [download the correct executable for your operating system](https://github.com/pacmacro/pacmacro.github.io/releases).

![Screenshot](readme-img/screenshot.png)

## Electron Setup

To start the Electron application locally from the project files, install Electron as a development dependency in the project:
```
npm install --save-dev electron
```

Then start the application:
```
npm start
```

To build the executables, run:
```
./build/release.py
```

The distributables will be in `build/` as zip files.