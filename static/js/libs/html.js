define(['$', '_', 'http', 'iconfont'], function($, _, http, iconfont) {
  const imports = { '$': $, iconfont: iconfont };
  const folderName = 'libs/'; // 当前文件的目录名称
  const getRegEXp = function(value) {
    return new RegExp(`^${value}`);
  }
  var text = {
    // 修正模版地址
    normalize: function(path, callback) {
      if (getRegEXp(folderName).test(path)) {
        var src = path.replace(getRegEXp(folderName), '');
        return callback(src);
      } else {
        return callback(path);
      }
    },
    load: function(src, req, onLoad, config){
      const callback = function(text) {
        try {
          var template = _.template(text, {'imports': imports});
          onLoad(template);
        } catch (error) {
          console.log('template = "%s"', src);
          console.error(error);
          onLoad(_.template(''));
        }
      };
      var path = ''
      if (getRegEXp('http').test(src) || getRegEXp('/').test(src)) {
        path = req.toUrl(src);
      } else if (/^\.\//.test(src)) {
        path = req.toUrl(src);
      } else {
        path = req.toUrl(`${config.baseUrl}${src}`);
      }
      http.text(path).then(callback);
    }
  }
  return text
});