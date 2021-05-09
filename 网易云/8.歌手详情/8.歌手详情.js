window.onload = function () {
    var musician_id = sessionStorage.getItem('musicianid');
    var musician_h2 = document.getElementsByClassName("musician_h2");
    var musician_h3 = document.getElementsByClassName("musician_h3");
    var avatar_img = document.getElementsByClassName("avatar_img");
    var avatar_audio = document.getElementsByClassName("avatar_audio");
    var avatar_big = document.getElementsByClassName("avatar_big");
    var td_one_play = document.getElementsByClassName("td_one_play");
    var bar_musicname = document.getElementsByClassName("bar_musicname");
    var header_avatar_img = document.getElementsByClassName("header_avatar_img");
    var bar_musician = document.getElementsByClassName("bar_musician");
    var musician_work_list = document.getElementsByClassName("musician_work_list");
    var musician_edition_list = document.getElementsByClassName("musician_edition_list");
    var musician_intro_list = document.getElementsByClassName("musician_intro_list");
    var musician_mv_list = document.getElementsByClassName("musician_edition_list");
    var td_music_name = document.getElementsByClassName("td_music_name");
    var td_edition = document.getElementsByClassName("td_edition");
    var edition_img = document.getElementsByClassName("edition_img");
    var edition_name = document.getElementsByClassName("edition_name");
    var edition_time = document.getElementsByClassName("edition_time");
    var edition_a = document.getElementsByClassName("edition_a");
    var mv_a = document.getElementsByClassName("mv_a");
    var pages = document.getElementsByClassName("pages");
    var now_page = document.getElementById("now_page");
    var page_count = document.getElementById("page_count");
    var intro_title = document.getElementsByClassName("intro_title");


    var musician_li = document.getElementsByClassName("musician_li");
    for (let j = 0; j < musician_li.length; j++) {
        musician_li[j].onmouseover = function () {
            if (musician_li[j].className != 'musician_li musician_nav_active') {
                for (let k = 0; k < musician_li.length; k++) {
                    if (musician_li[k].className != 'musician_li musician_nav_active') {
                        musician_li[k].className = 'musician_li';
                    }
                }
                musician_li[j].className = 'musician_li musician_nav_hover';
            }
        };
        musician_li[j].onmouseout = function () {
            for (let k = 0; k < musician_li.length; k++) {
                if (musician_li[k].className != 'musician_li musician_nav_active') {
                    musician_li[k].className = 'musician_li';
                }
            }
        };
        musician_li[j].onclick = function () {
            for (let k = 0; k < musician_li.length; k++) {
                musician_li[k].className = 'musician_li';
            }
            musician_li[j].className = 'musician_li musician_nav_active';

            if (j == 0) {
                avatar_audio[0].style.display = 'none';
                avatar_audio[0].src = '';
                avatar_big[0].style.display = 'block';
                musician_edition_list[0].style.display = 'none';
                musician_mv_list[0].style.display = 'none';
                musician_intro_list[0].style.display = 'none';
                musician_work_list[0].style.display = '';
                pages[0].style.display = 'none';
            } else if (j == 1) {
                sessionStorage.setItem('pagestype', 'edition');
                avatar_audio[0].style.display = 'none';
                avatar_audio[0].src = '';
                avatar_big[0].style.display = 'block';
                musician_work_list[0].style.display = 'none';
                musician_mv_list[0].style.display = 'none';
                musician_intro_list[0].style.display = 'none';
                pages[0].style.display = 'flex';
                musician_edition_list[0].style.display = 'flex';
                sessionStorage.setItem('edition_page', 0);
                load_edition();
                now_page.innerHTML = '第' + 1 + '页';
            } else if (j == 2) {
                musician_mv_list[0].style.display = 'flex';
                avatar_audio[0].style.display = 'none';
                avatar_audio[0].src = '';
                avatar_big[0].style.display = 'block';
                musician_work_list[0].style.display = 'none';
                musician_edition_list[0].style.display = 'none';
                musician_intro_list[0].style.display = 'none';
                pages[0].style.display = 'flex';
                musician_mv_list[0].style.display = 'flex';
                sessionStorage.setItem('pagestype', 'mv');
                sessionStorage.setItem('mv_page', 0);
                load_mv();
                now_page.innerHTML = '第' + 1 + '页';
            } else if (j == 3) {
                musician_intro_list[0].innerHTML = '';
                avatar_audio[0].style.display = 'none';
                avatar_audio[0].src = '';
                musician_work_list[0].style.display = 'none';
                musician_edition_list[0].style.display = 'none';
                musician_mv_list[0].style.display = 'none';
                pages[0].style.display = 'none';
                musician_intro_list[0].style.display = 'block';
                load_intro();
            }
        }
    }
    let url_1 = 'https://autumnfish.cn/artists?id=' + musician_id;
    Ajax({
        url: url_1,
        success: function (results) {
            sessionStorage.setItem('last_mv_size', results.artist.mvSize);
            musician_h2[0].innerHTML = results.artist.name;
            musician_h3[0].innerHTML = results.artist.alias[0];
            avatar_img[0].src = results.artist.img1v1Url + '?param=640y300"';
            for (let j = 0; j < 50; j++) {
                let span1 = j + 1;
                let span2 = results.hotSongs[j].name;
                let temp = results.hotSongs[j].dt;
                let span3 = dtime(temp);
                let span5 = results.hotSongs[j].al.name;
                let span5_id = results.hotSongs[j].al.id;
                getsongs(span1, span2, span3, span5, span5_id);
                td_one_play[j].onclick = function () {
                    let x = j;
                    // 定义一个自动播放的函数
                    function autoplay(x) {
                        broadcast[0].style.backgroundPosition = '0 -165px';
                        bofangurl = defaultUrlHeader + '/song/url?id=' + results.hotSongs[x].id;
                        // 将正在播放的歌曲的id存入缓存
                        sessionStorage.setItem("playing_id", results.hotSongs[x].id);
                        bar_musicname[0].onclick = function () {
                            bar_musicname[0].href = '../6.歌曲详情/6.歌曲详情.html';
                        }
                        header_avatar_img[0].src = results.hotSongs[x].al.picUrl;
                        bar_musicname[0].innerHTML = results.hotSongs[x].name;
                        bar_musician[0].innerHTML = results.hotSongs[x].ar[0].name;
                        Ajax({
                            url: bofangurl,
                            success: function (resultss) {
                                musicurl = resultss.data[0].url;
                                bofang();
                                bofangurls(musicurl);
                                // 歌曲播放结束下一首播放
                                broadcast_1.onended = function () {
                                    x++;
                                    if (results.hotSongs[x]) {
                                        autoplay(x);
                                    }
                                }

                            }
                        });
                        play();
                    }
                    autoplay(x);
                    var next = document.getElementsByClassName("next");
                    next[0].onclick = function () {
                        x++;
                        if (x > 49) {
                            x = 49;
                        }
                        autoplay(x);
                    }
                    var prev = document.getElementsByClassName("prev");
                    prev[0].onclick = function () {
                        x--;
                        if (x < 0) {
                            x = 0;
                        }
                        autoplay(x);
                    }


                }

                td_music_name[j].onclick = function () {
                    sessionStorage.setItem("playing_id", results.hotSongs[j].id);
                    window.location.href = '../6.歌曲详情/6.歌曲详情.html'
                }
                td_edition[j].onclick = function () {
                    sessionStorage.setItem('type', '专辑');
                    sessionStorage.setItem("musicid", results.hotSongs[j].al.id);
                    window.location.href = '../4.歌单详情页/4.歌单详情页.html'
                }
            }
        }
    });
    let url_3 = 'https://autumnfish.cn/simi/artist?id=' + musician_id;
    Ajax({
        url: url_3,
        success: function (results) {
            for (let j = 0; j < 6; j++) {
                let similar = document.getElementsByClassName("similar");
                let li = document.createElement("li");
                let img = document.createElement("img");
                let p = document.createElement("p");
                similar[0].appendChild(li);
                li.appendChild(img);
                li.appendChild(p);
                img.src = results.artists[j].picUrl+'?param=50y50"';
                p.innerHTML = results.artists[j].name;
                li.onclick=function(){
                    sessionStorage.setItem("musicianid",results.artists[j].id);
                    window.location.href='./8.歌手详情.html';
                    
                }
            }
        }
    })

    // 首页
    page_first.onclick = function () {
        now_page.innerHTML = '第' + 1 + '页';
        let pagestype = sessionStorage.getItem("pagestype");
        if (pagestype == 'edition') {
            sessionStorage.setItem('edition_page', 0);
            load_edition();
        } else {
            sessionStorage.setItem('mv_page', 0);
            load_mv();
        }
    }
    // 上一页
    page_prev.onclick = function () {

        let pagestype = sessionStorage.getItem("pagestype");
        if (pagestype == 'edition') {
            let page = Number(sessionStorage.getItem('edition_page')) - 1;
            if (page < 0) {
                page = 0
            }
            now_page.innerHTML = '第' + (page + 1) + '页';
            sessionStorage.setItem('edition_page', page);
            load_edition();
        } else {
            let page = Number(sessionStorage.getItem('mv_page')) - 1;
            if (page < 0) {
                page = 0
            }
            now_page.innerHTML = '第' + (page + 1) + '页';
            sessionStorage.setItem('mv_page', page);
            load_mv();
        }

    }
    // 下一页
    page_next.onclick = function () {
        let pagestype = sessionStorage.getItem("pagestype");
        if (pagestype == 'edition') {
            let page = Number(sessionStorage.getItem('edition_page')) + 1;
            let lastpage = Number(sessionStorage.getItem('last_edition_page'));
            if (page > lastpage) {
                page = lastpage;
            }
            now_page.innerHTML = '第' + (page + 1) + '页';
            sessionStorage.setItem('edition_page', page);
            load_edition();
        } else {
            let page = Number(sessionStorage.getItem('mv_page')) + 1;
            let lastpage = Number(sessionStorage.getItem('last_mv_page'));
            if (page > lastpage) {
                page = lastpage;
            }
            now_page.innerHTML = '第' + (page + 1) + '页';
            sessionStorage.setItem('mv_page', page);
            load_mv();
        }

    }
    // 尾页
    page_last.onclick = function () {
        let pagestype = sessionStorage.getItem("pagestype");
        if (pagestype == 'edition') {
            let lastpage = Number(sessionStorage.getItem('last_edition_page'));
            now_page.innerHTML = '第' + (lastpage + 1) + '页'
            sessionStorage.setItem('edition_page', lastpage);
            load_edition();
        } else {
            let lastpage = Number(sessionStorage.getItem('last_mv_page'));
            now_page.innerHTML = '第' + (lastpage + 1) + '页'
            sessionStorage.setItem('mv_page', lastpage);
            load_mv();
        }
    }

    function getsongs(span1, span2, span3, span5, span5_id) {
        let tbody = document.getElementsByTagName("tbody");
        let tr = document.createElement("tr");
        let td_1 = document.createElement("td");
        let td_2 = document.createElement("td");
        let td_3 = document.createElement("td");
        let td_5 = document.createElement("td");
        let div = document.createElement("div");
        let span_1_1 = document.createElement("span");
        let span_1_2 = document.createElement("span");
        let span_2 = document.createElement("span");
        let span_3 = document.createElement("span");
        let span_5 = document.createElement("span");
        tbody[0].appendChild(tr);
        tr.appendChild(td_1);
        td_1.appendChild(div);
        div.appendChild(span_1_1);
        div.appendChild(span_1_2);
        tr.appendChild(td_2);
        td_2.appendChild(span_2);
        tr.appendChild(td_3);
        td_3.appendChild(span_3);
        tr.appendChild(td_5);
        td_5.appendChild(span_5);
        td_1.className = 'td_one';
        div.className = 'td_one_content';
        span_1_1.className = 'td_one_num';
        span_1_2.className = 'td_one_play';
        td_2.className = 'td_two';
        span_2.className = 'td_text td_music_name';
        td_3.className = 'td_three';
        span_3.className = 'td_text td_time';
        td_5.className = 'td_five';
        span_5.className = 'td_text td_edition';
        span_1_1.innerHTML = span1;
        span_2.innerHTML = span2;
        span_3.innerHTML = span3;
        span_5.innerHTML = span5;
        span_5.id = span5_id;
    }

    function geteditions(imgsrc, p1, p2) {
        let musician_edition_list = document.getElementsByClassName("musician_edition_list");
        let li = document.createElement("li");
        let div = document.createElement("div");
        let img = document.createElement("img");
        let a = document.createElement("a");
        let p_1 = document.createElement("p");
        let p_2 = document.createElement("p");
        musician_edition_list[0].appendChild(li);
        li.appendChild(div);
        div.appendChild(img);
        div.appendChild(a);
        li.appendChild(p_1);
        li.appendChild(p_2);
        div.className = 'edition_img_li';
        img.className = 'edition_img';
        a.className = 'edition_a';
        p_1.className = 'edition_name';
        p_2.className = 'edition_time';
        img.src = imgsrc;
        p_1.innerHTML = p1;
        p_2.innerHTML = p2;
    }

    function load_edition() {
        let edition_page = sessionStorage.getItem("edition_page");
        musician_edition_list[0].innerHTML = '';
        let url_2 = 'https://autumnfish.cn/artist/album?id=' + musician_id + '&limit=12&offset=' + 12 * edition_page;
        Ajax({
            url: url_2,
            success: function (results) {
                sessionStorage.setItem('last_edition_size', results.artist.albumSize);
                for (let j = 0; j < results.hotAlbums.length; j++) {
                    let imgsrc = results.hotAlbums[j].picUrl + '?param=120y120';
                    let p1 = results.hotAlbums[j].name;
                    let p2 = results.hotAlbums[j].publishTime;
                    geteditions(imgsrc, p1, p2);
                    edition_a[j].onclick = function () {
                        console.log("12");
                        sessionStorage.setItem('type', '专辑');
                        sessionStorage.setItem("musicid", results.hotAlbums[j].id);
                        window.location.href = '../4.歌单详情页/4.歌单详情页.html'
                    }
                }
                let lastpage = Number(sessionStorage.getItem('last_edition_size'));
                console.log(lastpage);
                if (lastpage % 12 == 0) {
                    lastpage = lastpage / 12 - 1;
                } else {
                    lastpage = parseInt(lastpage / 12);
                }
                sessionStorage.setItem('last_edition_page', lastpage);
                page_count.innerHTML = '共' + (lastpage + 1) + '页';
            }
        });
    }

    function getmvs(imgsrc, p1) {
        let musician_mv_list = document.getElementsByClassName("musician_edition_list");
        let li = document.createElement("li");
        let div = document.createElement("div");
        let img = document.createElement("img");
        let a = document.createElement("a");
        let p = document.createElement("p");
        musician_mv_list[0].appendChild(li);
        li.appendChild(div);
        div.appendChild(img);
        div.appendChild(a);
        li.appendChild(p);
        div.className = 'mv_img_li';
        img.className = 'mv_img';
        a.className = 'mv_a';
        p.className = 'mv_p';
        img.src = imgsrc;
        p.innerHTML = p1;
    }

    function load_mv() {
        let mv_page = sessionStorage.getItem("mv_page");
        musician_mv_list[0].innerHTML = '';
        let url_2 = 'https://autumnfish.cn/artist/mv?id=' + musician_id + '&limit=12&offset=' + 12 * mv_page;
        Ajax({
            url: url_2,
            success: function (results) {
                console.log(results);
                for (let j = 0; j < results.mvs.length; j++) {
                    let imgsrc = results.mvs[j].imgurl + '?param=137y103';
                    let p1 = results.mvs[j].name;
                    let audioid = results.mvs[j].id;
                    let imgposter = results.mvs[j].imgurl16v9;
                    getmvs(imgsrc, p1);
                    mv_a[j].onclick = function () {
                        avatar_audio[0].style.display = 'block';
                        avatar_big[0].style.display = 'none';
                        Ajax({
                            url: 'https://autumnfish.cn/mv/url?id=' + audioid,
                            success: function (results) {
                                avatar_audio[0].src = results.data.url;
                                avatar_audio[0].poster = imgposter;
                            }
                        })
                    }
                }
                let lastpage = Number(sessionStorage.getItem('last_mv_size'));
                console.log(lastpage);
                if (lastpage % 12 == 0) {
                    lastpage = lastpage / 12 - 1;
                } else {
                    lastpage = parseInt(lastpage / 12);
                }
                sessionStorage.setItem('last_mv_page', lastpage);
                page_count.innerHTML = '共' + (lastpage + 1) + '页';
            }
        });
    }

    function getintros(p_1, h_1) {
        let musician_intro_list = document.getElementsByClassName("musician_intro_list");
        let li = document.createElement("li");
        let h1 = document.createElement("h1");
        let p = document.createElement("p");
        musician_intro_list[0].appendChild(li);
        li.appendChild(h1);
        li.appendChild(p);
        h1.className = 'intro_title';
        p.className = 'intro_p';
        p.innerHTML = p_1;
        h1.innerHTML = h_1;
    }

    function load_intro() {
        let url_2 = 'https://autumnfish.cn/artist/desc?id=' + musician_id;
        Ajax({
            url: url_2,
            success: function (results) {
                let h_1 = musician_h2[0].innerHTML + '简介';
                let p_1 = results.briefDesc;
                getintros(p_1, h_1);
                for (let j = 0; j < results.introduction.length; j++) {
                    let h_1 = results.introduction[j].ti;
                    let p_1 = results.introduction[j].txt;
                    getintros(p_1, h_1);
                }
                intro_title[0].className = 'first_h1 intro_title';
            }
        })
    }
}