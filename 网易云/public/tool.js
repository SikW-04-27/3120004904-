const defaultUrlHeader = "https://autumnfish.cn";
function Ajax(options) {
    var defaults = {
        url: '',
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function () { },
        error: function () { }
    }
    Object.assign(defaults, options);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', defaults.url);
    xhr.send();
    xhr.onload = function () {
        var contentType = xhr.getResponseHeader('Content-Type');
        var responseText = xhr.responseText;
        if (contentType.includes('application/json')) {
            responseText = JSON.parse(responseText);
        }
        if (xhr.status == 200) {
            defaults.success(responseText);
        } else {
            defaults.error(responseText);
        }

    }
}

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

// 获取样式的函数，兼容所有浏览器
function getStyle(obj, name) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj, null)[name];
    } else {
        return obj.currentStyle[name];  //IE
    }
}

// 将时间戳转化为时间
function formatDateT(dataTime) {
    var newDate = new Date(dataTime + 8 * 3600 * 1000)
    return newDate.toISOString()
}

function bofangurls(url) {
    broadcast_1.src = url;
}
var broadcast = document.getElementsByClassName("broadcast");
function bofang() {
    // 播放条
    var broadcast_1 = document.getElementById("broadcast_1");


    // 播放暂停继续



    // 获取音乐时长
    if (broadcast_1 != null) {
        // var duration;
        broadcast_1.load();
        broadcast_1.oncanplay = function () {
            var duraTime = document.querySelector(".duraTime");
            duraTime.innerHTML = transTime(broadcast_1.duration)
        }
    }

    // 将时间格式转换
    function transTime(time) {
        let duration = parseInt(time);
        let minute = parseInt(duration / 60);
        let sec = (duration % 60) + "";
        let isM0 = ":";
        if (minute == 0) {
            minute = "00";
        } else if (minute < 10) {
            minute = "0" + minute;
        }
        if (sec.length == 1) {
            sec = "0" + sec;
        }
        return minute + isM0 + sec;
    }

    // 获取时长的进度条
    var shichang = document.getElementById("shichang");
    shichang.value = 0;
    broadcast_1.ontimeupdate = function () {
        shichang.value = (broadcast_1.currentTime / broadcast_1.duration) * 100.0;
        if (broadcast_1.currentTime == 0) {
            shichang.value = 0;
        }
        shichang.style.backgroundSize = shichang.value + '%';
        var currentTime = document.querySelector(".currentTime");
        currentTime.innerHTML = transTime(parseInt(broadcast_1.currentTime));
        var duraTime = document.querySelector(".duraTime");
        duraTime.innerHTML = transTime(broadcast_1.duration);
        if (broadcast_1.currentTime === broadcast_1.duration) {
            
        }
    }

    shichang.oninput = function (e) {
        let x = e.target.value;
        let bfb = (x / 100.0) * broadcast_1.duration;
        shichang.style.value = bfb;
        let sc = (bfb / broadcast_1.duration) * 100.0;
        shichang.style.backgroundSize = sc + "%";
        broadcast_1.currentTime = bfb;
        let currentTime = document.querySelector(".currentTime");
        currentTime.innerHTML = transTime(parseInt(broadcast_1.currentTime));
        if (broadcast_1.currentTime === broadcast_1.duration) {
            broadcast_1.currentTime = 0;
        }
    };

    // 获取调节音量的条
    var voice = document.getElementById("voice");
    voice.style.backgroundSize = broadcast_1.volume * 100 + '%';
    voice.value = broadcast_1.volume * 100;
    voice.oninput = function (e) {
        // console.log(e)
        let x = e.target.value;
        let bfb = (x / 100.0) * 1;
        voice.style.backgroundSize = bfb * 100 + "%";
        broadcast_1.volume = bfb;
    };

    // 静音
    var bar_voice = document.getElementsByClassName("bar_voice");
    var tem;
    bar_voice[0].onclick = function () {
        // console.log(typeof(temp));
        if (broadcast_1.volume != 0) {
            tem = broadcast_1.volume;
            voice.style.backgroundSize = 0 * 100 + '%';
            voice.value = 0;
            broadcast_1.volume = 0;
        } else {
            // console.log("7980");
            // console.log(tem);
            voice.style.backgroundSize = tem * 100 + '%';
            voice.value = tem * 100;
            broadcast_1.volume = tem;
        }
    }
}
function play() {
    // 不能用事件监听
    broadcast[0].onclick = function () {
        if (broadcast_1.paused) {
            broadcast_1.play();
            console.log("555");
            broadcast[0].style.backgroundPosition = '0 -165px';
        } else {
            broadcast_1.pause();
            console.log("666");
            broadcast[0].style.backgroundPosition = '0 -204px';
        }
    };
    broadcast[0].onmouseover = function () {
        if (broadcast_1.paused) {
            console.log("111");
            broadcast[0].style.backgroundPosition = '-40px -204px';
        } else {
            console.log("222");
            broadcast[0].style.backgroundPosition = '-40px -165px';
        }
    };
    broadcast[0].onmouseover = function () {
        if (broadcast_1.paused) {
            console.log("333");
            broadcast[0].style.backgroundPosition = '0 -204px';
        } else {
            console.log("444");
            broadcast[0].style.backgroundPosition = '0 -165px';
        }
    };
}


