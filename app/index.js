const ipc = require('electron').ipcRenderer
const { app, getGlobal } = require('remote')
const Rx = require('rx')
const genosets = require('./genosets')

// DOM
const dropZone = document.querySelector('.drop-zone')
const analyzeBtn = document.querySelector('aside button')
// observables
const analyzeObs = Rx.Observable.fromEvent(analyzeBtn, 'click')
const dropStream = Rx.Observable.fromEvent(dropZone, 'drop')
const dragOver = Rx.Observable.fromEvent(dropZone, 'dragover')
const dragLeave = Rx.Observable.fromEvent(dropZone, 'dragleave')

const myDna = getGlobal('dnaFilePath')

analyzeObs
  .map((event) => event.preventDefault())
  .subscribe(() => {
      Object.keys(genosets).forEach((genoset) => {
        console.log(`You are ${genosets[genoset].test(myDna) ? 'Positive' : 'Negative'} for ${genosets[genoset].description}`);
      })
    }
  )

dragOver
  .map((event) => {
    event.preventDefault()
  })
  .subscribe((event) => dropZone.classList.add('drag-over'))

dragLeave
  .map((event) => {
    event.preventDefault()
  })
  .subscribe((event) => dropZone.classList.remove('drag-over'))

dropStream
  .map((event) => {
    event.preventDefault()
    return event.dataTransfer.files[0].path
  })
  .tap((something) => console.log(`path to raw dna file... ${something}`))
  .subscribe(
    (path) => {
      ipc.send('process-dna', path)
      dropZone.classList.remove('drag-over')
      dropZone.classList.add('drag-drop')
    },
    (err) => console.log(`Error: ${err}`),
    (something) => console.log(`Complete! ${something}`)
  )

ipc.on('dna-import-finished', () => {
  new Notification('Import Complete!', {
    body: 'Congratulations, your DNA is now available for analysis!'
  })
  dropZone.classList.remove('drag-drop')
  dropZone.innerHTML += '<h1>File Conversion Complete!</h1>'
})
