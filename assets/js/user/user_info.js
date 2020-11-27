$(function () {
  let form = layui.form;
  getInfo();
  function getInfo() {
    $.ajax({
      url: "/my/userinfo",
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("获取用户基本信息失败！")
        }
        form.val("userForm", res.data);
      },
    });
  }
  $("#resetBtn").click(function (e) {
    e.preventDefault();
    getInfo();
  })


  $("#userForm").submit(function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    console.log(data);
    $.ajax({
      url: "/my/userinfo",
      type: "POST",
      data,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("修改用户信息失败！")
        }
        window.parent.getAvatarAndName();
      }
    })
    form.verify({
      nickname: function (value, item) {
        console.log(value);
        if (value.length > 6) {
          return "昵称长度必须在1-6字符之间";
        }

      }
    })
  })
})