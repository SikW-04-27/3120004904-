window.onload = function () {
    // 打开如果有保存的话自动登录
    let dengluurl_1 =
        defaultUrlHeader + "/login/cellphone?" + "phone=" + getCookie('phone') + "&" + "password=" + getCookie('password');
    if (getCookie('rem') == 'true') {
        Ajax({
            url: dengluurl_1,
            success: function (result) {
                avatar[0].src = result.profile.avatarUrl;
                avatar[1].src = result.profile.avatarUrl;
                user_profile_name[0].innerHTML = result.profile.nickname;
                user_profile_levelnum[0].innerHTML = result.account.ban;
                SignUp_User.style.display = 'block';
                SignUp.style.display = 'none';
                let resultstr = JSON.stringify(result);
                console.log(resultstr);
                sessionStorage.setItem('user', resultstr);

                // 播放记录
                let historyurl = defaultUrlHeader + '/user/record?uid=' + result.account.id + '&type=1&cookie=' + result.cookie;
                historylist(historyurl);
                
            }
        });
    }

    // 手机登录
    var SignUp = document.querySelector(".SignUp");
    var SignUp_error = document.querySelector(".SignUp_error");
    var SignUpBox = document.querySelector(".SignUpBox");
    var register_btn = document.getElementById("register_btn");
    var SignUpbig = document.querySelector(".SignUpbig");
    var sentctcodebig = document.querySelector(".sentctcodebig");
    var registerbig = document.querySelector(".registerbig");
    var emailbig = document.querySelector(".emailbig");
    // 邮箱登录跳转
    var SignUp_email0 = document.getElementById("SignUp_email0");

    let SignUp_phone = document.getElementById("SignUp_phone");
    let SignUp_password = document.getElementById("SignUp_password");
    let email_phone = document.getElementById("email_phone");
    let email_password = document.getElementById("email_password");
    var SignUp_btn = document.getElementById("SignUp_btn");
    var email_SignUp_btn = document.getElementById("email_SignUp_btn");
    var SignUp_User = document.querySelector(".SignUp_User");
    var avatar = document.getElementsByClassName("avatar");

    var user_profile_name = document.getElementsByClassName("user_profile_name");
    var user_profile_levelnum = document.getElementsByClassName("user_profile_levelnum");
    var user_profile_li = document.getElementsByClassName("user_profile_li");
    // 多选框
    var Rem_Password = document.getElementById("Rem_Password");
    var SignUp_User_down1 = document.querySelector(".SignUp_User_down1");
    var SignUp_User_down2 = document.querySelector(".SignUp_User_down2");
    // 添加歌曲到待播清单
    var add = document.getElementsByClassName("add");
    // 添加歌曲到我的歌单
    var plusMusic_div = document.getElementsByClassName("plusMusic_div");
    var plusMusic_ul = document.getElementsByClassName("plusMusic_ul");
    var plusMusic_li = document.getElementsByClassName("plusMusic_li");
    var confirm_plusMusic = document.getElementsByClassName("confirm_plusMusic");
    var cancel_plusMusic = document.getElementsByClassName("cancel_plusMusic");



    // 点击头像跳转到新页面
    SignUp_User_down1.onclick = function () {
        parent.inner.src = '../2.用户详情页/2.用户详情页.html';
    };
    // 退出登录
    SignUp_User_down2.onclick = function () {
        let outurl = defaultUrlHeader + '/logout';
        Ajax({
            url: outurl,
            success: function () {
                SignUp_User.style.display = 'none';
                SignUp.style.display = 'block';
                sessionStorage.clear();
                document.cookie = "rem=false";
                if (getCookie('rem') == 'false') {
                    avatar[1].src = '';
                    user_profile_name[0].innerHTML = ' ';
                    user_profile_levelnum[0].innerHTML = ' ';
                }
            }
        });
    };

    // 手机号登录
    let sign_info=document.getElementsByClassName("sign_info");
    
    // 电话号码正则判断
    SignUp_phone.onkeyup=function(){
        var num1 = SignUp_phone.value;
        // 验证电话的正则表达式
        var reg = /^1[34578][0-9]{9}$/;
        // 如果用户输入的电话不符合规则
        if (!reg.test(num1)) {
            sign_info[0].innerHTML = '✖  请输入符合格式的电话';
            // 让提示信息显示为错误的提示信息样式
            sign_info[0].className = 'sign_info red';
            // 阻止程序向下执行
            SignUp_btn.onclick=function() {
                SignUp_btn.onclick=null;
            };
            return;
        } else {
            // 如果电话输入正确提示正确信息，并设置相应样式
            sign_info[0].innerHTML = '✔  bingo';
            sign_info[0].className = 'sign_info green';
            SignUp_btn.onclick= function() {
                let phone = SignUp_phone.value;
                let password = SignUp_password.value;
                let dengluurl = defaultUrlHeader + "/login/cellphone?" + "phone=" + phone + "&" + "password=" + password;
                signup(dengluurl, phone, password);
        
            };
        }
        
    };
    function signup(dengluurl, phone, password) {
        Ajax({
            url: dengluurl,
            success: function (result) {
                SignUpBox.style.display = "none";
                if(result.code==200){
                    let resultstr = JSON.stringify(result);
                    console.log(resultstr);
                    sessionStorage.setItem('user', resultstr);
    
                    // 缓存存完就执行，个人头像信息
                    let user_1 = JSON.parse(sessionStorage.getItem("user"));
                    user_profile_name[0].innerHTML = user_1.profile.nickname;
                    user_profile_levelnum[0].innerHTML = user_1.account.ban;
                    user_profile_li[0].innerHTML = user_1.profile.eventCount;
                    user_profile_li[1].innerHTML = user_1.profile.follows;
                    user_profile_li[2].innerHTML = user_1.profile.followeds;
    
                    if (Rem_Password.checked) {
                        document.cookie = "phone=" + phone;
                        document.cookie = "password=" + password;
                        document.cookie = "rem=true";
                    } else {
                        document.cookie = "phone=";
                        document.cookie = "password=";
                        document.cookie = "rem=false";
                    }
                    avatar[0].src = result.profile.avatarUrl;
                    avatar[1].src = result.profile.avatarUrl;
                    SignUp_User.style.display = 'block';
                    SignUp.style.display = 'none';
                    // 登录成功引入历史数据
                    let historyurl = defaultUrlHeader + '/user/record?uid=' + result.account.id + '&type=1&cookie=' + result.cookie;
                    historylist(historyurl);
                }else{
                    alert('密码错误');
                }
            },
            error: function () {
                alert('网络错误');
            }
        });
    };

    // 记住账号密码
    SignUp.addEventListener('click', function () {
        SignUp_phone.value = getCookie('phone');
        SignUp_password.value = getCookie('password');
        if (getCookie('rem') == 'true') {
            Rem_Password.checked = true;
        }

    });

    // 邮箱登录
    email_SignUp_btn.addEventListener('click', function () {
        let email = email_phone.value;
        let password = email_password.value;
        let dengluurl =
            defaultUrlHeader + "/login?email=" + email + "&password=" + password;
        signup(dengluurl, email, password);
    });

    // 调出相应提示框
    SignUp.addEventListener('click', function () {
        // alert("123");
        SignUpBox.style.display = "block";
    });
    SignUp_error.onclick = function () {
        SignUpBox.style.display = "none";
        SignUpbig.style.display = "block";
        sentctcodebig.style.display = "none";
    };
    register_btn.onclick = function () {
        SignUpbig.style.display = "none";
        sentctcodebig.style.display = "block";
    };
    SignUp_email0.onclick = function () {
        SignUpbig.style.display = "none";
        emailbig.style.display = "block";
    };

    // 发送验证码，验证验证码
    let sentctcode_btn = document.getElementById("sentctcode_btn");
    let sentctcode_phone = document.getElementById("sentctcode_phone");
    sentctcode_btn.onclick = function () {
        let phone = sentctcode_phone.value;
        let senturl = defaultUrlHeader + "/captcha/sent?phone=" + phone;
        Ajax({ url: senturl });
    };
    let captcha_btn = document.getElementById("captcha_btn");
    let sentctcode_code = document.getElementById("sentctcode_code");
    let SignUp_phone2 = document.getElementById("SignUp_phone2");
    captcha_btn.onclick = function () {
        let phone = sentctcode_phone.value;
        let captcha = sentctcode_code.value;
        let verifyurl = defaultUrlHeader + "/captcha/verify?phone=" + phone + "&captcha=" + captcha;
        Ajax({
            url: verifyurl,
            success: function () {
                console.log("验证成功");
                registerbig.style.display = "block";
                sentctcodebig.style.display = "none";
            },
            error: function () {
                console.log("验证失败");
            }
        });
    };
    SignUp_phone2.onclick = function () {
        SignUpbig.style.display = "block";
        registerbig.style.display = "none";
    };

    // 电话号码跳转调用框
    let SignUp_phone1 = document.getElementById("SignUp_phone1");
    SignUp_phone1.onclick = function () {
        SignUpbig.style.display = "block";
        sentctcodebig.style.display = "none";
    };

    // 邮箱登录调用框
    let SignUp_phone3 = document.getElementById("SignUp_phone3");
    let email_register_btn = document.getElementById("email_register_btn");
    SignUp_phone3.onclick = function () {
        SignUpbig.style.display = "block";
        emailbig.style.display = "none";
    };
    email_register_btn.onclick = function () {
        SignUpbig.style.display = "none";
        sentctcodebig.style.display = "block";
    };

    // 轮播图
    let roll_li = document.getElementsByClassName("roll_li");
    let pointer = document.getElementsByClassName("pointer");
    let arrow = document.getElementsByClassName("arrow");
    let roll_content = document.getElementsByClassName("roll_content");
    var index = 0;
    // 加载轮播图的图片
    let timestamp = (new Date()).valueOf();
    Ajax({
        url: 'https://autumnfish.cn/banner?type=0' + '&timestamp=' + timestamp,
        success: function (results) {
            for (let j = 0; j < 10; j++) {
                let li = document.createElement("li");
                let img = document.createElement("img");
                roll_content[0].appendChild(li);
                li.appendChild(img);
                li.className = "roll_li hidden";
                img.src = results.banners[j].imageUrl + '?param=732y285';
                li.style.display = 'none';
                li.style.backgroundImage = 'url(' + results.banners[j].imageUrl + '?imageView&blur=40x20' + ')';

                roll_li[j].addEventListener("mouseover", function () {
                    clearInterval(timer);
                });
                roll_li[j].addEventListener("mouseout", function () {
                    automove();
                });
            }
            roll_li[0].className = 'roll_li visible';
            roll_li[0].style.display = 'block';


        }
    });
    // 轮播图移动函数
    function move(font, after, speed) {
        function one() {
            setTimeout(() => {
                roll_li[after].style.display = "block";
                iterator.next();
            }, 1);
        }
        function two() {
            setTimeout(() => {
                setPointer(after);
                roll_li[font].className = "roll_li hidden";
                roll_li[after].className = "roll_li visible";
                iterator.next();
            }, speed);
        }
        function three() {
            setTimeout(() => {
                roll_li[font].style.display = "none";
                iterator.next();
            }, 201);
        }
        function* gen() {
            yield one();
            yield two();
            yield three();
        }

        let iterator = gen();
        iterator.next();
    }
    // 自动轮播函数
    function automove() {
        timer = setInterval(function () {
            if (index == 9) {
                index = 0;
                move(9, 0, 200);
            } else {
                font = index;
                after = index + 1;
                move(font, after, 200);
                index++;
            }
        }, 3000);
    }
    // 调用自动轮播
    automove();
    // 点击导航点跳转函数
    for (let i = 0; i < pointer.length; i++) {
        pointer[i].num = i;
        // 点击跳转，并且开启节流，防止用户误操作
        pointer[i].addEventListener("click", throttle(function () {
            // 防止用户重复点正在显示的照片
            if (roll_li[this.num].className != 'roll_li visible') {
                let tiao = this.num;
                clearInterval(timer);
                move(index, tiao, 1);
                index = tiao;
                automove();
            }
        }, 2900))
    }
    // 点击箭头跳转函数
    for (let i = 0; i < arrow.length; i++) {
        arrow[i].num = i;
        arrow[i].addEventListener("click", function () {
            clearInterval(timer);
            let tiao_1 = index;
            if (this.num == 0) {
                let tiao_font = tiao_1 - 1;
                if (tiao_font < 0) {
                    tiao_font = 9;
                }
                move(tiao_1, tiao_font, 1);
                index = tiao_font;
            } else {
                let tiao_after = tiao_1 + 1;
                if (tiao_after > 9) {
                    tiao_after = 0;
                }
                move(tiao_1, tiao_after, 1);
                index = tiao_after;
            }
            automove();
        })
    }
    // 改变点的样式
    function setPointer(x) {
        if (x == 10) {
            x = 0;
        }
        // console.log(x);
        // 每按一个键都会清除上一次点击的样式
        for (var j = 0; j < pointer.length; j++) {
            pointer[j].style.backgroundColor = "";
        }
        // 点击按钮修改样式
        pointer[x].style.backgroundColor = "rgb(255,210,85)";
    }
    // 实现限流函数
    function throttle(func, wait) {
        var _this, arg;
        var prev = 0; // 上一次触发的时间，第一次默认为0
        return function () {
            var now = Date.now(); // 触发时的时间
            _this = this;
            if (now - prev > wait) {
                func.apply(_this, arg); // 允许传入参数，并修正this
                prev = now; // 更新上一次触发的时间
            }
        }
    }


    // 加载推荐的信息
    var CreateMusic_img = document.getElementsByClassName("CreateMusic_img");
    var CreateMusic_name = document.getElementsByClassName("CreateMusic_name");
    var CreateMusic_num = document.getElementsByClassName("CreateMusic_num");
    let getMusicList =
        defaultUrlHeader + '/personalized' + '?timestamp=' + timestamp;
    Ajax({
        url: getMusicList,
        success: function (results) {
            function xunhuan(num, font, after) {
                for (let j = font; j < after; j++) {
                    var MusicList = document.getElementsByClassName("MusicList");
                    var div_1 = document.createElement("div");
                    var a = document.createElement("a");
                    var img = document.createElement("img");
                    var div_2 = document.createElement("div");
                    var i = document.createElement("i");
                    var span = document.createElement("span");
                    var div_3 = document.createElement("div_3");

                    MusicList[num].appendChild(div_1);
                    // MusicList[1].appendChild(div_1);
                    div_1.appendChild(a);
                    a.appendChild(img);
                    div_1.appendChild(div_2);
                    div_2.appendChild(i);
                    div_2.appendChild(span);
                    div_1.appendChild(div_3);

                    div_1.className = "CreateMusic";
                    a.className = "CreateMusic_a";
                    a.href = "javascript:;";
                    img.className = "CreateMusic_img";
                    div_2.className = "CreateMusic_bottom";
                    span.className = "CreateMusic_num";
                    div_3.className = "CreateMusic_name";

                    CreateMusic_img[j].src = results.result[j].picUrl + '?param=140y140"';
                    CreateMusic_img[j].id = results.result[j].id;
                    CreateMusic_name[j].innerHTML = results.result[j].name;
                    CreateMusic_num[j].innerHTML = results.result[j].trackCount;
                }
            }
            xunhuan(0, 0, 8);
            xunhuan(1, 8, 12);
            for (let i = 0; i < CreateMusic_img.length; i++) {
                CreateMusic_img[i].num = i;
                CreateMusic_img[i].onclick = function () {
                    console.log(this.id);
                    sessionStorage.setItem('musicid', this.id);
                    sessionStorage.setItem('type', '歌单');
                    parent.inner.src = '../4.歌单详情页/4.歌单详情页.html';
                }
            }
        }
    });


    // 榜单传数据
    var chart_musics = document.getElementsByClassName("chart_musics");
    let getchart_li_1 = defaultUrlHeader + '/playlist/detail?id=19723756';
    let getchart_li_2 = defaultUrlHeader + '/playlist/detail?id=3779629';
    let getchart_li_3 = defaultUrlHeader + '/playlist/detail?id=2884035';
    // 封装排行榜创造节点的函数
    function chartcreate(results, num, j) {
        for (let i = 0; i < 10; i++, j++) {
            let li = document.createElement("li");
            let div = document.createElement("div");
            let a = document.createElement("a");
            let div_1 = document.createElement("div");
            let a_2 = document.createElement("a");
            let a_3 = document.createElement("a");

            chart_musics[num].appendChild(li);
            li.appendChild(div);
            li.appendChild(a);
            li.appendChild(div_1);
            div_1.appendChild(a_2);
            div_1.appendChild(a_3);

            li.className = "chart_music";
            div.className = "chart_num";
            a.className = "chart_music_name";
            a_2.style.backgroundPosition = "0px -698px";
            a_2.style.backgroundImage = "url('../img/icon.png')";
            a_2.className = "add";
            a_3.style.backgroundPosition = "-297px -268px";
            a_2.href = "javascript:;";
            a_3.href = "javascript:;";
            div_1.className = "oper";

            div.innerHTML = i + 1;
            a.innerHTML = results.playlist.tracks[i].name;
            a.onclick = function () {
                sessionStorage.setItem("playing_id", results.playlist.tracks[i].id);
                sessionStorage.setItem('ing', 'false');
                parent.inner.src = '../6.歌曲详情/6.歌曲详情.html';
            }
            a_2.addEventListener('mouseover', function () {
                a_2.style.backgroundPosition = "-22px -698px";
            });
            a_2.addEventListener('mouseout', function () {
                a_2.style.backgroundPosition = "0px -698px";
            });
            a_2.addEventListener('click', function () {
                let name = results.playlist.tracks[i].name;
                let id = results.playlist.tracks[i].id;
                let musicname = results.playlist.tracks[i].ar[0].name;
                let picurl = results.playlist.tracks[i].al.picUrl;
                // 添加歌曲到待播歌单
                addmusic(name, id, musicname, picurl);
                alert('添加成功');
                let arrdata = JSON.parse(sessionStorage.getItem('arr'));
                playARR(arrdata);
            });
            // 收藏歌曲到我的歌单里
            a_3.addEventListener('click', function () {
                let user_1 = JSON.parse(sessionStorage.getItem("user"));
                plusMusic_div[0].style.display = 'block';
                sessionStorage.setItem('select_music', results.playlist.tracks[i].id);
                let timestamp = (new Date()).valueOf();
                let getmusicurl = defaultUrlHeader + '/user/playlist?uid=' + user_1.account.id + '&cookie=' + user_1.cookie + '&timestamp=' + timestamp;
                Ajax({
                    url: getmusicurl,
                    success: function (results) {
                        sessionStorage.setItem('select_musiclist', '');
                        for (let j = 0; j < results.playlist.length; j++) {
                            let li = document.createElement("li");
                            let span = document.createElement("span");
                            plusMusic_ul[0].appendChild(li);
                            li.appendChild(span);
                            li.className = 'plusMusic_li';
                            span.className = 'plusMusic_text';
                            span.innerHTML = results.playlist[j].name;
                            li.onclick = function () {
                                for (let k = 0; k < results.playlist.length; k++) {
                                    plusMusic_li[k].style.backgroundColor = '';
                                }
                                li.style.backgroundColor = '#9d9d9d';
                                sessionStorage.setItem('select_musiclist', results.playlist[j].id);
                            }
                        }
                        cancel_plusMusic[0].onclick = function () {
                            plusMusic_ul[0].innerHTML = '';
                            plusMusic_div[0].style.display = 'none';
                        }
                        confirm_plusMusic[0].onclick = function () {
                            let select_musiclist = sessionStorage.getItem("select_musiclist");
                            let select_music = sessionStorage.getItem("select_music");
                            let addurl = defaultUrlHeader + '/playlist/tracks?op=add&pid=' + select_musiclist + '&tracks=' + select_music + '&cookie=' + user_1.cookie;
                            Ajax({
                                url: addurl,
                                success: function () {
                                    alert("添加成功");
                                    plusMusic_ul[0].innerHTML = '';
                                    plusMusic_div[0].style.display = 'none';
                                }
                            })
                        }
                    }
                })
            });
        }
    }
    Ajax({
        url: getchart_li_1,
        success: function (results) {
            chartcreate(results, 0, 0);
        }
    });
    Ajax({
        url: getchart_li_2,
        success: function (results) {
            chartcreate(results, 1, 10);
        }
    });
    Ajax({
        url: getchart_li_3,
        success: function (results) {
            chartcreate(results, 2, 20);
        }
    });

    // 第二个轮播图
    var arrow_1 = document.getElementsByClassName("arrow_1");
    var roll_1_content = document.getElementsByClassName("roll_1_content");
    arrow_1[1].addEventListener('click', throttle(function () {
        roll_1_content[0].style.transition = '0.8s ease';
        roll_1_content[0].style.left = parseInt(getStyle(roll_1_content[0], "left")) - 645 + 'px';
        setTimeout(function () {
            if (parseInt(roll_1_content[0].style.left) == -1935) {
                roll_1_content[0].style.transition = '';
                roll_1_content[0].style.left = -645 + 'px';
            }
        }, 800)
    }, 900));
    arrow_1[0].addEventListener('click', throttle(function () {
        roll_1_content[0].style.transition = '0.8s ease';
        roll_1_content[0].style.left = parseInt(getStyle(roll_1_content[0], "left")) + 645 + 'px';
        setTimeout(function () {
            if (parseInt(roll_1_content[0].style.left) == 0) {
                roll_1_content[0].style.transition = '';
                roll_1_content[0].style.left = -1290 + 'px';
            }
        }, 800)
    }, 900));

    // 第二个轮播图传数据
    // 此处新碟上架的接口过慢，故改成最新专辑接口
    var roll_li_img = document.getElementsByClassName("roll_li_img");
    var roll_li_workname = document.getElementsByClassName("roll_li_workname");
    var roll_li_name = document.getElementsByClassName("roll_li_name");
    let getroll_li = defaultUrlHeader + '/album/newest';
    Ajax({
        url: getroll_li,
        success: function (results) {

            var roll_content_1 = document.getElementsByClassName("roll_content_1");
            var roll_content_2 = document.getElementsByClassName("roll_content_2");

            for (let i = 0, k = 0; i < 4; i++) {

                let j = 0;
                let v = 5;
                for (j, k, v; j < 5; j++, k++, v++) {
                    let li = document.createElement("li");
                    let a = document.createElement("a");
                    let img = document.createElement("img");
                    let div_1 = document.createElement("div");
                    let div_2 = document.createElement("div");
                    if (i == 0) {
                        roll_content_1[0].appendChild(li);
                    }
                    if (i == 1) {
                        roll_content_2[0].appendChild(li);
                    }
                    if (i == 2) {
                        roll_content_1[1].appendChild(li);
                    }
                    if (i == 3) {
                        roll_content_2[1].appendChild(li);
                    }

                    li.appendChild(a);
                    a.appendChild(img);
                    li.appendChild(div_1);
                    li.appendChild(div_2);

                    a.className = "roll_li_a";
                    a.href = "javascript:;";
                    img.className = "roll_li_img";
                    div_1.className = "roll_li_workname";
                    div_2.className = "roll_li_name";

                    if (i == 0 || i == 2) {
                        roll_li_img[k].src = results.albums[j].blurPicUrl + '?param=100y100';
                        roll_li_img[k].id = results.albums[j].id;
                        roll_li_workname[k].innerHTML = results.albums[j].artists[0].name;
                        roll_li_name[k].innerHTML = results.albums[j].name;
                    } else {
                        roll_li_img[k].src = results.albums[v].blurPicUrl + '?param=100y100';
                        roll_li_img[k].id = results.albums[v].id;
                        roll_li_workname[k].innerHTML = results.albums[v].artists[0].name;
                        roll_li_name[k].innerHTML = results.albums[v].name;
                    }
                }
            }
            for (let i = 0; i < roll_li_img.length; i++) {
                roll_li_img[i].num = i;
                roll_li_img[i].onclick = function () {
                    console.log("123");
                    console.log(this.id);
                    sessionStorage.setItem('musicid', this.id);
                    sessionStorage.setItem('type', '专辑');
                    // window.location.href = '../4.歌单详情页/4.歌单详情页.html';
                    parent.inner.src = '../4.歌单详情页/4.歌单详情页.html';
                }
            }


        }
    });

    // 搜索功能
    search();
    // 歌曲播放操作功能
    bofang();
    shichangload();
    play();
    // 点击导航栏跳转页面
    one();
    two();
    five();
    seven();
    // 可以操作待播歌单
    let arrdata = JSON.parse(sessionStorage.getItem('arr'));
    playARR(arrdata);

    
}