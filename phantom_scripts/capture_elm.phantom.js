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
  setTimeout(function () {
    var rects = page.evaluate(function (selector, width, height) {
      var rects = []
      var elements = document.querySelectorAll(selector)
      for (var i = 0; i < elements.length; i++) {
        var rect = elements[ i ].getBoundingClientRect()
        rects.push({
          left: rect.left,
          top: rect.top,
          width: width,
          height: height
        })
      }
      return rects
    }, selector, sizes[ 0 ], sizes[ 1 ])

    for (var i = 0; i < rects.length; i++) {
      page.clipRect = rects[ i ]
      console.log(rects[ i ].height)
      var rendering = indexedFilename(filename, i)
      console.log('Render file:', rendering)
      page.render(rendering)
    }

    phantom.exit()
  }, 100)
})

/* global document, phantom */
