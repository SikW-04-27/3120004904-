window.onload = function () {
    let user_4 = JSON.parse(sessionStorage.getItem("user"));
    let musicid = sessionStorage.getItem("musicid");
    let type = sessionStorage.getItem("type");
    console.log(user_4.code);

    var avatar = document.getElementsByClassName("avatar");
    // 将用户头像导入
    avatar[0].src = user_4.profile.avatarUrl;
    avatar[1].src = user_4.profile.avatarUrl;


    bofang();
    shichangload();
    play();

    // 获取该专辑信息

    var musician_avatar = document.getElementsByClassName("musician_avatar");
    var info_name = document.getElementsByClassName("info_name");
    var musician_avatar_1 = document.getElementsByClassName("musician_avatar_1");
    var musician_name_1 = document.getElementsByClassName("musician_name_1");
    var musician_level_1 = document.getElementsByClassName("musician_level_1");
    var info_intr = document.getElementsByClassName("info_intr");
    var info_more_intr = document.getElementsByClassName("info_more_intr");
    var musician_time_1 = document.getElementsByClassName("musician_time_1");

    var more = document.getElementsByClassName("more");
    var info_intrroduce = document.getElementsByClassName("info_introduce");
    var info_more = document.getElementsByClassName("info_more");
    var my_comment_btn = document.getElementsByClassName("my_comment_btn");
    var textarea = document.getElementsByTagName("textarea");

    // 播放条
    var header_avatar_img = document.getElementsByClassName("header_avatar_img");
    var bar_musicname = document.getElementsByClassName("bar_musicname");
    var bar_musician = document.getElementsByClassName("bar_musician");

    // 播放歌曲
    var td_one_play = document.getElementsByClassName("td_one_play");
    // 查询歌曲详情
    var td_music_name = document.getElementsByClassName("td_music_name");
    // 查询歌手
    var td_musician = document.getElementsByClassName("td_musician");
    // 查询专辑
    var td_edition = document.getElementsByClassName("td_text td_edition");
    // 添加歌曲到待播清单
    var add = document.getElementsByClassName("add");
    // 添加歌曲到我的歌单
    var add_musiclist = document.getElementsByClassName("add_musiclist");
    // 我的歌单
    var plusMusic_div = document.getElementsByClassName("plusMusic_div");
    // 歌单列表
    var plusMusic_ul = document.getElementsByClassName("plusMusic_ul");
    var plusMusic_li = document.getElementsByClassName("plusMusic_li");
    // 添加歌曲框的取消确认按钮
    var cancel_plusMusic = document.getElementsByClassName("cancel_plusMusic");
    var confirm_plusMusic = document.getElementsByClassName("confirm_plusMusic");

    var collect_btn = document.getElementsByClassName("collect_btn");

    if (type == '歌单') {
        let cook = user_4.cookie;
        let timestamp = (new Date()).valueOf();
        let musicurl = defaultUrlHeader + '/playlist/detail?id=' + musicid + '&cookie=' + cook + '&timestamp=' + timestamp;
        console.log(musicurl);
        Ajax({
            url: musicurl,
            success: function (results) {
                let resultsjson = JSON.stringify(results);
                sessionStorage.setItem("musicinfo", resultsjson);
                var music_info = JSON.parse(sessionStorage.getItem("musicinfo"));


                musician_avatar[0].src = music_info.playlist.coverImgUrl + '?param=200y200';
                info_name[0].innerHTML = music_info.playlist.name;
                musician_avatar_1[0].src = music_info.playlist.creator.avatarUrl + '?param=40y40';
                musician_name_1[0].innerHTML = music_info.playlist.creator.nickname;
                // musician_level_1[0].src = music_info.playlist.creator.avatarDetail.identityIconUrl;
                // 让文本能够在每一个句号就换行
                let text;
                let texts;
                text = music_info.playlist.description;
                if (text) {
                    // 正则表达式判断文本中的所有句号
                    texts = text.replace(new RegExp('。', 'g'), '。<br><br>');
                    info_intr[0].innerHTML = '介绍：' + texts;
                    info_more_intr[0].innerHTML = '介绍：' + texts;
                    more[0].innerHTML = '展开';
                }



                // 展开和收起详情
                more[0].onclick = function () {
                    if (more[0].innerHTML == '展开') {
                        info_intrroduce[0].style.display = 'none';
                        info_more[0].style.display = 'block';
                        more[0].innerHTML = '收起';
                    } else {
                        info_intrroduce[0].style.display = 'block';
                        info_more[0].style.display = 'none';
                        more[0].innerHTML = '展开';
                    }

                }

                // 获取标签
                let b = document.getElementsByClassName("b");
                for (let j = 0; j < music_info.playlist.tags.length; j++) {
                    let info_tags = document.getElementsByClassName("info_tags");
                    let a = document.createElement("a");
                    let i = document.createElement("i");
                    info_tags[0].appendChild(a);
                    a.appendChild(i);
                    a.className = 'info_tag';
                    a.href = 'javascript:;';
                    if (j == 0) {
                        b[0].innerHTML = '标签';
                    }
                    i.innerHTML = music_info.playlist.tags[j];
                }

                // 获取歌曲
                var list_top_span1 = document.getElementsByClassName("list_top_span1");
                var span2_num = document.getElementsByClassName("span2_num");
                list_top_span1[0].innerHTML = music_info.playlist.trackCount + '首歌';
                span2_num[0].innerHTML = music_info.playlist.playCount;


                for (let j = 0; j < music_info.playlist.tracks.length; j++) {
                    let span1 = j + 1;
                    let span2 = music_info.playlist.tracks[j].name;
                    let temp = music_info.playlist.tracks[j].dt;
                    let span3 = dtime(temp);
                    let span4 = music_info.playlist.tracks[j].ar[0].name;
                    let span5 = music_info.playlist.tracks[j].al.name;
                    let span5_id = music_info.playlist.tracks[j].al.id;
                    if (music_info.playlist.creator.userId == user_4.account.id) {
                        getsongs(span1, span2, span3, span4, span5, span5_id, j, 1);
                    } else {
                        getsongs(span1, span2, span3, span4, span5, span5_id, j, 0);
                    }

                    td_one_play[j].onclick = function () {
                        let x = j;
                        // 定义一个自动播放的函数
                        function autoplay(x) {
                            sessionStorage.setItem("musicianid", music_info.playlist.tracks[j].ar[0].id);
                            sessionStorage.setItem("playing_id", music_info.playlist.tracks[j].id);
                            parent.broadcast[0].style.backgroundPosition = '0 -165px';
                            bofangurl = defaultUrlHeader + '/song/url?id=' + music_info.playlist.tracks[x].id;
                            parent.header_avatar_img[0].src = music_info.playlist.tracks[x].al.picUrl + '?param=34y34';
                            parent.bar_musicname[0].innerHTML = music_info.playlist.tracks[x].name;
                            parent.bar_musician[0].innerHTML = music_info.playlist.tracks[x].ar[0].name;
                            Ajax({
                                url: bofangurl,
                                success: function (resultss) {
                                    musicurl = resultss.data[0].url;
                                    bofang();
                                    shichangload();
                                    bofangurls(musicurl);
                                    // 歌曲播放结束下一首播放
                                    parent.broadcast_1[0].onended = function () {
                                        parent.broadcast_1[0].load();
                                        x++;
                                        if (music_info.playlist.tracks[x]) {
                                            autoplay(x);
                                        }
                                    }
                                }
                            });
                            play();
                        }
                        autoplay(x);
                        parent.next[0].onclick = function () {
                            x++;
                            if (x > music_info.playlist.tracks.length - 1) {
                                x = music_info.playlist.tracks.length - 1;
                            }
                            autoplay(x);
                        }
                        parent.prev[0].onclick = function () {
                            x--;
                            if (x < 0) {
                                x = 0;
                            }
                            autoplay(x);
                        }
                    }
                    td_music_name[j].onclick = function () {
                        sessionStorage.setItem('ing', 'false');
                        sessionStorage.setItem("playing_id", music_info.playlist.tracks[j].id);
                        parent.inner.src = '../6.歌曲详情/6.歌曲详情.html';
                    }
                    td_musician[j].onclick = function () {
                        sessionStorage.setItem("musicianid", music_info.playlist.tracks[j].ar[0].id);
                        parent.inner.src = '../8.歌手详情/8.歌手详情.html';
                    }
                    td_edition[j].onclick = function () {
                        sessionStorage.setItem('musicid', this.id);
                        sessionStorage.setItem('type', '专辑');
                        parent.inner.src = '../4.歌单详情页/4.歌单详情页.html';
                    }
                    add[j].onclick = function () {
                        let name = music_info.playlist.tracks[j].name;
                        let id = music_info.playlist.tracks[j].id;
                        let musicname = music_info.playlist.tracks[j].ar[0].name;
                        let picurl = music_info.playlist.tracks[j].al.picUrl;
                        // 添加歌曲到待播歌单
                        addmusic(name, id, musicname, picurl);
                        let arrdata = JSON.parse(sessionStorage.getItem('arr'));
                        playARR(arrdata);
                    }

                    if (music_info.playlist.creator.userId == user_4.account.id) {
                        add_musiclist[j].addEventListener('click', function () {
                            let musicid = sessionStorage.getItem('musicid');
                            let timestamp = (new Date()).valueOf();
                            let delurl = defaultUrlHeader + '/playlist/tracks?op=del&pid=' + musicid + '&tracks=' + music_info.playlist.tracks[j].id + '&cookie=' + user_4.cookie + '&timestamp=' + timestamp;
                            Ajax({
                                url: delurl,
                                success: function () {
                                    parent.inner.src = '../4.歌单详情页/4.歌单详情页.html';
                                }
                            })
                        })
                    } else {
                        add_musiclist[j].addEventListener('click', function () {
                            plusMusic_div[0].style.display = 'block';
                            sessionStorage.setItem('select_music', music_info.playlist.tracks[j].id);
                            let timestamp = (new Date()).valueOf();
                            let getmusicurl = defaultUrlHeader + '/user/playlist?uid=' + user_4.account.id + '&cookie=' + user_4.cookie + '&timestamp=' + timestamp;
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
                                        let addurl = defaultUrlHeader + '/playlist/tracks?op=add&pid=' + select_musiclist + '&tracks=' + select_music + '&cookie=' + user_4.cookie;
                                        Ajax({
                                            url: addurl,
                                            success: function () {
                                                // alert("添加成功");
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
            }
        });

        getcom();

        // 评论未优化
        let tuijianurl = defaultUrlHeader + '/related/playlist?id=' + musicid;
        Ajax({
            url: tuijianurl,
            success: function (results) {
                if (results.playlists.length >= 5) {
                    var jmost = 5;
                } else {
                    var jmost = result.playlist.length;
                }
                for (let j = 0; j < jmost; j++) {
                    let imgsrc = results.playlists[j].coverImgUrl + '?param=50y50';
                    let div21 = results.playlists[j].name;
                    let div21_id = results.playlists[j].id;
                    let spaninner = 'by ' + results.playlists[j].creator.nickname;
                    gettuijian(imgsrc, div21, spaninner, div21_id);
                }
                var tuijian_right_top = document.getElementsByClassName("tuijian_right_top");
                for (let j = 0; j < jmost; j++) {
                    tuijian_right_top[j].onclick = function () {
                        sessionStorage.setItem('musicid', this.id);
                        sessionStorage.setItem('type', '歌单');
                        parent.inner.src = '../4.歌单详情页/4.歌单详情页.html';
                    }
                }
            }

        });
        sendcomment(2);
        // 收藏
        // collect_btn[0].onclick = function () {
        //     let cook = user_4.cookie;
        //     let musicurl = defaultUrlHeader + '/playlist/subscribe?t=1&id=' + musicid + '&cookie=' + cook;
        //     Ajax({
        //         url: musicurl
        //     });
        // }
    } else if (type == '专辑') {
        let musicurl = defaultUrlHeader + '/album?id=' + musicid;
        Ajax({
            url: musicurl,
            success: function (results) {
                let resultsjson = JSON.stringify(results);
                sessionStorage.setItem("musicinfo", resultsjson);
                var music_info = JSON.parse(sessionStorage.getItem("musicinfo"));
                musician_avatar[0].src = music_info.songs[0].al.picUrl + '?param=200y200';
                info_name[0].innerHTML = music_info.songs[0].al.name;
                musician_avatar_1[0].src = music_info.songs[0].al.picUrl + '?param=35y35';
                musician_name_1[0].innerHTML = music_info.songs[0].ar[0].name;
                musician_time_1[0].innerHTML = '发行公司：' + music_info.album.company;

                let text;
                let texts;
                text = music_info.album.description;
                if (text) {
                    texts = text.replace(new RegExp('\n', 'g'), '<br>');
                    info_intr[0].innerHTML = '介绍：' + texts;
                    info_more_intr[0].innerHTML = '介绍：' + texts;
                    more[0].innerHTML = '展开';
                }



                more[0].onclick = function () {
                    if (more[0].innerHTML == '展开') {
                        info_intrroduce[0].style.display = 'none';
                        info_more[0].style.display = 'block';
                        more[0].innerHTML = '收起';
                    } else {
                        info_intrroduce[0].style.display = 'block';
                        info_more[0].style.display = 'none';
                        more[0].innerHTML = '展开';
                    }

                }

                // 获取专辑的歌曲
                for (let j = 0; j < music_info.songs.length; j++) {
                    let span1 = j + 1;
                    let span2 = music_info.songs[j].name;
                    let temp = music_info.songs[j].dt;
                    let span3 = dtime(temp);
                    let span4 = music_info.songs[j].ar[0].name;
                    let span5 = music_info.songs[j].al.name;
                    let span5_id = music_info.songs[j].al.id;

                    getsongs(span1, span2, span3, span4, span5, span5_id, j, 0);

                    td_one_play[j].onclick = function () {
                        let x = j;
                        // 定义一个自动播放的函数
                        function autoplay(x) {
                            parent.broadcast[0].style.backgroundPosition = '0 -165px';
                            bofangurl = defaultUrlHeader + '/song/url?id=' + music_info.songs[x].id;
                            parent.header_avatar_img[0].src = music_info.songs[x].al.picUrl;
                            parent.bar_musicname[0].innerHTML = music_info.songs[x].name;
                            parent.bar_musician[0].innerHTML = music_info.songs[x].ar[0].name;
                            Ajax({
                                url: bofangurl,
                                success: function (resultss) {
                                    musicurl = resultss.data[0].url;
                                    bofang();
                                    shichangload();
                                    bofangurls(musicurl);
                                    // 歌曲播放结束下一首播放
                                    parent.broadcast_1[0].onended = function () {
                                        parent.broadcast_1[0].load();
                                        x++;
                                        if (music_info.songs[x]) {
                                            autoplay(x);
                                        }
                                    }
                                }
                            });
                            play();
                        }
                        autoplay(x);
                        parent.next[0].onclick = function () {
                            x++;
                            if (x > music_info.songs.length - 1) {
                                x = music_info.songs.length - 1;
                            }
                            autoplay(x);
                        }
                        parent.prev[0].onclick = function () {
                            x--;
                            if (x < 0) {
                                x = 0;
                            }
                            autoplay(x);
                        }
                    }
                    td_music_name[j].onclick = function () {
                        sessionStorage.setItem('ing', 'false');
                        sessionStorage.setItem("playing_id", music_info.songs[j].id);
                        parent.inner.src = '../6.歌曲详情/6.歌曲详情.html';
                    }
                    td_musician[j].onclick = function () {
                        sessionStorage.setItem("musicianid", music_info.songs[j].ar[0].id);
                        parent.inner.src = '../8.歌手详情/8.歌手详情.html';
                    }
                    td_edition[j].onclick = function () {
                        sessionStorage.setItem('musicid', this.id);
                        sessionStorage.setItem('type', '专辑');
                        parent.inner.src = '../4.歌单详情页/4.歌单详情页.html';
                    }
                    add[j].onclick = function () {
                        let name = music_info.songs[j].name;
                        let id = music_info.songs[j].id;
                        let musicname = music_info.songs[j].ar[0].name;
                        let picurl = music_info.songs[j].al.picUrl;
                        // 添加歌曲到待播歌单
                        addmusic(name, id, musicname, picurl);
                        let arrdata = JSON.parse(sessionStorage.getItem('arr'));
                        playARR(arrdata);
                    }
                    add_musiclist[j].addEventListener('click', function () {
                        plusMusic_div[0].style.display = 'block';
                        sessionStorage.setItem('select_music', music_info.songs[j].id);
                        let timestamp = (new Date()).valueOf();
                        let getmusicurl = defaultUrlHeader + '/user/playlist?uid=' + user_4.account.id + '&cookie=' + user_4.cookie + '&timestamp=' + timestamp;
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
                                    let addurl = defaultUrlHeader + '/playlist/tracks?op=add&pid=' + select_musiclist + '&tracks=' + select_music + '&cookie=' + user_4.cookie;
                                    Ajax({
                                        url: addurl,
                                        success: function () {
                                            // alert("添加成功");
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
        });
        getcom_2();

        Ajax({
            url: 'https://autumnfish.cn/album/newest',
            success: function (results) {
                for (let j = 0; j < 5; j++) {
                    let imgsrc = results.albums[j].blurPicUrl + '?param=50y50';
                    let div21 = results.albums[j].name;
                    let div21_id = results.albums[j].id;
                    let spaninner = 'by ' + results.albums[j].artist.name;
                    gettuijian(imgsrc, div21, spaninner, div21_id);
                }
                var tuijian_right_top = document.getElementsByClassName("tuijian_right_top");
                for (let j = 0; j < 5; j++) {
                    tuijian_right_top[j].onclick = function () {
                        sessionStorage.setItem('musicid', this.id);
                        sessionStorage.setItem('type', '专辑');
                        parent.inner.src = '../4.歌单详情页/4.歌单详情页.html';
                    }
                }
            }
        });
        sendcomment(3);
    }

    // 可以操作待播歌单
    let arrdata = JSON.parse(sessionStorage.getItem('arr'));
    playARR(arrdata);

    // 搜索功能
    search();

    // 点击导航栏跳转页面
    one();
    two();
    five();
    seven();

    // 获取歌曲创造节点
    function getsongs(span1, span2, span3, span4, span5, span5_id, j, icon) {
        let tbody = document.getElementsByTagName("tbody");
        let tr = document.createElement("tr");
        let td_1 = document.createElement("td");
        let td_2 = document.createElement("td");
        let td_3 = document.createElement("td");
        let td_4 = document.createElement("td");
        let td_5 = document.createElement("td");
        let div = document.createElement("div");
        let span_1_1 = document.createElement("span");
        let span_1_2 = document.createElement("span");
        let span_2 = document.createElement("span");
        let span_2_2 = document.createElement("span");
        let span_2_3 = document.createElement("span");
        let span_3 = document.createElement("span");
        let span_4 = document.createElement("span");
        let span_5 = document.createElement("span");
        tbody[0].appendChild(tr);
        tr.appendChild(td_1);
        td_1.appendChild(div);
        div.appendChild(span_1_1);
        div.appendChild(span_1_2);
        tr.appendChild(td_2);
        td_2.appendChild(span_2);
        td_2.appendChild(span_2_2);
        td_2.appendChild(span_2_3);
        tr.appendChild(td_3);
        td_3.appendChild(span_3);
        tr.appendChild(td_4);
        td_4.appendChild(span_4);
        tr.appendChild(td_5);
        td_5.appendChild(span_5);
        td_1.className = 'td_one';
        div.className = 'td_one_content';
        span_1_1.className = 'td_one_num';
        span_1_2.className = 'td_one_play';
        td_2.className = 'td_two';
        span_2.className = 'td_text td_music_name';
        span_2_2.className = 'add fas fa-plus';
        if (icon == 0) {
            span_2_3.className = 'add_musiclist fas fa-star';
        } else {
            span_2_3.className = 'add_musiclist fas fa-trash';
        }

        td_3.className = 'td_three';
        span_3.className = 'td_text td_time';
        td_4.className = 'td_four';
        span_4.className = 'td_text td_musician';
        td_5.className = 'td_five';
        span_5.className = 'td_text td_edition';
        span_1_1.innerHTML = span1;
        span_2.innerHTML = span2;
        span_3.innerHTML = span3;
        span_4.innerHTML = span4;
        span_5.innerHTML = span5;
        span_5.id = span5_id;
        if (j % 2 == 0) {
            tr.className = 'even'
        } else {
            tr.style.backgroundColor = '#fff';
        }
    }

    // 获取评论创造节点
    function getcomments(imgsrc, span1, span2, span3, times) {
        let comments = document.getElementsByClassName("comments");
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
        span_3.className = 'good_num';

        img.src = imgsrc;
        span_1.innerHTML = span1;
        span_2.innerHTML = span2;
        time = times;
        time = formatDateT(time);
        time = time.split('T');
        div_2_2_1.innerHTML = time[0];
        span_3.innerHTML = span3;
    }

    // 获取相关推荐创造节点
    function gettuijian(imgsrc, div21, spaninner, div21_id) {
        let middle_right_ul = document.getElementsByClassName("middle_right_ul");
        let li = document.createElement("li");
        let div_1 = document.createElement("div");
        let img = document.createElement("img");
        let div_2 = document.createElement("div");
        let div_2_1 = document.createElement("div");
        let span = document.createElement("span");
        middle_right_ul[0].appendChild(li);
        li.appendChild(div_1);
        div_1.appendChild(img);
        li.appendChild(div_2);
        div_2.appendChild(div_2_1);
        div_2.appendChild(span);
        li.className = 'middle_right_li';
        div_1.className = 'tuijian_li_left';
        img.className = 'tuijian_img';
        div_2.className = 'tuijian_li_right';
        div_2_1.className = 'tuijian_right_top';
        span.className = 'tuijian_right_bottom';

        img.src = imgsrc;
        div_2_1.innerHTML = div21;
        div_2_1.id = div21_id;
        span.innerHTML = spaninner;
    }

    //发送评论
    function sendcomment(type) {
        my_comment_btn[0].onclick = function () {
            let comments = document.getElementsByClassName("comments");
            let text = textarea[0].value;
            let cook = user_4.cookie;
            let timestamp = (new Date()).valueOf();
            let sendcommenturl = defaultUrlHeader + '/comment?t=1&type=' + type + '&id=' + musicid + '&content=' + text + '&cookie=' + cook + '&timestamp=' + timestamp;
            Ajax({
                url: sendcommenturl,
                success: function () {
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
                    img.src = '../img/loading.gif';
                    setTimeout(function () {
                        if (type == 1) {
                            getcom();
                        } else {
                            getcom_2();
                        }
                    }, 2000);

                }
            });
        }
    }

    // 获取评论
    function getcom() {
        let comments = document.getElementsByClassName("comments");
        comments[0].innerHTML = '';
        let timestamp = (new Date()).valueOf();
        let cook = user_4.cookie;
        let commenturl = defaultUrlHeader + '/comment/playlist?id=' + musicid + '&timestamp=' + timestamp + '&cookie=' + cook;
        Ajax({
            url: commenturl,
            success: function (results) {
                for (let j = 0; j < results.comments.length; j++) {

                    let imgsrc = results.comments[j].user.avatarUrl + '?param=50y50';
                    let span1 = results.comments[j].user.nickname + '：';
                    let span2 = results.comments[j].content;
                    let time = results.comments[j].time;
                    let span3 = results.comments[j].likedCount;
                    getcomments(imgsrc, span1, span2, span3, time);
                }
                var comment_list_top = document.getElementsByClassName("comment_list_top");
                var comment_num = document.getElementsByClassName("comment_num");
                comment_num[0].innerHTML = results.comments.length + "条评论";
                comment_list_top[0].innerHTML = "最新评论（" + results.comments.length + "）";
            }
        });
    }

    function getcom_2() {
        let comments = document.getElementsByClassName("comments");
        comments[0].innerHTML = '';
        let timestamp = (new Date()).valueOf();
        let cook = user_4.cookie;
        let commenturl = defaultUrlHeader + '/comment/album?id=' + musicid + '&timestamp=' + timestamp + '&cookie=' + cook;
        Ajax({
            url: commenturl,
            success: function (results) {
                var comment_list_top = document.getElementsByClassName("comment_list_top");
                var comment_num = document.getElementsByClassName("comment_num");
                comment_num[0].innerHTML = results.comments.length + "条评论";
                comment_list_top[0].innerHTML = "精彩评论（" + results.hotComments.length + "）";
                for (let j = 0; j < results.hotComments.length; j++) {

                    let imgsrc = results.hotComments[j].user.avatarUrl + '?param=50y50';
                    let span1 = results.hotComments[j].user.nickname + '：';
                    let span2 = results.hotComments[j].content;
                    let time = results.hotComments[j].time;
                    let span3 = results.hotComments[j].likedCount;
                    getcomments(imgsrc, span1, span2, span3, time);
                }
                for (let j = 0; j < results.comments.length; j++) {
                    console.log(results.comments.length);
                    let imgsrc = results.comments[j].user.avatarUrl + '?param=50y50';
                    let span1 = results.comments[j].user.nickname + '：';
                    let span2 = results.comments[j].content;
                    let time = results.comments[j].time;
                    let span3 = results.comments[j].likedCount;
                    getcomments(imgsrc, span1, span2, span3, time);
                }
            }
        });
    }
}

