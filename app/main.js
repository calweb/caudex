const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const processDna = require('./processDna')

app.setPath('appData', path.join(app.getPath('appData'), app.getName()))

let mainWindow = null

app.on('ready', () => {

  mainWindow = new BrowserWindow({
    height: 800,
    width: 600
  })

  mainWindow.loadURL(`file://${__dirname}/index.html`)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  ipcMain.on('process-dna', (event, filePath) => {
    processDna(filePath)
      .subscribeOnCompleted(() => {
            mainWindow.webContents.send('dna-import-finished')
            console.log('Finished DNA import')
        })
  })
})
