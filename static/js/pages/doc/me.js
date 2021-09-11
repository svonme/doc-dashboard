+function() {
  $(".wrap-detail").on("click", ".j-upload-file", function() {
    const template = Template("upload-file-template");
    const content = template();
    const modalId = layer.open({
      type: 1,
      area: ['1100px'],
      title: false, // 不需要标题
      shadeClose: true,
      content: content,
      btn: ["提交申请", "取消"],
      // 按钮 1 的点击事件,等同于 btn1
      yes: function() {
        console.log('提交申请');
        layer.close(modalId);
      },
    });
  });
}();