const { app, BrowserWindow, ipcMain, net } = require('electron');

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
        request = net.request('http://127.0.0.1:8000/api/movies?pages=1');

        request.on('response', (response) => {
            console.log(`STATUS: ${response.statusCode}`)
            console.log(`HEADERS: ${JSON.stringify(response.headers)}`)

            if (response.statusCode === 200)
            // send the main data movie
            response.on('data', (body) => {
                console.log(JSON.parse(`${body}`));
                mainWindow.send('data-main', JSON.parse(`${body}`));
            });
            // response.on('end', () => {
            //     console.log('No more data in response.')
            // });
        });
        
        request.end();
    });
});