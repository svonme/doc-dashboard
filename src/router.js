/**
 * @file 路由
 * @author svon.me@gmail.com
 */

const DBList = require("@fengqiaogang/dblist");
const safeGet = require("@fengqiaogang/safe-get");
const express = require("express");
const Router = express.Router;

const router = Router();

const dashboard = function(req, res) {
  const cardAllData = require("../mock/card/all.json");
  const data = require("../mock/card.json")
  const db = new DBList([]);
  db.insert(safeGet(data, "list") || []);

  const cards = db.clone(function(item) {
    const key = safeGet(item, 'key');
    try {
      const json = require(`../mock/${key}.json`);
      const list = safeGet(json, 'list');
      return Object.assign({}, item, { list });
    } catch (error) {
      return Object.assign({}, item, { list: [] });
    }
  });

  res.render("pages/dashboard", {
    title: "我的仪表盘",
    current: "dashboard",
    cards: cards,
    cardAll: safeGet(cardAllData, "list"),
  });
}

router.get('/', dashboard);
router.get('/index.html', dashboard);
router.get('/dashboard.html', dashboard);


router.get('/card/sort.html', function(req, res) {
  const data = require("../mock/card.json")
  const db = new DBList([]);
  db.insert(safeGet(data, "list") || []);

  res.render("pages/card/sort", {
    title: "卡片布局",
    current: "dashboard",
    cards: db.clone(),
  });
});


router.get('/docs/me.html', function(req, res) {
  const data = require("../mock/docs/me.json");
  const list = safeGet(data, 'list');
  
  res.render("pages/docs/me", {
    title: "我的文档",
    current: "docs",
    list: list,
  });
})



module.exports = router;