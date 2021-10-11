/**
 * @file 路由
 * @author svon.me@gmail.com
 */

const DBList = require("@fengqiaogang/dblist");
const safeGet = require("@fengqiaogang/safe-get");
const safeSet = require("@fengqiaogang/safe-set");
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
      if (key === 'work/need') {
        const data = require('../mock/work/need.json');
        safeSet(item, 'workNeedList', safeGet(data, 'list'));
      } else if (key === 'work/finish') {
        const data = require('../mock/work/need.json');
        safeSet(item, 'finishList', safeGet(data, 'list'));
      } else if (key === 'docs/me') {
        const data = require("../mock/docs/me.json");
        safeSet(item, 'docsMeList', safeGet(data, 'list'));
      } else if (key === 'follow') {
        const data = require("../mock/docs/me.json");
        safeSet(item, 'followList', safeGet(data, 'list'));
      } else if (key === 'collect') {
        const data = require("../mock/docs/me.json");
        safeSet(item, 'collectList', safeGet(data, 'list'));
      } else if (key === 'docs/share') {
        const data = require("../mock/docs/me.json");
        safeSet(item, 'docsShareList', safeGet(data, 'list'));
      } else if (key === 'docs/train') {
        const data = require("../mock/docs/me.json");
        safeSet(item, 'docsTrainList', safeGet(data, 'list'));
      } else if (key === 'docs/borrow') {
        const data = require("../mock/docs/me.json");
        safeSet(item, 'docsBorrowList', safeGet(data, 'list'));
      } else if (key === 'notice') {
        const data = require("../mock/work/need.json");
        safeSet(item, 'noticeList', safeGet(data, 'list'));
      }
      return item;
    } catch (error) {

    }
  });

  res.render("pages/dashboard", {
    title: "我的仪表盘",
    current: "dashboard",
    cards: cards,
    cardAll: safeGet(cardAllData, "list"),
  });
}

// 仪表盘
router.get('/', dashboard);
router.get('/index.html', dashboard);


// 卡片排序
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


// 我的待办
router.get('/work/need.html', function(req, res) {
  const data = require("../mock/work/need.json");
  const list = safeGet(data, 'list');
  res.render("pages/work/need", {
    title: "我的待办",
    current: "work/need",
    list: list,
  });
});

// 我的已办
router.get('/work/finish.html', function(req, res) {
  const data = require("../mock/work/need.json");
  const list = safeGet(data, 'list');
  res.render("pages/work/finish", {
    title: "我的已办",
    current: "work/finish",
    list: list,
  });
});


// 我的文档
router.get('/docs/me.html', function(req, res) {
  const data = require("../mock/docs/me.json");
  const list = safeGet(data, 'list');
  res.render("pages/docs/me", {
    title: "我的文档",
    current: "docs",
    list: list,
  });
});

// 我关注的
router.get('/follow.html', function(req, res) {
  const data = require("../mock/docs/me.json");
  const list = safeGet(data, 'list');
  res.render("pages/follow", {
    title: "我关注的",
    current: "follow",
    list: list,
  });
});

// 我的收藏
router.get('/collect.html', function(req, res) {
  const data = require("../mock/docs/me.json");
  const list = safeGet(data, 'list');
  res.render("pages/collect", {
    title: "我的收藏",
    current: "collect",
    list: list,
  });
});

// 分发的文档
router.get('/docs/share.html', function(req, res) {
  const data = require("../mock/docs/me.json");
  const list = safeGet(data, 'list');
  res.render("pages/docs/share", {
    title: "分发的文档",
    current: "docs/share",
    list: list,
  });
});

// 培训文档
router.get('/docs/train.html', function(req, res) {
  const data = require("../mock/docs/me.json");
  const list = safeGet(data, 'list');
  res.render("pages/docs/train", {
    title: "培训文档",
    current: "docs/train",
    list: list,
  });
});

// 借阅的文档
router.get('/docs/borrow.html', function(req, res) {
  const data = require("../mock/docs/me.json");
  const list = safeGet(data, 'list');
  res.render("pages/docs/borrow", {
    title: "借阅的文档",
    current: "docs/borrow",
    list: list,
  });
});

// 公告通知
router.get('/notice.html', function(req, res) {
  const data = require("../mock/work/need.json");
  const list = safeGet(data, 'list');
  res.render("pages/notice", {
    title: "公告通知",
    current: "notice",
    list: list,
  });
});



module.exports = router;
