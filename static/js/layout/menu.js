+function(){
  const $menu = $(".wrap-menu", ".wrap-box");
  const init = function () {
    const $box = $(".wrap-menu-box", $menu);
    $(window).on('scroll', function() {
      const top = $(document).scrollTop();
      // 头部导航的高度 48
      const value = 48 - top
      $box.css({
        top: value > 0 ? value : 0
      });
    });

    $menu.on("click", "a.item", function() {
      const id = $(this).data("id");
      // 判断是否为我的模版
      if (id === "menu-template") {
        require(["js/components/template/index"], function(app) {
          app();
        });
      }
    })
  };

  setTimeout(init);
}()