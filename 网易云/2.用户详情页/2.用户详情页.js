window.onload = function () {
    let user_2 = JSON.parse(sessionStorage.getItem("user"));
    console.log(user_2.code);

    bofang();
    shichangload();
    play();

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

    // 新建歌单
    let plusMusic = document.getElementsByClassName("plusMusic");
    let plusMusic_div = document.getElementsByClassName("plusMusic_div");
    plusMusic[0].onclick = function () {
        plusMusic_div[0].style.display = 'block';
        let plusMusic_input = document.getElementsByClassName("plusMusic_input");
        let cancel_plusMusic = document.getElementsByClassName("cancel_plusMusic");
        let confirm_plusMusic = document.getElementsByClassName("confirm_plusMusic");
        cancel_plusMusic[0].onclick = function () {
            plusMusic_div[0].style.display = 'none';
        };
        confirm_plusMusic[0].onclick = function () {
            if (plusMusic_input[0].value) {
                let timestamp=(new Date()).valueOf();
                let createurl = 'https://autumnfish.cn/playlist/create?name=' + plusMusic_input[0].value + '&cookie=' + user_2.cookie+'&timestamp='+timestamp;
                Ajax({
                    url: createurl,
                    success: function (results) {
                        window.location.href = './2.用户详情页.html';
                    },
                    error: function () {
                        alert('创建失败');
                    }
                })
            }
        }
    };

    let CreateMusic_list = document.getElementsByClassName("CreateMusic_list");
    var CreateMusics = document.getElementsByClassName("CreateMusics");
    let CreateMusic_a = document.getElementsByClassName("CreateMusic_a");
    let timestamp=(new Date()).valueOf();
    let getMusicList =
        defaultUrlHeader + '/user/playlist?uid=' + user_2.account.id+'&timestamp='+timestamp;
    var playlistlen;
    var editionlen;
    Ajax({
        url: getMusicList,
        success: function (result) {
            CreateMusic_list[0].innerHTML = '我的歌单（' + result.playlist.length + '）';
            for (let j = 0; j < result.playlist.length; j++) {
                let imgsrc = result.playlist[j].coverImgUrl + '?param=140y140';
                let div3 = result.playlist[j].name;
                let span1 = result.playlist[j].trackCount;
                create(0, imgsrc, div3, span1);
                CreateMusic_a[j].onclick = function () {
                    sessionStorage.setItem('musicid', result.playlist[j].id);
                    sessionStorage.setItem('type', '歌单');
                    CreateMusic_a[j].href = '../4.歌单详情页/4.歌单详情页.html';
                }
            };
            deletebtn_2[0].onclick = function () {
                let deleteurl ='';
                for (let k = 0; k < playlistlen; k++) {
                    if (check[k].checked != '') {
                        deleteurl = deleteurl +','+ result.playlist[k].id;
                    }
                }
                deleteurl=deleteurl.slice(1);
                let timestamp=(new Date()).valueOf();
                deleteurl='https://autumnfish.cn/playlist/delete?id='+deleteurl+'&cookie='+user_2.cookie+'&timestamp='+timestamp;
                Ajax({
                    url:deleteurl,
                    success:function(){
                        window.location.href='./2.用户详情页.html';
                    }
                });
            }
            playlistlen = result.playlist.length;

            let edition_hidden = document.getElementsByClassName("edition_hidden");
            let timestamp=(new Date()).valueOf();
            let getEditionList = defaultUrlHeader + '/album/sublist' + '?cookie=' + user_2.cookie+'&timestamp='+timestamp;
            Ajax({
                url: getEditionList,
                success: function (result) {
                    edition_hidden[0].style.display = 'block';
                    CreateMusic_list[1].innerHTML = '我收藏的专辑（' + result.data.length + '）';
                    for (let j = 0; j < result.data.length; j++) {
                        let imgsrc = result.data[j].picUrl + '?param=140y140';
                        let div3 = result.data[j].name;
                        let span1 = result.data[j].size;
                        create(1, imgsrc, div3, span1);
                        let temp = j + playlistlen;
                        CreateMusic_a[temp].onclick = function () {
                            sessionStorage.setItem('musicid', result.data[j].id);
                            sessionStorage.setItem('type', '专辑');
                            CreateMusic_a[temp].href = '../4.歌单详情页/4.歌单详情页.html';
                        };
                    };
                    // 此处不能多选
                    deletebtn_2[1].onclick = function () {
                        let deleteurl ='';
                        for (let k = playlistlen,z=0; k < editionlen + playlistlen; k++,z++) {
                            if (check[k].checked != '') {
                                deleteurl = deleteurl +','+ result.data[z].id;
                            }
                        }
                        deleteurl=deleteurl.slice(1);
                        let timestamp=(new Date()).valueOf();
                        deleteurl='https://autumnfish.cn/album/sub?t=0&id='+deleteurl+'&cookie='+user_2.cookie+'&timestamp='+timestamp;
                        Ajax({
                            url:deleteurl,
                            success:function(){
                                window.location.href='./2.用户详情页.html';
                            }
                        });
                    }
                    editionlen = result.data.length;
                }
            });
        }
    });

    // 批量删除
    let deletebtn = document.getElementsByClassName("deletebtn");
    let deletebtn_1 = document.getElementsByClassName("deletebtn_1");
    let deletebtn_2 = document.getElementsByClassName("deletebtn_2");
    let check = document.getElementsByClassName("check");
    for (let j = 0; j < deletebtn.length; j++) {
        deletebtn[j].onclick = function () {
            deletebtn[j].style.display = 'none';
            deletebtn_1[j].style.display = 'block';
            deletebtn_2[j].style.display = 'block';
            if (j == 0) {
                for (let k = 0; k < playlistlen; k++) {
                    check[k].style.display = 'block';
                };
            } else {
                for (let k = playlistlen; k < editionlen + playlistlen; k++) {
                    check[k].style.display = 'block';
                };
            }
        };
        deletebtn_1[j].onclick = function () {
            deletebtn[j].style.display = 'block';
            deletebtn_1[j].style.display = 'none';
            deletebtn_2[j].style.display = 'none';
            if (j == 0) {
                for (let k = 0; k < playlistlen; k++) {
                    check[k].checked = '';
                    check[k].style.display = 'none';
                };
            } else {
                for (let k = playlistlen; k < editionlen + playlistlen; k++) {
                    check[k].checked = '';
                    check[k].style.display = 'none';
                };
            }
        };

    }

    
    // 可以操作待播歌单
    let arrdata = JSON.parse(sessionStorage.getItem('arr'));
    playARR(arrdata);

    // 点击导航栏跳转页面
    one();
    two();
    five();
    seven();
    // 搜索功能
    search();

    // 点击编辑按钮跳转到修改页面
    var Modefy_Userinfo = document.getElementsByClassName("Modefy_Userinfo");
    Modefy_Userinfo[0].onclick = function () {
        window.location.href = "../3.修改用户信息页/3.修改用户信息页.html";
    }

    function create(num, imgsrc, div3, span1) {
        var div_1 = document.createElement("div");
        var a = document.createElement("a");
        var img = document.createElement("img");
        var div_2 = document.createElement("div");
        var i = document.createElement("i");
        var span = document.createElement("span");
        var div_3 = document.createElement("div_3");
        var input = document.createElement("input");

        CreateMusics[num].appendChild(div_1);
        div_1.appendChild(a);
        a.appendChild(img);
        div_1.appendChild(div_2);
        div_2.appendChild(i);
        div_2.appendChild(span);
        div_1.appendChild(div_3);
        div_1.appendChild(input);

        div_1.className = "CreateMusic";
        a.className = "CreateMusic_a";
        a.href = "";
        img.className = "CreateMusic_img";
        div_2.className = "CreateMusic_bottom";
        span.className = "CreateMusic_num";
        div_3.className = "CreateMusic_name";
        input.className = "check";

        img.src = imgsrc;
        div_3.innerHTML = div3;
        span.innerHTML = span1;
        input.type = 'checkbox';
    }

}