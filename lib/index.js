const ipc = require('electron').ipcRenderer

const dropZone = document.querySelector('.drop-zone')

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault()
  dropZone.classList.add('drag-over')
})

dropZone.addEventListener('dragleave', (e) => {
  e.preventDefault()
  dropZone.classList.remove('drag-over')
})

dropZone.addEventListener('drop', (e) => {
  e.preventDefault()
  const myDna = e.dataTransfer.files[0].path

  ipc.send('process-dna', myDna)

  dropZone.classList.remove('drag-over')
  dropZone.classList.add('drag-drop')

})

ipc.on('dna-import-finished', () => dropZone.innerHTML = '<h1>File Conversion Complete!</h1>')
