# Pac Macro Mapview

[![License](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/pacmacro/pacmacro.github.io/blob/master/LICENSE)

Web application to display the Pac Macro game.

There is a version for the [Ghost team](http://www.sfu.ca/~jyl52/pac-macro/ghost) (which does not normally show the Pacman unless they are in powerup mode) and the [Pacman team](http://www.sfu.ca/~jyl52/pac-macro/pacman) (which will always show the Pacman).

![Screenshot](readme-img/screenshot.png)

## Alternative Methods of Usage

One way to use the mapview is to download the project and open `index.html` in a browser.

### Electron

An [Electron](https://electronjs.org) application is also available as an option - [download the correct executable for your operating system](https://github.com/pacmacro/pacmacro.github.io/releases).

To start the Electron application locally from the project files, install Electron as a development dependency in the project:
```
npm install --save-dev electron
```

Then start the application:
```
npm start
```

#### Releases

To build the executables, run:
```
./build/release.py
```

The distributables will be created in `build/` as zip files.