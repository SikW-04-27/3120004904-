window.onload = function () {
    var searchBtn = document.getElementById("searchBtn");
    var searchBox = document.getElementById("searchBox");
    var td_music_name = document.getElementsByClassName("td_music_name");
    var td_musician = document.getElementsByClassName("td_musician");
    var td_edition = document.getElementsByClassName("td_edition");
    var searchBox_big = document.getElementsByClassName("searchBox_big");
    var hoverbtn = document.getElementsByClassName("hoverbtn");
    var td_one_play = document.getElementsByClassName("td_one_play");
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
    var musicurl;
    var bofangurl;
    var searchurl;
    var searchkey;

    bofang();
    shichangload();
    play();

    // 可以操作待播歌单
    let arrdata = JSON.parse(sessionStorage.getItem('arr'));
    playARR(arrdata);

    // 点击导航栏跳转页面
    one();
    two();
    five();
    seven();

    
    // 首页的搜索跳转
    searchurl = sessionStorage.getItem('search');
    searchkey = sessionStorage.getItem('search_key');
    searchBox.value = searchkey;
    searchBox_big[0].value = searchkey;
    Ajax({
        url: searchurl,
        success: function (results) {
            sessionStorage.setItem('last_page',parseInt(results.result.songCount/20));
            if(parseInt(results.result.songCount/20)>18){
                sessionStorage.setItem('last_page',17);
            }
            let page= Number(sessionStorage.getItem('page'))+1 ;
            let lastpage= Number(sessionStorage.getItem('last_page'))+1 ;
            page_count.innerHTML='共'+lastpage +'页';
            now_page.innerHTML='第'+page+'页';

            let resultsjson = JSON.stringify(results);
            sessionStorage.setItem("musicinfo", resultsjson);
            var music_info = JSON.parse(sessionStorage.getItem("musicinfo"));
            for (let j = 0; j < 20; j++) {
                let span2 = results.result.songs[j].name;
                let temp = results.result.songs[j].dt;
                let span3 = dtime(temp);
                let span4 = results.result.songs[j].ar[0].name;
                let span5 = results.result.songs[j].al.name;

                createmusic(span2, span3, span4, span5, j);
                td_one_play[j].onclick = function () {
                    let x = j;
                    // 定义一个自动播放的函数
                    function autoplay(x) {
                        parent.broadcast[0].style.backgroundPosition = '0 -165px';
                        bofangurl = defaultUrlHeader + '/song/url?id=' + music_info.result.songs[x].id;
                        // 将正在播放的歌曲的id存入缓存
                        sessionStorage.setItem("playing_id",music_info.result.songs[x].id);
                        parent.bar_musicname[0].onclick=function(){
                            sessionStorage.setItem('ing', 'true');
                            parent.inner.src='../6.歌曲详情/6.歌曲详情.html';
                        }
                        parent.header_avatar_img[0].src = music_info.result.songs[x].al.picUrl;
                        parent.bar_musicname[0].innerHTML = music_info.result.songs[x].name;
                        parent.bar_musician[0].innerHTML = music_info.result.songs[x].ar[0].name;
                        Ajax({
                            url: bofangurl,
                            success: function (resultss) {
                                musicurl = resultss.data[0].url;
                                bofang();
                                shichangload();
                                bofangurls(musicurl);
                                // 歌曲播放结束下一首播放
                                parent.broadcast_1[0].onended = function () {
                                    x++;
                                    if (music_info.result.songs[x]) {
                                        parent.broadcast_1[0].load();
                                        autoplay(x);
                                    }
                                }
                                
                            }
                        });
                        play();
                    }
                    autoplay(x);
                    // var next = document.getElementsByClassName("next");
                    // next[0].onclick = function () {
                    //     x++;
                    //     if (x > music_info.result.songs.length - 1) {
                    //         x = music_info.result.songs.length - 1;
                    //     }
                    //     autoplay(x);
                    // }
                    // var prev = document.getElementsByClassName("prev");
                    // prev[0].onclick = function () {
                    //     x--;
                    //     if (x < 0) {
                    //         x = 0;
                    //     }
                    //     autoplay(x);
                    // }
                }
                td_music_name[j].onclick=function(){
                    sessionStorage.setItem('ing', 'false');
                    sessionStorage.setItem("playing_id",music_info.result.songs[j].id);
                    parent.inner.src = '../6.歌曲详情/6.歌曲详情.html';
                }
                td_musician[j].onclick=function(){
                    sessionStorage.setItem("musicianid",music_info.result.songs[j].ar[0].id);
                    parent.inner.src = '../8.歌手详情/8.歌手详情.html';
                }
                td_edition[j].onclick=function(){
                    sessionStorage.setItem("type",'专辑');
                    sessionStorage.setItem("musicid",music_info.result.songs[j].al.id);
                    parent.inner.src = '../4.歌单详情页/4.歌单详情页.html';
                }
                add[j].onclick = function () {
                    let name = music_info.result.songs[j].name;
                    let id = music_info.result.songs[j].id;
                    let musicname = music_info.result.songs[j].ar[0].name;
                    let picurl = music_info.result.songs[j].al.picUrl;
                    // 添加歌曲到待播歌单
                    addmusic(name, id,musicname,picurl);
                    let arrdata = JSON.parse(sessionStorage.getItem('arr'));
                    playARR(arrdata);
                }
                add_musiclist[j].addEventListener('click', function () {
                    let user_4 = JSON.parse(sessionStorage.getItem("user"));
                    plusMusic_div[0].style.display = 'block';
                    sessionStorage.setItem('select_music', music_info.result.songs[j].id);
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
                                        console.log("123");
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
    })


    // 搜索功能
    searchBtn.addEventListener("click", function () {
        sessionStorage.setItem('page',1);
        if (searchBox.value == '') {
            searchurl = defaultUrlHeader + '/cloudsearch?keywords=' + '常言道'+'&limit=20&offset=0';
        } else {
            searchurl = defaultUrlHeader + '/cloudsearch?keywords=' + searchBox.value+'&limit=20&offset=0';
        }
        sessionStorage.setItem("search", searchurl);
        sessionStorage.setItem("search_key", searchBox.value);
        parent.inner.src = '../5.搜索歌曲页面/5.搜索歌曲页面.html';
    })
    hoverbtn[0].addEventListener("click", function () {
        if (searchBox_big.value == '') {
            searchurl = defaultUrlHeader + '/cloudsearch?keywords=' + '常言道'+'&limit=20&offset=0';
        } else {
            searchurl = defaultUrlHeader + '/cloudsearch?keywords=' + searchBox_big[0].value+'&limit=20&offset=0';
        }
        sessionStorage.setItem("search", searchurl);
        sessionStorage.setItem("search_key", searchBox_big[0].value);
        sessionStorage.setItem("page", 0);
        parent.inner.src = '../5.搜索歌曲页面/5.搜索歌曲页面.html';
    })
    document.onkeydown = function () {
        var code = window.event.keyCode;
        if (code == 13) {
            sessionStorage.setItem('page', 0);
            if (searchBox_big[0].value == '') {
                searchurl = defaultUrlHeader + '/cloudsearch?keywords=' + '常言道' + '&limit=20&offset=0';
            } else {
                searchurl = defaultUrlHeader + '/cloudsearch?keywords=' + searchBox_big[0].value + '&limit=20&offset=0';
            }
            sessionStorage.setItem("search", searchurl);
            sessionStorage.setItem("search_key", searchBox_big[0].value);
            parent.inner.src = '../5.搜索歌曲页面/5.搜索歌曲页面.html';
        }
    }

    var page_first=document.getElementById("page_first");
    var page_prev=document.getElementById("page_prev");
    var page_next=document.getElementById("page_next");
    var page_last=document.getElementById("page_last");
    var now_page=document.getElementById("now_page");
    var page_count=document.getElementById("page_count");

    // 首页
    page_first.onclick=function(){
        sessionStorage.setItem('page',0);
        searchurl = defaultUrlHeader + '/cloudsearch?keywords=' + searchBox_big[0].value+'&limit=20&offset='+0;
        sessionStorage.setItem("search", searchurl);
        parent.inner.src = '../5.搜索歌曲页面/5.搜索歌曲页面.html';
    }

    // 上一页
    page_prev.onclick=function(){
        let page=Number(sessionStorage.getItem('page'))-1;
        if(page<0){
            page=0
        }
        sessionStorage.setItem('page',page);
        searchurl = defaultUrlHeader + '/cloudsearch?keywords=' + searchBox_big[0].value+'&limit=20&offset='+page*20;
        sessionStorage.setItem("search", searchurl);
        parent.inner.src = '../5.搜索歌曲页面/5.搜索歌曲页面.html';
    }
    // 下一页
    page_next.onclick=function(){
        let page=Number(sessionStorage.getItem('page'))+1;
        let lastpage=sessionStorage.getItem('last_page');
        if(page>lastpage){
            page=lastpage;
        }
        sessionStorage.setItem('page',page);
        searchurl = defaultUrlHeader + '/cloudsearch?keywords=' + searchBox_big[0].value+'&limit=20&offset='+page*20;
        sessionStorage.setItem("search", searchurl);
        parent.inner.src = '../5.搜索歌曲页面/5.搜索歌曲页面.html';
    }
    // 尾页
    page_last.onclick=function(){
        let lastpage=sessionStorage.getItem('last_page');
        sessionStorage.setItem('page',lastpage);
        searchurl = defaultUrlHeader + '/cloudsearch?keywords=' + searchBox_big[0].value+'&limit=20&offset='+lastpage*20;
        sessionStorage.setItem("search", searchurl);
        parent.inner.src = '../5.搜索歌曲页面/5.搜索歌曲页面.html';

    }


    function createmusic(span2, span3, span4, span5, j) {
        let tbody = document.getElementsByTagName("tbody");
        let tr = document.createElement("tr");
        let td_2 = document.createElement("td");
        let td_3 = document.createElement("td");
        let td_4 = document.createElement("td");
        let td_5 = document.createElement("td");
        let span_2_1 = document.createElement("span");
        let span_2_2 = document.createElement("span");
        let span_2_3 = document.createElement("span");
        let span_2_4 = document.createElement("span");
        let span_3 = document.createElement("span");
        let span_4 = document.createElement("span");
        let span_5 = document.createElement("span");
        tbody[0].appendChild(tr);
        tr.appendChild(td_2);
        td_2.appendChild(span_2_1);
        td_2.appendChild(span_2_2);
        td_2.appendChild(span_2_3);
        td_2.appendChild(span_2_4);
        tr.appendChild(td_3);
        td_3.appendChild(span_3);
        tr.appendChild(td_4);
        td_4.appendChild(span_4);
        tr.appendChild(td_5);
        td_5.appendChild(span_5);
        td_2.className = 'td_two';
        span_2_1.className = 'td_one_play';
        span_2_2.className = 'td_text td_music_name';
        span_2_3.className = 'add fas fa-plus';
        span_2_4.className = 'add_musiclist fas fa-star';
        td_3.className = 'td_three';
        span_3.className = 'td_text td_time';
        td_4.className = 'td_four';
        span_4.className = 'td_text td_musician';
        td_5.className = 'td_five';
        span_5.className = 'td_text td_edition';
        span_2_2.innerHTML = span2;
        span_3.innerHTML = span3;
        span_4.innerHTML = span4;
        span_5.innerHTML = span5;

        if (j % 2 == 0) {
            tr.className = 'even'
        } else {
            tr.style.backgroundColor = '#fff';
        }
    }
}