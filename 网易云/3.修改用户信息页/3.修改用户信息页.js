window.onload = function () {
    var user_3 = JSON.parse(sessionStorage.getItem("user"));
    console.log(user_3);

    const defaultUrlHeader = "https://autumnfish.cn";
    // 打开如果有保存的话自动登录

    // let dengluurl_1 =
    //     defaultUrlHeader + "/login/cellphone?" + "phone=" + getCookie('phone') + "&" + "password=" + getCookie('password');
    // Ajax({
    //     url: dengluurl_1,
    //     success: function () {
    //         console.log("ihioh");
    //     }
    // });



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

    var user_info = user_3.profile.userId;
    let getUserList =
        defaultUrlHeader + '/user/detail?uid=' + user_info;
    Ajax({
        url: getUserList,
        success: function (result) {
            signature_1.value = result.profile.signature;
            let birth = formatDateT(result.profile.birthday);
            let newbirth = birth.split('T');
            birthday.value = newbirth[0];
        }
    });

    // 将时间戳转化为时间
    function formatDateT(dataTime) {
        var newDate = new Date(dataTime + 8 * 3600 * 1000)
        return newDate.toISOString()
    };

    // 监听file是否改变
    file[0].onchange = function (event) {
        let file_0 = event.target.files[0];
        let formData = new FormData();
        formData.append('imgFile', file_0)
        console.log(file_0);
        // 创建字符串对象，用于存储请求报文的字符串
        var params = '';
        // 获取参数对象中的各种数据并拼接在一起
        for (var attr in formData) {
            params += attr + '=' + formData[attr] + '&';
        }
        // 对拼接在一起的字符串进行截取，目的在于将字符串末尾的 & 去除
        params = params.substr(0, params.length - 1);
        Ajax({
            url: 'https://autumnfish.cn/avatar/upload',
            header: {
                'Content-Type': 'multipart/form-data'
            },
            success: function () {
                console.log(url);
            }
        });

    }

    // 保存设置
    save_button[0].onclick = function () {
        let updataurl =
            defaultUrlHeader + '/user/update?' + 'gender=0&signature=' + signature_1.value + '&city=440300&nickname=' + nickname.value + '&birthday=1525918298004&province=440000';
        console.log(updataurl);
        Ajax({
            url: updataurl
        });

        


        // const res = await axios({
        //     url: '/user/detail?uid=32953014&timestamp=${Date.now()}',
        //     withCredentials: true, //关键
        //   })
        // async function upload(file) {
        //     var formData = new FormData()
        //     formData.append('imgFile', file)
        //     const res = await axios({
        //       method: 'get',
        //       url: 'http://autumnfish.cn/avatar/upload'
        //       },
        //       headers: {
        //         'Content-Type': 'multipart/form-data',
        //       },
        //       data: formData,
        //     })
        //     document.querySelector('#avatar').src = res.data.data.url
        //   }
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
        console.log(oldcaptchas);
        console.log(newcaptchas);
        let urls = defaultUrlHeader + '/rebind?' + 'phone=' + newphone.value + '&oldcaptcha=' + oldcaptchas + '&captcha=' + newcaptchas;
        Ajax({
            url: urls
        })
    };
    // 发送验证码可优化封装函数
    captcha_button[2].onclick = function () {
        let phonenums = phonenum.value;
        if (phonenums == ' ') {
            alert("没有");
        } else {
            console.log("09876");
            let newurl = defaultUrlHeader + '/captcha/sent?phone=' + phonenums;
            Ajax({
                url: newurl
            })
        }
    };

    // 修改密码
    save_button1[1].onclick = function () {
        let urls = defaultUrlHeader + '/register/cellphone?' + 'phone=' + phonenum.value + '&password=' + new_password.value + '&captcha=' + captcha_password.value + '&nickname=' + user_3.profile.nickname;
        Ajax({
            url: urls
        })
    }
}