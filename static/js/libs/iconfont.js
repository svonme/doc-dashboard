define("iconfont", [], function() {
  var iconfont = function(name, className) {
    var arr = ["iconfont"];
    if (className) {
      arr.push(className);
    }
    return `<i class="${arr.join(" ")}"><svg aria-hidden="true"><use xlink:href="#${name}"></use></svg></i>`;
  }
  return iconfont;
});