
// 控制卡片右上角功能
+function(){
  $('body').on('click', function(e) {
    const $parent = $(e.target).parents('.j-card-dropdown');
    if ($parent.length === 0) {
      const $input = $('.more-active', '.j-card-dropdown');
      $input.attr("checked", false);
    }
  });
}();

+function() {
  const addCard = function() {

    const template = Template("card-add-template");
    const content = template();

    layer.open({
      type: 1,
      area: ['860px'],
      title: "添加卡片",
      shadeClose: true,
      content: content,
    });


    // 删除添加卡片事件
    $("body").off("click.addCard");
    // 绑定事件
    $("body").on("click.addCard", ".wrap-card-type .card-list", function() {
      const $main = $(this).parents(".wrap-card-main");
      const index = $(this).data("index");
      $(this).siblings('.active').removeClass('active');
      $(this).addClass('active');

      const $box = $(".wrap-card-box", $main);
      const $list = $(".card-list", $box);
      $list.removeClass('active');
      $list.eq(index).addClass('active');
    });
  }

  // 添加 卡片
  $(".wrap-detail").on("click", "#on-card-add", addCard);
  
}();