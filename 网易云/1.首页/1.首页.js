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
            }
        });
    }

    let SignUp_phone = document.getElementById("SignUp_phone");
    let SignUp_password = document.getElementById("SignUp_password");
    let email_phone = document.getElementById("email_phone");
    let email_password = document.getElementById("email_password");
    var SignUp_btn = document.getElementById("SignUp_btn");
    var email_SignUp_btn = document.getElementById("email_SignUp_btn");
    var SignUp_User = document.querySelector(".SignUp_User");
    var avatar = document.getElementsByClassName("avatar");
    var SignUp = document.querySelector(".SignUp");
    
    var user_profile_name = document.getElementsByClassName("user_profile_name");
    var user_profile_levelnum = document.getElementsByClassName("user_profile_levelnum");
    var user_profile_li = document.getElementsByClassName("user_profile_li");
    // 多选框
    var Rem_Password = document.getElementById("Rem_Password");
    var SignUp_User_down1 = document.querySelector(".SignUp_User_down1");
    var SignUp_User_down2 = document.querySelector(".SignUp_User_down2");

    // 点击登录按钮
    function getCookie(name) {
        var cookieArray = document.cookie.split(";");
        for (var i = 0; i < cookieArray.length; ++i) {
            var cookies = cookieArray[i].split("=");
            if (cookies[0].trim() == name) {
                return cookies[1];
            }
        }
        if (i == cookieArray.length) {
            return "";
        }

    }

    // 记住账号密码
    SignUp.addEventListener('click', function () {
        SignUp_phone.value = getCookie('phone');
        SignUp_password.value = getCookie('password');
        if (getCookie('rem') == 'true') {
            Rem_Password.checked = true;
        }

    })

    // 点击头像跳转到新页面
    SignUp_User_down1.onclick = function () {
        window.location.href = "../2.用户详情页/2.用户详情页.html";
    }
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
                if(getCookie('rem')=='false'){
                    avatar[1].src='';
                    user_profile_name[0].innerHTML=' ';
                    user_profile_levelnum[0].innerHTML = ' ';
                }
            }
        });
    }

    // 手机号登录
    SignUp_btn.addEventListener('click', function () {

        let phone = SignUp_phone.value;
        let password = SignUp_password.value;
        let dengluurl =
            defaultUrlHeader + "/login/cellphone?" + "phone=" + phone + "&" + "password=" + password;
        Ajax({
            url: dengluurl,
            success: function (result) {
                SignUpBox.style.display = "none";
                console.log(result);
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
                // SignUp_User.img.src=responseText.avatarUrl;
            },
            error: function () {
                SignUpBox.innerHTML = "密码错误";
            }
        });
    });
    // 邮箱登录
    email_SignUp_btn.onclick = function () {
        let email = email_phone.value;
        let password = email_password.value;
        let dengluurl =
            defaultUrlHeader + "/login?email=" + email + "&password=" + password;
        Ajax({
            url: dengluurl
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
    // 二维码登录跳转
    var SignUp_qrcode0 = document.getElementById("SignUp_qrcode0");
    SignUp.addEventListener('click', function () {
        // alert("123");
        SignUpBox.style.display = "block";
    });
    SignUp_error.onclick = function () {
        SignUpBox.style.display = "none";
        SignUpbig.style.display = "block";
        sentctcodebig.style.display = "none";
    }
    register_btn.onclick = function () {
        SignUpbig.style.display = "none";
        sentctcodebig.style.display = "block";
    }
    SignUp_email0.onclick = function () {
        SignUpbig.style.display = "none";
        emailbig.style.display = "block";
    }

    // 发送验证码
    let sentctcode_btn = document.getElementById("sentctcode_btn");
    let sentctcode_phone = document.getElementById("sentctcode_phone");
    // 电话号码跳转
    let SignUp_phone1 = document.getElementById("SignUp_phone1");
    // 二维码跳转
    let SignUp_qrcode1 = document.getElementById("SignUp_qrcode1");
    sentctcode_btn.onclick = function () {
        let phone = sentctcode_phone.value;
        // console.log(phone);
        let senturl = defaultUrlHeader + "/captcha/sent?phone=" + phone;
        Ajax({ url: senturl });
    }
    SignUp_phone1.onclick = function () {
        SignUpbig.style.display = "block";
        sentctcodebig.style.display = "none";
    }

    // 验证验证码
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
    }
    SignUp_phone2.onclick = function () {
        SignUpbig.style.display = "block";
        registerbig.style.display = "none";
    }

    // 邮箱登录
    let SignUp_phone3 = document.getElementById("SignUp_phone3");
    let email_register_btn = document.getElementById("email_register_btn");
    SignUp_phone3.onclick = function () {
        SignUpbig.style.display = "block";
        emailbig.style.display = "none";
    }
    email_register_btn.onclick = function () {
        SignUpbig.style.display = "none";
        sentctcodebig.style.display = "block";
    }

    // 二维码
    SignUp_qrcode0.onclick = function () {
        Ajax({ url: "https://autumnfish.cn/login/qr/key" });
    }


    // 轮播图
    let roll_li = document.getElementsByClassName("roll_li");
    let pointer = document.getElementsByClassName("pointer");
    let arrow = document.getElementsByClassName("arrow");
    var index = 0;

    function move(font, after, speed) {
        // timer=setInterval(() => {

        function one() {
            setTimeout(() => {
                // console.log(font);
                // console.log(font + "sss");
                roll_li[after].style.display = "block";
                iterator.next();
            }, 1);
        }
        function two() {
            setTimeout(() => {
                // console.log(index + "aaa");
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

    automove();

    // 点击导航点跳转函数
    for (let i = 0; i < pointer.length; i++) {
        pointer[i].num = i;
        // 点击跳转，并且开启节流，防止用户误操作
        pointer[i].addEventListener("click", throttle(function () {
            let tiao = this.num;
            clearInterval(timer);
            move(index, tiao, 1);
            index = tiao;
            automove();
        }, 2000))
    }

    // 点击箭头跳转函数
    for (let i = 0; i < arrow.length; i++) {
        arrow[i].num = i;
        arrow[i].addEventListener("click", function () {
            clearInterval(timer);
            // console.log(index);
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

    // 实现鼠标移入暂停
    for (let i = 0; i < roll_li.length; i++) {
        roll_li.num = i;
        roll_li[i].addEventListener("mouseover", function () {
            clearInterval(timer);
        })
        roll_li[i].addEventListener("mouseout", function () {
            automove();
        })
    }



    // 加载推荐的信息
    var CreateMusic_img = document.getElementsByClassName("CreateMusic_img");
    var CreateMusic_name = document.getElementsByClassName("CreateMusic_name");
    var CreateMusic_num = document.getElementsByClassName("CreateMusic_num");
    let getMusicList =
        defaultUrlHeader + '/personalized';
    Ajax({
        url: getMusicList,
        success: function (results) {
            CreateMusic_img[0].src = results.result[0].picUrl;
            CreateMusic_name[0].innerHTML = results.result[0].name;
            CreateMusic_num[0].innerHTML = results.result[0].trackCount;
            CreateMusic_img[1].src = results.result[8].picUrl;
            CreateMusic_name[1].innerHTML = results.result[8].name;
            CreateMusic_num[1].innerHTML = results.result[8].trackCount;
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
                    a.href = "";
                    img.className = "CreateMusic_img";
                    div_2.className = "CreateMusic_bottom";
                    span.className = "CreateMusic_num";
                    div_3.className = "CreateMusic_name";

                    CreateMusic_img[j].src = results.result[j].picUrl;
                    CreateMusic_name[j].innerHTML = results.result[j].name;
                    CreateMusic_num[j].innerHTML = results.result[j].trackCount;
                }
            }
            xunhuan(0, 1, 8);
            xunhuan(1, 9, 12);

        }
    });


    // 榜单传数据
    var chart_musics = document.getElementsByClassName("chart_musics");
    var chart_num = document.getElementsByClassName("chart_num");
    var chart_music_name = document.getElementsByClassName("chart_music_name");
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
            let a_1 = document.createElement("a");
            let a_2 = document.createElement("a");
            let a_3 = document.createElement("a");

            chart_musics[num].appendChild(li);
            li.appendChild(div);
            li.appendChild(a);
            li.appendChild(div_1);
            div_1.appendChild(a_1);
            div_1.appendChild(a_2);
            div_1.appendChild(a_3);

            li.className = "chart_music";
            div.className = "chart_num";
            a.className = "chart_music_name";
            a_1.style.backgroundPosition = "-267px -268px";
            a_2.style.backgroundPosition = "0px -698px";
            a_2.style.backgroundImage = "url('../img/icon.png')";
            a_3.style.backgroundPosition = "-297px -268px";
            a_1.href = "";
            a_2.href = "";
            a_3.href = "";
            div_1.className = "oper";

            chart_num[j].innerHTML = i + 1;
            chart_music_name[j].innerHTML = results.playlist.tracks[i].name;
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
    var roll_li_img = document.getElementsByClassName("roll_li_img");
    var roll_li_workname = document.getElementsByClassName("roll_li_workname");
    var roll_li_name = document.getElementsByClassName("roll_li_name");
    let getroll_li =
        defaultUrlHeader + '/top/album';
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
                    a.href = "";
                    img.className = "roll_li_img";
                    div_1.className = "roll_li_workname";
                    div_2.className = "roll_li_name";

                    if (i == 0 || i == 2) {
                        roll_li_img[k].src = results.monthData[j].blurPicUrl;
                        roll_li_workname[k].innerHTML = results.monthData[j].artists[0].name;
                        roll_li_name[k].innerHTML = results.monthData[j].name;
                    } else {
                        roll_li_img[k].src = results.monthData[v].blurPicUrl;
                        roll_li_workname[k].innerHTML = results.monthData[v].artists[0].name;
                        roll_li_name[k].innerHTML = results.monthData[v].name;
                    }


                }
            }


        }
    });

    // 在第二页返回时图片数据也能正常显示
    // let user = JSON.parse(sessionStorage.getItem("user"));
    // avatar[0].src = user.profile.avatarUrl;
}