$(function () {
  let layer = layui.layer;
  getAvatarAndName();
  $("#logoutBtn").click(function () {
    layer.confirm(
      '确定退出登录?',
      { icon: 3, title: '提示' },
      function (index) {
        localStorage.removeItem("token");

        location.href = "loogin.html";

        layer.close(index);
      }
    );
  });
});
function getAvatarAndName() {

  $.ajax({
    url: "/my/userinfo",
    // headers: {
    //   Authorization: localStorage.getItem("token"),
    // },
    success: function (res) {
      // console.log(res);
      if (res.status !== 0) {
        return layer.msg("获取用户信息失败！")
      }
      // layer.msg("获取用户信息成功！");

      let name = res.data.nickname || res.data.username;
      let first = name[0].toUpperCase();

      $("#welcome").text("欢迎" + name);

      if (res.data.user_pic) {
        $(".layui-nav-img").show().attr("src", res.data.user_pic);
        $(".text-avatar").hide();
      } else {
        $(".layui-nav-img").hide();
        $(".text-avatar").text(first).show();
      }
    },
  });
}