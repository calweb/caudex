'use strict'
const Rx = require('rx')
const { readFile } = require('fs')
const { parse } = require('dna2json')
const dnaParser = Rx.Observable.fromCallback(parse)
const fileContents = Rx.Observable.fromNodeCallback(readFile)

const processingDnaLog = () => console.log('Processing DNA now...')

const parseDna = (filePath) => fileContents(filePath, 'utf8')
  .tap(processingDnaLog)
  .flatMap((file) => dnaParser(file))
  .catch((e) => Rx.Observable.throw(e))

module.exports = parseDna
