// 卡片排序
+function() {
  const $sort = $("#wrap-card-sort");


  const sortList = $(".wrap-dashboard", $sort).get(0);

  const getSortData = function() {
    const list = $(".dashboard-item", sortList);
    const array = _.map(list, function(item) {
      const $dom = $(item);
      const key = $dom.data("key");
      const data = { key: key, zoom: false };
      if ($dom.hasClass("shrink")) {
        data.zoom = true;
      }
      return data;
    });
    return array;
  };

  new Sortable(sortList, {
    animation: 150,
    onEnd: function() {
      // todo
      // 拖动完成
    }
  });

  $("body").off("click.sort");
  $("body").on("click.sort",  "#save-sort", function() {
    const list = getSortData();
    console.log(list);
    // 回到仪表盘
    window.location.replace("/");
  });

  // 放大 缩小
  $sort.off("click.sort");
  $sort.on("click.sort", ".dashboard-item .j-icon-button", function() {
    const $card = $(this).parents(".dashboard-item");
    if ($card.hasClass("zoom")) {
      $card.addClass("shrink");
      $card.removeClass("zoom");
    } else {
      $card.addClass("zoom");
      $card.removeClass("shrink");
    }
  });

}();