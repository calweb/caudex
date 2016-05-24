'use strict'
const app = require('app')
const Rx = require('rx')
const { readFile, writeFile } = require('fs')
const path = require('path')
const { parse } = require('dna2json')
const dnaParser = Rx.Observable.fromCallback(parse)
const writeFile$ = Rx.Observable.fromNodeCallback(writeFile)
const fileContents = Rx.Observable.fromNodeCallback(readFile)
global.dnaFilePath = path.join(app.getPath('appData'), app.getName(),  '/myDna.json')
const processingDnaLog = () => console.log('Processing DNA now...')

const parseDna = (filePath) => fileContents(filePath, 'utf8')
  .tap(processingDnaLog)
  .flatMap((file) => dnaParser(file))
  .map((parsedFile) => writeFile$(dnaFilePath, JSON.stringify(parsedFile[1])))
  .catch((e) => Rx.Observable.throw(e))

module.exports = parseDna
