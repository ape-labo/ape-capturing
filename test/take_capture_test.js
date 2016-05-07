/**
 * Test case for takeCapture.
 * Runs with mocha.
 */
'use strict'

const takeCapture = require('../lib/take_capture.js')
const assert = require('assert')
const fs = require('fs')
const co = require('co')

describe('take-capture', function () {
  this.timeout(80000)
  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Take capture', () => co(function * () {
    yield takeCapture(
      `${__dirname}/../doc/mocks/mock-html.html`,
      `${__dirname}/../tmp/testing-capture.png`,
      {
        selector: 'h1',
        width: 1280,
        height: 320
      }
    )
    assert.ok(
      fs.existsSync(`${__dirname}/../tmp/testing-capture.png`)
    )
  }))
})

/* global describe, before, after, it */
