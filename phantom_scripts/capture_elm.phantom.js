var page = require('webpage').create()
var system = require('system')

var url = system.args[ 1 ]
var filename = system.args[ 2 ]
var selector = system.args[ 3 ]
var sizes = system.args[ 4 ].split('x')

function indexedFilename (filename, i) {
  if (i === 0) {
    return filename
  }
  var components = filename.split(/\./g)
  var extname = components.pop()
  return components.concat(i).concat(extname).join('.')
}

page.viewportSize = {
  width: sizes[ 0 ],
  height: sizes[ 1 ]
}
page.open(url, function () {
  var rects = page.evaluate(function (selector) {
    var rects = []
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
      var rect = elements[ i ].getBoundingClientRect()
      rects.push(rect)
    }
    return rects
  }, selector)

  for (var i = 0; i < rects.length; i++) {
    page.clipRect = rects[ i ]
    var rendering = indexedFilename(filename, i)
    console.log('Render file:', rendering)
    page.render(rendering)
  }

  phantom.exit()
})

/* global document, phantom */
