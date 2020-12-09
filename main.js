const { app, BrowserWindow, ipcMain } = require('electron');

// Function for create window
function createWindow(pathFile, widthWindow = 1200, heightWindow = 800) {
    // Create window
    let win = new BrowserWindow({
        width: widthWindow,
        height: heightWindow,
        webPreferences: {
            nodeIntegration : true,
            enableRemoteModule: true,
            // delete devTools for le packager
            //devTools: false
        },
    })
    // load file html page
    win.loadFile(pathFile);

    // listener's of event closed window 
    win.on('closed', () => {
        win = null;
    })

    return win;
}

// Create the window
app.whenReady().then(() => {
    mainWindow = createWindow('views/home/home.html');

    // Only the first time the win is loaded we send data
    // It is responsible for rendering and controlling a web page and is a property of the BrowserWindow object.
    mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.send('store-data');
    });
});