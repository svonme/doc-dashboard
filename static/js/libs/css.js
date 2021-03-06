define(function () {
  if ("undefined" == typeof window) return {
      load: function (a, b, c) {
          c()
      }
  };
  var a = document.getElementsByTagName("head")[0],
      b = window.navigator.userAgent.match(
          /Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)|AndroidWebKit\/([^ ;]*)/
      ) || 0,
      c = !1,
      d = !0;
  b[1] || b[7] ? c = parseInt(b[1]) < 6 || parseInt(b[7]) <= 9 : b[2] || b[8] ? d = !1 : b[4] && (c =
      parseInt(b[4]) < 18);
  var e = {};
  e.pluginBuilder = "./css-builder";
  var f, g, h, i = function () {
          f = document.createElement("style"), a.appendChild(f), g = f.styleSheet || f.sheet
      },
      j = 0,
      k = [],
      l = function (a) {
          g.addImport(a), f.onload = function () {
              m()
          }, j++, 31 == j && (i(), j = 0)
      },
      m = function () {
          h();
          var a = k.shift();
          return a ? (h = a[1], void l(a[0])) : void(h = null)
      },
      n = function (a, b) {
          if (g && g.addImport || i(), g && g.addImport) h ? k.push([a, b]) : (l(a), h = b);
          else {
              f.textContent = '@import "' + a + '";';
              var c = setInterval(function () {
                  try {
                      f.sheet.cssRules, clearInterval(c), b()
                  } catch (a) {}
              }, 10)
          }
      },
      o = function (b, c) {
          var e = document.createElement("link");
          if (e.type = "text/css", e.rel = "stylesheet", d) e.onload = function () {
              e.onload = function () {}, setTimeout(c, 7)
          };
          else var f = setInterval(function () {
              for (var a = 0; a < document.styleSheets.length; a++) {
                  var b = document.styleSheets[a];
                  if (b.href == e.href) return clearInterval(f), c()
              }
          }, 10);
          e.href = b, a.appendChild(e)
      };
  return e.normalize = function (a, b) {
      return ".css" == a.substr(a.length - 4, 4) && (a = a.substr(0, a.length - 4)), b(a)
  }, e.load = function (a, b, d, e) {
      (c ? n : o)(b.toUrl(a + ".css"), d)
  }, e
});