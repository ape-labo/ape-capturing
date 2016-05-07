/**
 * Take capture
 * @function takeCapture
 * @returns {Promise}
 */
'use strict'

const execcli = require('execcli')
const co = require('co')
const mkdirp = require('mkdirp')
const path = require('path')

/** @lends takeCapture */
function takeCapture (url, filename, options = {}) {
  let { selector, width, height } = options
  let size = [ width || 480, height || 240 ].join('x')
  let script = require.resolve('../phantom_scripts/capture_elm.phantom.js')
  return co(function * () {
    yield new Promise((resolve, reject) =>
      mkdirp(path.dirname(filename), (err) => err ? reject(err) : resolve())
    )
    yield execcli.npmBin('phantomjs', [ script, url, filename, selector, size ], {
      notfound: 'Try `npm install -g phantomjs`'
    })
  })
}

module.exports = takeCapture
