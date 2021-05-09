window.onload = function () {
    var searchBtn = document.getElementById("searchBtn");
    var searchBox = document.getElementById("searchBox");
    var td_music_name = document.getElementsByClassName("td_music_name");
    var td_musician = document.getElementsByClassName("td_musician");
    var td_edition = document.getElementsByClassName("td_edition");
    var searchBox_big = document.getElementsByClassName("searchBox_big");
    var hoverbtn = document.getElementsByClassName("hoverbtn");
    var td_one_play = document.getElementsByClassName("td_one_play");
    var header_avatar_img = document.getElementsByClassName("header_avatar_img");
    var bar_musicname = document.getElementsByClassName("bar_musicname");
    var bar_musician = document.getElementsByClassName("bar_musician");
    var musicurl;
    var bofangurl;
    var searchurl;
    var searchkey;
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
                        broadcast[0].style.backgroundPosition = '0 -165px';
                        bofangurl = defaultUrlHeader + '/song/url?id=' + music_info.result.songs[x].id;
                        // 将正在播放的歌曲的id存入缓存
                        sessionStorage.setItem("playing_id",music_info.result.songs[x].id);
                        bar_musicname[0].onclick=function(){
                            bar_musicname[0].href='../6.歌曲详情/6.歌曲详情.html';
                        }
                        header_avatar_img[0].src = music_info.result.songs[x].al.picUrl;
                        bar_musicname[0].innerHTML = music_info.result.songs[x].name;
                        bar_musician[0].innerHTML = music_info.result.songs[x].ar[0].name;
                        Ajax({
                            url: bofangurl,
                            success: function (resultss) {
                                musicurl = resultss.data[0].url;
                                bofang();
                                bofangurls(musicurl);
                                // 歌曲播放结束下一首播放
                                broadcast_1.onended = function () {
                                    x++;
                                    if (music_info.result.songs[x]) {
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
                        if (x > music_info.result.songs.length - 1) {
                            x = music_info.result.songs.length - 1;
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
                td_music_name[j].onclick=function(){
                    console.log("1234");
                    sessionStorage.setItem("playing_id",music_info.result.songs[j].id);
                    window.location.href='../6.歌曲详情/6.歌曲详情.html'
                }
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
        window.location.href = "../5.搜索歌曲页面/5.搜索歌曲页面.html";
        // Ajax({
        //     url: searchurl,
        //     success: function (results) {
        //         sessionStorage.setItem("search", searchurl);
        //         sessionStorage.setItem("search_key", searchBox.value);
        //         window.location.href = "../5.搜索歌曲页面/5.搜索歌曲页面.html";
        //         for (let j = 0; j < 20; j++) {
        //             let span2 = results.result.songs[j].name;
        //             let temp = results.result.songs[j].dt;
        //             let span3 = dtime(temp);
        //             let span4 = results.result.songs[j].ar[0].name;
        //             let span5 = results.result.songs[j].al.name;

        //             createmusic(span2, span3, span4, span5, j);

        //         }
        //         bofangurl = defaultUrlHeader + '/song/url?id=' + results.result.songs[0].id;
        //         td_music_name[0].innerHTML = results.result.songs[0].name;
        //         td_musician[0].innerHTML = results.result.songs[0].ar[0].name;
        //     }
        // });
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
        window.location.href = "../5.搜索歌曲页面/5.搜索歌曲页面.html";
    })

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
        window.location.href = "../5.搜索歌曲页面/5.搜索歌曲页面.html";
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
        window.location.href = "../5.搜索歌曲页面/5.搜索歌曲页面.html";
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
        window.location.href = "../5.搜索歌曲页面/5.搜索歌曲页面.html";
    }
    // 尾页
    page_last.onclick=function(){
        let lastpage=sessionStorage.getItem('last_page');
        sessionStorage.setItem('page',lastpage);
        searchurl = defaultUrlHeader + '/cloudsearch?keywords=' + searchBox_big[0].value+'&limit=20&offset='+lastpage*20;
        sessionStorage.setItem("search", searchurl);
        window.location.href = "../5.搜索歌曲页面/5.搜索歌曲页面.html";

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
        let span_3 = document.createElement("span");
        let span_4 = document.createElement("span");
        let span_5 = document.createElement("span");
        tbody[0].appendChild(tr);
        tr.appendChild(td_2);
        td_2.appendChild(span_2_1);
        td_2.appendChild(span_2_2);
        tr.appendChild(td_3);
        td_3.appendChild(span_3);
        tr.appendChild(td_4);
        td_4.appendChild(span_4);
        tr.appendChild(td_5);
        td_5.appendChild(span_5);
        td_2.className = 'td_two';
        span_2_1.className = 'td_one_play';
        span_2_2.className = 'td_text td_music_name';
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