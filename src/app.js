
const _ = require("lodash");
const path = require("path");
const Swig = require("swig");
const router = require("./router");
const safeGet = require("@fengqiaogang/safe-get");

//导入 express 模块
const express = require("express");


const getDir = function(src) {
  const root = path.join(__dirname, "..");
  return path.join(root, src);
}

const iconfont = function(name, className) {
  var icons = {
    "docx": "icondocx",
    "music": "iconmusic",
    "pdf": "iconpdf",
    "video": "iconvideo",
    "zip": "iconzip",
    "pptx": "iconpptx",
    "xlsx": "iconxlsx",
    "txt": "icontxt",
    "default": "icondefault",
    "folder": "iconfolder"
  }
  var id = icons[name] || name;
  var arr = ["iconfont"];
    if (className) {
      arr.push(className);
    }
  return `<i class="${arr.join(" ")}"><svg aria-hidden="true"><use xlink:href="#${id}"></use></svg></i>`;
}

//配置 swig
Swig.setDefaults({
  cache : false, //不缓存文件
  locals: {
    _: _,
    iconfont: iconfont,
    equals: function(value1, value2) {
      if (value1 === value2) {
        return true;
      }
      return false;
    }
  }
});

//实例化 express
const app = express();

// 静态文件
app.use("/static", express.static(getDir("static")));


app.use(function(req, res, next) {
  const data = require("../mock/menu.json");
  res.locals = {
    menuList: safeGet(data, "list")
  }
  next();
})

app.use(router);


// 设置文件后缀的解释器  配置 render 输出的文件的解释器，编译
app.engine('html', Swig.renderFile);
//设置 页面的后缀  配置 render 输出文件的默认后缀
app.set('view engine', 'html');
//设置 页面的 跟目录  配置 render 输出文件的 根目录
app.set("views", getDir("views"));


//监听本机端口号，运行服务
const server = app.listen(3000,function(){
  const address = server.address();
  let host = safeGet(address, "host") || "127.0.0.1";
  let port = safeGet(address, "port");
  console.log("http://%s:%s", host, port);
});
