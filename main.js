const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path')
const fs = require('fs')
const processDna = require('./lib/processDna')
const dnaFilePath = path.join(app.getPath('appData') + '/caudex/', 'myDna.json')

let mainWindow = null

app.on('ready', () => {

  mainWindow = new BrowserWindow({
    height: 800,
    width: 600
  })

  const onDone = (res) => fs.writeFileSync(dnaFilePath, JSON.stringify(res[1]))
  const onError = (err) => console.log(err)
  const onComplete = () => {
      mainWindow.webContents.send('dna-import-finished')
      console.log('yaay, done')
  }

  mainWindow.loadURL(`file://${__dirname}/index.html`)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  ipcMain.on('process-dna', (event, filePath) => {

    processDna(filePath)
      .subscribe(
        onDone,
        onError,
        onComplete
      )
  })
})
