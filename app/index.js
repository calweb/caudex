const ipc = require('electron').ipcRenderer
const { getGlobal } = require('electron').remote
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

const mergedEvts$ = Rx.Observable.merge(dropStream, dragOver, dragLeave)
  .tap((e) => e.preventDefault() )

mergedEvts$
  .subscribe((res) => {
    res.type === 'dragover' ?
    dropZone.classList.add('drag-over') :
    dropZone.classList.remove('drag-over')
  })

mergedEvts$
  .filter((res) => res.type === 'drop')
  .map((res) => event.dataTransfer.files[0].path)
  .subscribe(
    (path) => {
      dropZone.classList.add('drag-drop')
      ipc.send('process-dna', path)
    },
    (err) => console.log(`Error: ${err}`),
    (something) => console.log(`Complete! ${something}`)
  )

analyzeObs
  .tap((event) => event.preventDefault())
  .subscribe(() => {
    const myDna = require(getGlobal('dnaFilePath'))
      Object.keys(genosets).forEach((genoset) => {
        console.log(`You are ${genosets[genoset].test(myDna)
          ? 'Positive'
          : 'Negative'} for ${genosets[genoset].description}`)
      })
    }
  )

ipc.on('dna-import-finished', () => {
  new Notification('Import Complete!', {
    body: 'Congratulations, your DNA is now available for analysis!'
  })
  dropZone.classList.remove('drag-drop')
  dropZone.innerHTML += '<h1>File Conversion Complete!</h1>'
})
