const ipc = require('electron').ipcRenderer
const q = require('gql')
const path = require('path')
const { app, getGlobal } = require('remote')
const Rx = require('rx')
// @todo: refactor a lot of this out into modules
// genosets
const heartAttackRisk = require('genoset-291')
const probNSAID = require('genoset-191')
const isLightweight = require('genoset-211')
const gluetenIntolerance = require('genoset-221')
const isSickleCell = require('genoset-228')
// DOM
const dropZone = document.querySelector('.drop-zone')
const analyzeBtn = document.querySelector('aside button')
// observables
const analyzeObs = Rx.Observable.fromEvent(analyzeBtn, 'click')
const dropStream = Rx.Observable.fromEvent(dropZone, 'drop')
const dragOver = Rx.Observable.fromEvent(dropZone, 'dragover')
const dragLeave = Rx.Observable.fromEvent(dropZone, 'dragleave')

analyzeObs
  .map((event) => event.preventDefault())
  .subscribe(() => {
    // mah dna
    const myDna = getGlobal('dnaFilePath')
      console.log(`lower risk of heart attack: ${heartAttackRisk(myDna)}`)
      console.log(`problem metabolizing NSAID: ${probNSAID(myDna)}`)
      console.log(`problem metabolizing ethanol: ${isLightweight(myDna)}`)
      console.log(`problem metabolizing: ${gluetenIntolerance(myDna)}`)
      console.log(`you have sickle cell anemia: ${isSickleCell(myDna)}`)
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
  dropZone.innerHTML += '<h1>File Conversion Complete!</h1>'
})
