'use strict'
const Rx = require('rx')
const { readFile, writeFile } = require('fs')
const { parse } = require('dna2json')
const dnaParser = Rx.Observable.fromCallback(parse)
const writeFile$ = Rx.Observable.fromNodeCallback(writeFile)
const fileContents = Rx.Observable.fromNodeCallback(readFile)

const processingDnaLog = () => console.log('Processing DNA now...')

const parseDna = (filePath, dnaFilePath) => fileContents(filePath, 'utf8')
  .tap(processingDnaLog)
  .flatMap((file) => dnaParser(file))
  .map((res) => { writeFile$(dnaFilePath, JSON.stringify(res[1])) })
  .catch((e) => Rx.Observable.throw(e))

module.exports = parseDna
