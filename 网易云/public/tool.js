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
    parent.broadcast_1[0].src = url;
    console.log(parent.broadcast_1[0].src);
}
var broadcast = document.getElementsByClassName("broadcast");
var header_avatar_img = document.getElementsByClassName("header_avatar_img");
var bar_musicname = document.getElementsByClassName("bar_musicname");
var bar_musician = document.getElementsByClassName("bar_musician");
var duraTime = document.getElementsByClassName("duraTime");
var currentTime = document.getElementsByClassName("currentTime");
var broadcast_1 = document.getElementsByClassName("broadcast_1");
var voice = document.getElementsByClassName("voice");
var shichang = document.getElementsByClassName("shichang");
var next = document.getElementsByClassName("next");
var prev = document.getElementsByClassName("prev");
var collect_01 = document.getElementsByClassName("collect_01");
var collect_01_li = document.getElementsByClassName("collect_01_li");
function bofang() {
    // 获取音乐时长
    if (parent.broadcast_1[0] != null) {
        // var duration;
        // 重新加载歌曲
        // parent.broadcast_1[0].load();
        parent.broadcast_1[0].oncanplay = function () {
            parent.duraTime[0].innerHTML = transTime(parent.broadcast_1[0].duration)
        }
    }

    // 获取调节音量的条
    parent.voice[0].style.backgroundSize = parent.broadcast_1[0].volume * 100 + '%';
    parent.voice[0].value = parent.broadcast_1[0].volume * 100;
    parent.voice[0].oninput = function (e) {
        // console.log(e)
        let x = e.target.value;
        let bfb = (x / 100.0) * 1;
        parent.voice[0].style.backgroundSize = bfb * 100 + "%";
        parent.broadcast_1[0].volume = bfb;
    };

    // 静音
    var bar_voice = document.getElementsByClassName("bar_voice");
    var tem;
    bar_voice.onclick = function () {
        // console.log(typeof(temp));
        if (parent.broadcast_1[0].volume != 0) {
            tem = parent.broadcast_1[0].volume;
            parent.voice[0].style.backgroundSize = 0 * 100 + '%';
            parent.voice[0].value = 0;
            parent.broadcast_1[0].volume = 0;
        } else {
            // console.log("7980");
            // console.log(tem);
            parent.voice[0].style.backgroundSize = tem * 100 + '%';
            parent.voice[0].value = tem * 100;
            parent.broadcast_1[0].volume = tem;
        }
    }
}

// 进度条操作
function shichangload() {
    // parent.shichang[0].value = 0;
    parent.broadcast_1[0].addEventListener("timeupdate", function () {
        parent.shichang[0].value = (parent.broadcast_1[0].currentTime / parent.broadcast_1[0].duration) * 100.0;
        if (parent.broadcast_1[0].currentTime == 0) {
            parent.shichang[0].value = 0;
        }
        parent.shichang[0].style.backgroundSize = parent.shichang[0].value + '%';
        parent.currentTime[0].innerHTML = transTime(parseInt(parent.broadcast_1[0].currentTime));
        parent.duraTime[0].innerHTML = transTime(parent.broadcast_1[0].duration);
        if (parent.broadcast_1[0].currentTime === parent.broadcast_1[0].duration) {

        }
    })

    parent.shichang[0].addEventListener("input", function (e) {
        let x = e.target.value;
        let bfb = (x / 100.0) * parent.broadcast_1[0].duration;
        parent.shichang[0].style.value = bfb;
        let sc = (bfb / parent.broadcast_1[0].duration) * 100.0;
        parent.shichang[0].style.backgroundSize = sc + "%";
        parent.shichang[0].addEventListener('mouseup',function(){
             parent.broadcast_1[0].currentTime = bfb;
        })
       
        parent.currentTime[0].innerHTML = transTime(parseInt(parent.broadcast_1[0].currentTime));
        if (parent.broadcast_1[0].currentTime === parent.broadcast_1[0].duration) {
            parent.broadcast_1[0].currentTime = 0;
        }
    });
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

// 播放暂停
function playorpause(){
    if (parent.broadcast_1[0].paused) {
        parent.broadcast[0].style.backgroundPosition = '0 -165px';
    } else {
        parent.broadcast[0].style.backgroundPosition = '0 -204px';
    }
}

// 播放
function play() {
    // 不能用事件监听
    var middle_left = document.getElementsByClassName("middle_left");
    parent.broadcast[0].onclick = function () {
        if (parent.broadcast_1[0].paused) {
            parent.broadcast_1[0].play();
            parent.broadcast[0].style.backgroundPosition = '0 -165px';
            if(middle_left[0]){
                middle_left[0].className = 'middle_left play_roll';
            }
            
        } else {
            parent.broadcast_1[0].pause();
            parent.broadcast[0].style.backgroundPosition = '0 -204px';
            if(middle_left[0]){
                middle_left[0].className = 'middle_left play_roll pause';
            }
            
        }
    };
    parent.broadcast[0].onmouseover = function () {
        if (parent.broadcast_1[0].paused) {
            parent.broadcast[0].style.backgroundPosition = '-40px -204px';
        } else {
            parent.broadcast[0].style.backgroundPosition = '-40px -165px';
        }
    };
    parent.broadcast[0].onmouseover = function () {
        if (parent.broadcast_1[0].paused) {
            parent.broadcast[0].style.backgroundPosition = '0 -204px';
        } else {
            parent.broadcast[0].style.backgroundPosition = '0 -165px';
        }
    };



}

// 歌曲时间转化为秒数
function dtime(dt) {
    var min = parseInt(dt / 1000 / 60);
    var sec = dt / 1000 % 60;
    sec = parseInt(sec);
    if (sec < 10) {
        sec = '0' + sec;
    }
    ct = min + ':' + sec;
    return ct;
}

var onebtn = document.getElementsByClassName('onebtn');
var twobtn = document.getElementsByClassName("twobtn");
var fivebtn = document.getElementsByClassName("fivebtn");
var sevenbtn = document.getElementsByClassName("sevenbtn");

// 导航栏跳转
function one() {
    onebtn[0].onclick = function () {
        parent.inner.src = '../1.首页/1.首页.html';
    }
}
function two() {
    twobtn[0].onclick = function () {
        parent.inner.src = '../2.用户详情页/2.用户详情页.html';
    }
}
function five() {
    fivebtn[0].onclick = function () {
        parent.inner.src = '../5.搜索歌曲页面/5.搜索歌曲页面.html';
    }
}
function seven() {
    sevenbtn[0].onclick = function () {
        parent.inner.src = '../7.歌手页/7.歌手页.html';
    }
}

var collect_02_li = document.getElementsByClassName("collect_02_li");
var collect_02_delete = document.getElementsByClassName("collect_02_delete");
var collect_02 = document.getElementsByClassName("collect_02");

// 加载待播歌曲
function updataARR() {
    let arrdata = JSON.parse(sessionStorage.getItem('arr'));
    parent.collect_02[0].innerHTML = '';
    for (let i = 1; i < arrdata.arr.length; i++) {
        let li = document.createElement("li");
        let span_1 = document.createElement("span");
        let span_2 = document.createElement("span");
        let span_3 = document.createElement("span");
        parent.collect_02[0].appendChild(li);
        li.appendChild(span_1);
        li.appendChild(span_2);
        li.appendChild(span_3);
        li.className = 'collect_02_li';
        span_1.className = 'collect_02_num';
        span_2.className = 'collect_02_content';
        span_3.className = 'collect_02_delete fas fa-trash';
        span_1.innerHTML = i;
        span_2.innerHTML = arrdata.arr[i].name;
    }


}

// 给待播歌单里的歌曲添加点击事件
function playARR(arrdata) {
    for (let i = 0; i < parent.collect_02_li.length; i++) {
        parent.collect_02_li[i].addEventListener('click', function () {
            parent.broadcast_1[0].load();
            let x = i;
            if (document.querySelector(".play_roll")) {
                parent.inner.src = '../6.歌曲详情/6.歌曲详情.html';
            }

            autoplayARR(arrdata, x);
        });
        // 下一首
        parent.next[0].onclick = function () {
            let arr_x = sessionStorage.getItem("arr_x");
            arr_x++;
            if (arr_x > arrdata.arr.length - 2) {
                arr_x = 0;
            }
            if (document.querySelector(".play_roll")) {
                parent.inner.src = '../6.歌曲详情/6.歌曲详情.html';
            }
            autoplayARR(arrdata, arr_x);

        }
        // 上一首
        parent.prev[0].onclick = function () {
            let arr_x = sessionStorage.getItem("arr_x");
            arr_x--;
            if (arr_x < 0) {
                arr_x = arrdata.arr.length - 2;
            }
            if (document.querySelector(".play_roll")) {
                parent.inner.src = '../6.歌曲详情/6.歌曲详情.html';
            }
            autoplayARR(arrdata, arr_x);
        }
        // 歌曲播放结束下一首播放
        parent.broadcast_1[0].onended = function () {
            let arr_x = sessionStorage.getItem("arr_x");
            parent.broadcast_1[0].load();
            arr_x++;
            if (document.querySelector(".play_roll")) {
                parent.inner.src = '../6.歌曲详情/6.歌曲详情.html';
            }
            if (arrdata.arr[arr_x + 1]) {
                autoplayARR(arrdata, arr_x);
            } else {
                autoplayARR(arrdata, 0);
            }
            // autoplayARR(arrdata, x);
        }
    }
    // 删除待播清单里面的歌
    for (let i = 0; i < parent.collect_02_li.length; i++) {
        parent.collect_02_delete[i].addEventListener('click', function (event) {
            // 取消冒泡
            event.cancelBubble = true;
            let arrdata = JSON.parse(sessionStorage.getItem('arr'));
            let arrnew = '{"arr":[{}';
            for (let j = 1; j < arrdata.arr.length; j++) {
                if (j != i + 1) {
                    arrnew += ',{"name":"' + arrdata.arr[j].name + '","id":' + arrdata.arr[j].id + ',"musicname":"' + arrdata.arr[j].musicname + '","picurl":"' + arrdata.arr[j].picurl + '"}';
                }

            }
            arrnew += ']}';
            sessionStorage.setItem("arr", arrnew);
            updataARR();
            let arrdata_1 = JSON.parse(sessionStorage.getItem('arr'));
            playARR(arrdata_1);
        })
    }


}

// 添加歌曲到待播歌单
function addmusic(name, id, musicname, picurl) {
    let name_value = name;
    let id_value = id;
    let musicname_value = musicname;
    let picurl_value = picurl;
    let ARR = sessionStorage.getItem('arr');
    let x = ARR.length - 2;
    ARR = ARR.slice(0, x) + ',{"name":"' + name_value + '","id":' + id_value + ',"musicname":"' + musicname_value + '","picurl":"' + picurl_value + '"}' + ']}';
    sessionStorage.setItem('arr', ARR);
    updataARR();
}

// 待播清单自动播放
function autoplayARR(arrdata, x) {
    for (let j = 0; j < parent.collect_02_li.length; j++) {
        parent.collect_02_li[j].style.backgroundColor = '';
        parent.collect_02_li[j].style.color = '#d3d3d3';
    }
    parent.broadcast[0].style.backgroundPosition = '0 -165px';
    sessionStorage.setItem('playing_id', arrdata.arr[x + 1].id);
    sessionStorage.setItem('ing', 'false');
    bofangurl = defaultUrlHeader + '/song/url?id=' + arrdata.arr[x + 1].id;
    parent.bar_musicname[0].innerHTML = arrdata.arr[x + 1].name;
    parent.bar_musician[0].innerHTML = arrdata.arr[x + 1].musicname;
    parent.bar_musician[0].innerHTML = arrdata.arr[x + 1].musicname;
    parent.header_avatar_img[0].src = arrdata.arr[x + 1].picurl;
    Ajax({
        url: bofangurl,
        success: function (resultss) {
            sessionStorage.setItem('arr_x', x);
            parent.broadcast_1[0].load();
            musicurl = resultss.data[0].url;
            bofang();
            shichangload();
            bofangurls(musicurl);

        }
    });
    // parent.inner.src = '../6.歌曲详情/6.歌曲详情.html';
    parent.collect_02_li[x].style.backgroundColor = '#6e6e6e';
    parent.collect_02_li[x].style.color = '#fff';

}

// 搜索
function search() {
    // 搜索功能
    // 此处应该改为跳转页面
    var searchBtn = document.getElementById("searchBtn");
    var searchBox = document.getElementById("searchBox");
    sessionStorage.setItem("search_key", '常言道');
    var searchurl;
    searchBtn.addEventListener("click", function () {
        sessionStorage.setItem('page', 0);
        if (searchBox.value == '') {
            searchurl = defaultUrlHeader + '/cloudsearch?keywords=' + '常言道' + '&limit=20&offset=0';
        } else {
            searchurl = defaultUrlHeader + '/cloudsearch?keywords=' + searchBox.value + '&limit=20&offset=0';
        }
        sessionStorage.setItem("search", searchurl);
        sessionStorage.setItem("search_key", searchBox.value);
        parent.inner.src = '../5.搜索歌曲页面/5.搜索歌曲页面.html';

    });
    // 监听enter是否被按下
    document.onkeydown = function () {
        var code = window.event.keyCode;
        if (code == 13) {
            sessionStorage.setItem('page', 0);
            if (searchBox.value == '') {
                searchurl = defaultUrlHeader + '/cloudsearch?keywords=' + '常言道' + '&limit=20&offset=0';
            } else {
                searchurl = defaultUrlHeader + '/cloudsearch?keywords=' + searchBox.value + '&limit=20&offset=0';
            }

            // Ajax({
            //     url: searchurl,
            //     success: function (results) {
            sessionStorage.setItem("search", searchurl);
            sessionStorage.setItem("search_key", searchBox.value);
            parent.inner.src = '../5.搜索歌曲页面/5.搜索歌曲页面.html';
            //     }
            // });
        }
    }
}

// 查询历史记录函数
function historylist(historyurl){
    Ajax({
        url: historyurl,
        success: function (results) {
            parent.collect_01[0].innerHTML='';
            for (let i = 0; i < results.weekData.length; i++) {
                let li = document.createElement("li");
                let span_1 = document.createElement("span");
                let span_2 = document.createElement("span");
                parent.collect_01[0].appendChild(li);
                li.appendChild(span_1);
                li.appendChild(span_2);
                li.className = 'collect_01_li';
                span_1.className = 'collect_01_num';
                span_2.className = 'collect_01_content';
                span_1.innerHTML = i + 1;
                span_2.innerHTML = results.weekData[i].song.name;
                parent.collect_01_li[i].addEventListener('click',function () {
                    sessionStorage.setItem('playing_id', results.weekData[i].song.id);
                    sessionStorage.setItem('ing', 'false');
                    parent.inner.src = '../6.歌曲详情/6.歌曲详情.html';
                }) 
            }


        }
    });
}