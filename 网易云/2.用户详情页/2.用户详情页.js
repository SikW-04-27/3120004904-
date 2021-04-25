window.onload = function () {
    let user_2 = JSON.parse(sessionStorage.getItem("user"));
    console.log(user_2.code);

    

    var avatar = document.getElementsByClassName("avatar");
    var user_name = document.getElementsByClassName("user_name");
    var event_count = document.getElementById("event_count");
    var follow_count = document.getElementById("follow_count");
    var fan_count = document.getElementById("fan_count");
    var user_id = document.getElementsByClassName("user_id");
    var level = document.getElementsByClassName("level");
    // 将用户头像导入
    avatar[0].src = user_2.profile.avatarUrl;
    avatar[1].src = user_2.profile.avatarUrl;
    // 将用户名导入
    user_name[0].innerHTML = user_2.profile.nickname;
    // 将粉丝数量等导入
    event_count.innerHTML = user_2.profile.eventCount;
    follow_count.innerHTML = user_2.profile.follows;
    fan_count.innerHTML = user_2.profile.followeds;
    // 将用户id导出
    user_id[0].innerHTML = "用户ID：" + user_2.account.id;
    // 将等级输出
    level[0].innerHTML = user_2.account.ban;

    var CreateMusic_img = document.getElementsByClassName("CreateMusic_img");
    var CreateMusic_name = document.getElementsByClassName("CreateMusic_name");
    var CreateMusic_num = document.getElementsByClassName("CreateMusic_num");
    let getMusicList =
        defaultUrlHeader + '/user/playlist?uid=' + user_2.account.id;
    Ajax({
        url: getMusicList,
        success: function (result) {
            CreateMusic_img[0].src = result.playlist[0].coverImgUrl;
                CreateMusic_name[0].innerHTML = result.playlist[0].name;
                CreateMusic_num[0].innerHTML = result.playlist[0].trackCount;
                console.log(result.playlist.length);
            for (let j = 1; j < result.playlist.length; j++) {

                console.log("123+"+j);
                var CreateMusics = document.getElementsByClassName("CreateMusics");
                var div_1 = document.createElement("div");
                var a = document.createElement("a");
                var img = document.createElement("img");
                var div_2 = document.createElement("div");
                var i = document.createElement("i");
                var span = document.createElement("span");
                var div_3 = document.createElement("div_3");

                CreateMusics[0].appendChild(div_1);
                div_1.appendChild(a);
                a.appendChild(img);
                div_1.appendChild(div_2);
                div_2.appendChild(i);
                div_2.appendChild(span);
                div_1.appendChild(div_3);

                div_1.className = "CreateMusic";
                a.className = "CreateMusic_a";
                a.href="";
                img.className = "CreateMusic_img";
                div_2.className = "CreateMusic_bottom";
                span.className = "CreateMusic_num";
                div_3.className = "CreateMusic_name";

                CreateMusic_img[j].src = result.playlist[j].coverImgUrl;
                CreateMusic_name[j].innerHTML = result.playlist[j].name;
                CreateMusic_num[j].innerHTML = result.playlist[j].trackCount;
            }

        }
    });

    // 点击编辑按钮跳转到修改页面
    var Modefy_Userinfo=document.getElementsByClassName("Modefy_Userinfo");
    Modefy_Userinfo[0].onclick=function(){
        window.location.href="../3.修改用户信息页/3.修改用户信息页.html";
    }

}