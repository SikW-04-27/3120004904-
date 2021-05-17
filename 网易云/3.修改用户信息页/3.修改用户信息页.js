window.onload = function () {
    var user_3 = JSON.parse(sessionStorage.getItem("user"));
    console.log(user_3);

    // 可以操作播放条
    bofang();
    shichangload();
    play();

    var avatar = document.getElementsByClassName("avatar");
    var nickname = document.getElementById("nickname");
    var signature_1 = document.getElementById("signature");
    var birthday = document.getElementById("birthday");
    var save_button = document.getElementsByClassName("save_button");
    var oldphone = document.getElementById("oldphone");
    var oldcaptcha = document.getElementById("oldcaptcha");
    var newphone = document.getElementById("newphone");
    var captcha = document.getElementById("captcha");
    var captcha_button = document.getElementsByClassName("captcha_button");
    var save_button1 = document.getElementsByClassName("save_button1");
    var phonenum = document.getElementById("phonenum");
    var captcha_password = document.getElementById("captcha_password");
    var file = document.getElementsByClassName("file");

    // 将右上角用户头像导入
    avatar[0].src = user_3.profile.avatarUrl;
    avatar[1].src = user_3.profile.avatarUrl;
    nickname.value = user_3.profile.nickname;

    // 填入信息
    var user_info = user_3.profile.userId;
    let timestamp=(new Date()).valueOf();
    let getUserList =
        defaultUrlHeader + '/user/detail?uid=' + user_info + '&cookie=' + user_3.cookie+'&timestamp='+timestamp;
    Ajax({
        url: getUserList,
        success: function (result) {
            console.log(result);
            nickname.value = result.profile.nickname;
            signature_1.value = result.profile.signature;
            let birth = formatDateT(result.profile.birthday);
            let newbirth = birth.split('T');
            birthday.value = newbirth[0];
        }
    });

    // 监听file是否改变
    file[0].onchange = function (event) {
        let file_0 = event.target.files[0];
        let formData = new FormData();
        console.log(file_0);
        formData.append('imgFile', file_0);
        console.log(formData.get('imgFile'));

        var xhr1=new XMLHttpRequest();
        xhr1.open('post','https://autumnfish.cn/avatar/upload?imgSize=140&cookie='+user_3.cookie);
        xhr1.setRequestHeader('Content-Type','multipart/form-data');
        xhr1.send(formData);
        xhr1.onreadystatechange=function(){
            if(xhr1.readyState===4){
                if(xhr1.status>=200&&xhr1.status<300){
                    // avatar[1].src=results.data.url_pre;
                    console.log("123");
                }
            }
        }
    }

    // 保存设置
    save_button[0].onclick = function () {
        timer = new Date(birthday.value).getTime();
        let updataurl =
            defaultUrlHeader + '/user/update?' + 'gender=0&signature=' + signature_1.value + '&city=440300&nickname=' + nickname.value + '&birthday=' + timer + '&province=440000&cookie=' + user_3.cookie+'&timestamp='+timestamp;
        Ajax({
            url: updataurl,
            success: function () {
                parent.inner.src = '../3.修改用户信息页/3.修改用户信息页.html';
            }
        });
    };

    // 发送原手机验证码
    captcha_button[0].onclick = function () {
        let oldphones = oldphone.value;
        console.log(oldphones);
        if (oldphones == ' ') {
            alert("没有");
        } else {
            let oldurl = defaultUrlHeader + '/captcha/sent?phone=' + oldphones;
            Ajax({
                url: oldurl
            })
        }
    };
    // 发送新手机验证码
    captcha_button[1].onclick = function () {
        let newphones = newphone.value;
        if (newphones == ' ') {
            alert("没有");
        } else {
            let newurl = defaultUrlHeader + '/captcha/sent?phone=' + newphones;
            Ajax({
                url: newurl
            })
        }
    };
    // 更换绑定手机
    save_button1[0].onclick = function () {
        let oldcaptchas = oldcaptcha.value;
        let newcaptchas = captcha.value;
        let urls = defaultUrlHeader + '/rebind?' + 'phone=' + newphone.value + '&oldcaptcha=' + oldcaptchas + '&captcha=' + newcaptchas+'&cookie='+user_3.cookie;
        Ajax({
            url: urls,
            success:function(results){
                alert('绑定成功');
            },
            error:function(results){
                alert(results.message);
            }
        })
    };

    // 修改密码发送验证码
    captcha_button[2].onclick = function () {
        let phonenums = phonenum.value;
        if (phonenums == ' ') {
            alert("没有");
        } else {
            let newurl = defaultUrlHeader + '/captcha/sent?phone=' + phonenums;
            Ajax({
                url: newurl
            })
        }
    };
    // 修改密码
    save_button1[1].onclick = function () {
        let urls = defaultUrlHeader + '/register/cellphone?' + 'phone=' + phonenum.value + '&password=' + new_password.value + '&captcha=' + captcha_password.value + '&nickname=' + user_3.profile.nickname + '&cookie=' + user_3.cookie;
        Ajax({
            url: urls,
            success:function(){
                alert('修改成功');
            },
            error:function(result){
                alert(result.data.blockText);
            }
        })
    }

    // 可以操作待播歌单
    let arrdata = JSON.parse(sessionStorage.getItem('arr'));
    playARR(arrdata);
    
    // 可以操作播放历史
    let historyurl = defaultUrlHeader + '/user/record?uid=' + user_3.account.id + '&type=1&cookie=' + user_3.cookie;
    historylist(historyurl);

    // 点击导航栏跳转页面
    one();
    two();
    five();
    seven();

    // 搜索功能
    search();

}