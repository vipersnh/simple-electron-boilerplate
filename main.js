'use strict';
const debug = require('electron-debug');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow(
        {
            width: 880, 
            height: 600, 
            webPreferences: {
                nodeIntegration: true,
            },
        }
    );
    mainWindow.setMenu(null);
    if (isDev) {
        mainWindow.loadURL('http://localhost:3000');
    } else {
        mainWindow.loadURL('file://' + __dirname + '/index.html');
    }
    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    let webContents = mainWindow.webContents
    webContents.on('did-finish-load', function() {
        webContents.setZoomFactor(1)
        webContents.setVisualZoomLevelLimits(1, 1)
        webContents.setLayoutZoomLevelLimits(0, 0)
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
}
);

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
