/**
 * Take capture of html files.
 * @module ape-capturing
 */

'use strict'

let d = (module) => module.default || module

module.exports = {
  get takeCapture () { return d(require('./take_capture')) }
}
