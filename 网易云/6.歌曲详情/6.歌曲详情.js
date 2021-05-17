window.onload = function () {
    let user_6 = JSON.parse(sessionStorage.getItem("user"));
    var avatar = document.getElementsByClassName("avatar");
    avatar[1].src = user_6.profile.avatarUrl;
    var lyric = document.getElementsByClassName("lyric");
    let playingid = sessionStorage.getItem('playing_id');
    var roll_img = document.getElementsByClassName("roll_img");
    var title_name = document.getElementsByClassName("title_name");
    var comments = document.getElementsByClassName("comments");
    var my_comment_btn = document.getElementsByClassName("my_comment_btn");
    var textarea = document.getElementsByTagName("textarea");
    // 歌曲是否正在播放的参数
    let ing = sessionStorage.getItem('ing');
    // 获取歌曲信息，将歌曲信息填入
    bofangurl = defaultUrlHeader + '/song/detail?ids=' + playingid;
    Ajax({
        url: bofangurl,
        success: function (resultss) {
            parent.header_avatar_img[0].src = resultss.songs[0].al.picUrl;
            parent.bar_musicname[0].innerHTML = resultss.songs[0].name;
            parent.bar_musician[0].innerHTML = resultss.songs[0].ar[0].name;
            title_name[0].innerHTML = resultss.songs[0].name;
            roll_img[0].src = resultss.songs[0].al.picUrl;
            sessionStorage.setItem("musicianid", resultss.songs[0].ar[0].id);
        }
    });
    // 监测是否正在播放，不是的话则重新加载
    if (ing != 'true') {
        bofangurl_1 = defaultUrlHeader + '/song/url?id=' + playingid;
        Ajax({
            url: bofangurl_1,
            success: function (resultss) {
                parent.broadcast[0].style.backgroundPosition = '0 -165px';
                musicurl = resultss.data[0].url;
                bofangurls(musicurl);
            }
        });
    }

    // 可以操作播放条（同时可以起到正在播放歌曲时跳转到本页面时可以继续播放）
    play();
    bofang();
    shichangload();

    // 可以操作待播歌单
    let arrdata = JSON.parse(sessionStorage.getItem('arr'));
    playARR(arrdata);

    // 可以操作播放历史
    let historyurl = defaultUrlHeader + '/user/record?uid=' + user_6.account.id + '&type=1&cookie=' + user_6.cookie;
    historylist(historyurl);

    // 点击导航栏跳转页面
    one();
    two();
    five();
    seven();

    // 搜索功能
    search();

    // 获取歌词
    playidurl = defaultUrlHeader + '/lyric?id=' + playingid;
    Ajax({
        url: playidurl,
        success: function (results) {
            let lyrictext = results.lrc.lyric;
            let parts = lyrictext.split("\n");
            console.log(parts);
            for (let i = 0; i < parts.length - 1; i++) {
                parts[i] = handle_lyric(parts[i]);
            }

            // 根据歌词创建li
            for (let i = 0; i < parts.length - 1; i++) {
                var li = document.createElement('li');
                li.innerHTML = parts[i].words;
                lyric[0].appendChild(li);
                li.className = 'normal';
            }
            var li = document.getElementsByTagName("li");
            // 监听播放条改变
            parent.broadcast_1[0].addEventListener("timeupdate", function () {
                for (let j = 0; j < parts.length - 1; j++) {
                    if (parseInt(parent.broadcast_1[0].currentTime) >= parseInt(parts[j].seconds) && parseInt(parent.broadcast_1[0].currentTime) < parseInt(parts[j + 1].seconds)) {
                        lyric[0].style.marginTop = -50 * (j - 2) + "px";
                        for (let j = 0; j < parts.length - 1; j++) {
                            li[j].className = 'normal';
                        }
                        li[j].className = 'big';
                        break;
                    }
                }
            });
            // 点击播放条跳转定位歌词
            parent.shichang[0].addEventListener("input", function () {
                console.log(parseInt(parts.length - 1));
                if (parseInt(parent.broadcast_1[0].currentTime) >= parseInt(parts[parts.length - 2].seconds)) {
                    lyric[0].style.marginTop = -50 * (parts.length - 1 - 3) + "px";
                    for (let j = 0; j < parts.length - 1; j++) {
                        li[j].className = 'normal';
                    }
                    li[parts.length - 2].className = 'big';
                } else {
                    for (let j = 1; ; j++) {
                        if (parseInt(parent.broadcast_1[0].currentTime) <= parseInt(parts[j + 1].seconds)) {
                            lyric[0].style.marginTop = -50 * (j - 3) + "px";
                            for (let j = 0; j < parts.length - 1; j++) {
                                li[j].className = 'normal';
                            }
                            li[j].className = 'big';
                            break;
                        }
                    }
                }

            })

            // 处理每一句歌词
            function handle_lyric(content) {
                // 获取每一句的秒数
                var twoParts = content.split("]");
                //将时间前的"["截掉
                var time = twoParts[0].substr(1);
                var timeParts = time.split(":");
                var seconds = +timeParts[1];
                var min = +timeParts[0];
                seconds = min * 60 + seconds;
                //歌词获取
                var words = twoParts[1];
                if (words == "") {
                    words = "<br>";
                }
                return {//返回秒和歌词
                    seconds: seconds,
                    words: words,
                };
            }
        }
    });

    // 获取评论
    getcom();
    function getcom() {
        comments[0].innerHTML = '';
        let timestamp = (new Date()).valueOf();
        let commenturl = defaultUrlHeader + '/comment/music?id=' + playingid + '&timestamp=' + timestamp;
        Ajax({
            url: commenturl,
            success: function (results) {
                // 创造评论节点，填入信息
                for (let j = 0; j < results.comments.length; j++) {
                    let imgsrc = results.comments[j].user.avatarUrl;
                    let span1 = results.comments[j].user.nickname + '：';
                    let span2 = results.comments[j].content;
                    let time = results.comments[j].time;
                    let span3 = results.comments[j].likedCount;
                    let commentid = results.comments[j].commentId;
                    getcomments(imgsrc, span1, span2, span3, time,commentid);
                }
                var comment_list_top = document.getElementsByClassName("comment_list_top");
                comment_list_top[0].innerHTML = "最新评论（" + results.total + "）";
                // 储存页码
                sessionStorage.setItem('last_page', parseInt(results.total / 20));
                let lastpage = Number(sessionStorage.getItem('last_page')) + 1;
                sessionStorage.setItem('music_page', 0);
                page_count.innerHTML = '共' + lastpage + '页';
                now_page.innerHTML = '第' + 1 + '页';
            }
        });
    }

    // 发送评论
    my_comment_btn[0].onclick = function () {
        let text = textarea[0].value;
        let cook = user_6.cookie;
        let timestamp = (new Date()).valueOf();
        let sendcommenturl = defaultUrlHeader + '/comment?t=1&type=0' + '&id=' + playingid + '&content=' + text + '&cookie=' + cook + '&timestamp=' + timestamp;
        Ajax({
            url: sendcommenturl,
            success: function () {
                // 将之前的评论删除
                comments[0].innerHTML = '';
                let div = document.createElement('div');
                let img = document.createElement('img');
                comments[0].appendChild(div);
                div.style.margin = '10px auto';
                div.style.width = 100 + 'px';
                div.style.height = 100 + 'px';
                img.style.width = 100 + 'px';
                img.style.height = 100 + 'px';
                div.appendChild(img);
                // 导入一张临时的正在加载图
                img.src = '../img/loading.gif';
                // 1s之后刷新评论区
                setTimeout(function () {
                    getcom();
                }, 1000);
            }
        });
    }

    // 页码操作
    var page_first = document.getElementById("page_first");
    var page_prev = document.getElementById("page_prev");
    var page_next = document.getElementById("page_next");
    var page_last = document.getElementById("page_last");
    var now_page = document.getElementById("now_page");
    var page_count = document.getElementById("page_count");
    page_first.onclick = function () {
        sessionStorage.setItem('music_page', 0);
        let music_page = Number(sessionStorage.getItem('music_page')) + 1;
        now_page.innerHTML = '第' + music_page + '页';
        let commenturl = defaultUrlHeader + '/comment/music?id=' + playingid + '&limit=20&offset=' + 0;;
        comments[0].innerHTML = '';
        Ajax({
            url: commenturl,
            success: function (results) {
                for (let j = 0; j < results.comments.length; j++) {
                    let imgsrc = results.comments[j].user.avatarUrl;
                    let span1 = results.comments[j].user.nickname + '：';
                    let span2 = results.comments[j].content;
                    let time = results.comments[j].time;
                    let span3 = results.comments[j].likedCount;
                    getcomments(imgsrc, span1, span2, span3, time);
                }
                var comment_list_top = document.getElementsByClassName("comment_list_top");
                var comment_num = document.getElementsByClassName("comment_num");
                comment_num[0].innerHTML = results.comments.length + "条评论";
            }
        });
    }
    page_last.onclick = function () {
        let lastpage = sessionStorage.getItem('last_page');
        sessionStorage.setItem('music_page', lastpage);
        let music_page = Number(sessionStorage.getItem('music_page')) + 1;
        now_page.innerHTML = '第' + music_page + '页';
        let commenturl = defaultUrlHeader + '/comment/music?id=' + playingid + '&limit=20&offset=' + lastpage * 20;;
        comments[0].innerHTML = '';
        Ajax({
            url: commenturl,
            success: function (results) {
                for (let j = 0; j < results.comments.length; j++) {
                    let imgsrc = results.comments[j].user.avatarUrl;
                    let span1 = results.comments[j].user.nickname + '：';
                    let span2 = results.comments[j].content;
                    let time = results.comments[j].time;
                    let span3 = results.comments[j].likedCount;
                    getcomments(imgsrc, span1, span2, span3, time);
                }
                var comment_list_top = document.getElementsByClassName("comment_list_top");
                var comment_num = document.getElementsByClassName("comment_num");
                comment_num[0].innerHTML = results.comments.length + "条评论";
            }
        });
    }
    page_prev.onclick = function () {
        let music_page = Number(sessionStorage.getItem('music_page')) - 1;
        if (music_page < 0) {
            music_page = 0
        }
        sessionStorage.setItem('music_page', music_page);
        now_page.innerHTML = '第' + (music_page + 1) + '页';
        let commenturl = defaultUrlHeader + '/comment/music?id=' + playingid + '&limit=20&offset=' + music_page * 20;;
        comments[0].innerHTML = '';
        Ajax({
            url: commenturl,
            success: function (results) {
                for (let j = 0; j < results.comments.length; j++) {
                    let imgsrc = results.comments[j].user.avatarUrl;
                    let span1 = results.comments[j].user.nickname + '：';
                    let span2 = results.comments[j].content;
                    let time = results.comments[j].time;
                    let span3 = results.comments[j].likedCount;
                    getcomments(imgsrc, span1, span2, span3, time);
                }
                var comment_list_top = document.getElementsByClassName("comment_list_top");
                var comment_num = document.getElementsByClassName("comment_num");
                comment_num[0].innerHTML = results.comments.length + "条评论";
            }
        });
    }
    page_next.onclick = function () {
        let music_page = Number(sessionStorage.getItem('music_page')) + 1;
        let lastpage = Number(sessionStorage.getItem('last_page'));
        console.log(typeof (lastpage));
        if (music_page > lastpage) {
            music_page = lastpage;
        }
        sessionStorage.setItem('music_page', music_page);
        now_page.innerHTML = '第' + (music_page + 1) + '页';
        let commenturl = defaultUrlHeader + '/comment/music?id=' + playingid + '&limit=20&offset=' + music_page * 20;;
        comments[0].innerHTML = '';
        Ajax({
            url: commenturl,
            success: function (results) {
                for (let j = 0; j < results.comments.length; j++) {
                    let imgsrc = results.comments[j].user.avatarUrl;
                    let span1 = results.comments[j].user.nickname + '：';
                    let span2 = results.comments[j].content;
                    let time = results.comments[j].time;
                    let span3 = results.comments[j].likedCount;
                    getcomments(imgsrc, span1, span2, span3, time);
                }
                var comment_list_top = document.getElementsByClassName("comment_list_top");
                var comment_num = document.getElementsByClassName("comment_num");
                comment_num[0].innerHTML = results.comments.length + "条评论";
            }
        });
    }

    // 获取评论节点函数
    function getcomments(imgsrc, span1, span2, span3, times,commentid) {
        // let comments = document.getElementsByClassName("comments");
        let li = document.createElement("li");
        let div_1 = document.createElement("div");
        let img = document.createElement("img");
        let div_2 = document.createElement("div");
        let div_2_1 = document.createElement("div");
        let span_1 = document.createElement("span");
        let span_2 = document.createElement("span");
        let div_2_2 = document.createElement("div");
        let div_2_2_1 = document.createElement("div");
        let div_2_2_2 = document.createElement("div");
        let span_3 = document.createElement("span");
        comments[0].appendChild(li);
        li.appendChild(div_1);
        div_1.appendChild(img);
        li.appendChild(div_2);
        div_2.appendChild(div_2_1);
        div_2_1.appendChild(span_1);
        div_2_1.appendChild(span_2);
        div_2.appendChild(div_2_2);
        div_2_2.appendChild(div_2_2_1);
        div_2_2.appendChild(div_2_2_2);
        div_2_2_2.appendChild(span_3);
        li.className = 'comment_content';
        div_1.className = 'comment_content_left';
        img.className = 'user_avatar';
        div_2.className = 'comment_content_right';
        div_2_1.className = 'content_top';
        span_1.className = 'user_name';
        span_2.className = 'user_comment';
        div_2_2.className = 'more_user_info';
        div_2_2_1.className = 'comment_time';
        div_2_2_2.className = 'good';
        div_2_2_2.style.backgroundPosition = '-150px 0px';
        span_3.className = 'good_num';

        img.src = imgsrc;
        span_1.innerHTML = span1;
        span_2.innerHTML = span2;
        time = times;
        time = formatDateT(time);
        time = time.split('T');
        div_2_2_1.innerHTML = time[0];
        span_3.innerHTML = span3;

        // 歌曲点赞/取消点赞
        div_2_2_2.addEventListener('click',function(){
            if(div_2_2_2.style.backgroundPosition=='-150px 0px'){
                let getgoodurl=defaultUrlHeader+'/comment/like?id='+playingid+'&cid='+commentid+'&t=1&type=0&'+'cookie='+user_6.cookie;
                Ajax({
                    url:getgoodurl,
                    success:function(){
                        div_2_2_2.style.backgroundPosition='-170px 0';
                        span_3.innerHTML=span3+1;
                    }
                })
            }else{
                let getgoodurl=defaultUrlHeader+'/comment/like?id='+playingid+'&cid='+commentid+'&t=0&type=0&'+'cookie='+user_6.cookie;
                Ajax({
                    url:getgoodurl,
                    success:function(){
                        div_2_2_2.style.backgroundPosition='-150px 0';
                        span_3.innerHTML= span3;
                    }
                })
            }
        })
    }
}