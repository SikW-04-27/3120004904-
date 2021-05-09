window.onload = function () {
    var musician_list = document.getElementsByClassName("musician_list");
    var musician_li = document.getElementsByClassName("musician_li");
    var right_title = document.getElementsByClassName("right_title");
    var avatar_img = document.getElementsByClassName("avatar_img");
    // 首页登入
    let loadnum = 0;
    musicurl = defaultUrlHeader + '/top/artists?limit=20';
    huidiao(musicurl, musicurl, loadnum, -1, -1);
    right_title[0].innerHTML = musician_li[0].innerHTML;

    // Ajax({
    //     url: musicurl,
    //     success: function (results) {
    //         right_title[0].innerHTML = musician_li[0].innerHTML;
    //         console.log(results);
    //         for (let j = 0; j < results.artists.length; j++) {

    //             let imgsrc = results.artists[j].img1v1Url;
    //             let a_text = results.artists[j].name
    //             getmusicians(imgsrc, a_text);

    //             let imgurl = avatar_img[j].getAttribute("data_src");
    //             avatar_img[j].src = imgurl;
    //         }
    //     }
    // });
    for (let i = 0; i < musician_li.length; i++) {
        musician_li[i].onclick = function () {
            for (let j = 0; j < musician_li.length; j++) {
                musician_li[j].className = 'musician_li nohover_li';
            }
            musician_li[i].className = 'musician_li hover_li';
            musician_list[0].innerHTML = '';
            if (i == 0) {
                let loadnum = 0;
                musicurl = defaultUrlHeader + '/top/artists?limit=20';
                // Ajax({
                //     url: musicurl,
                //     success: function (results) {
                //         console.log(results);
                //         for (let j = 0; j < results.artists.length; j++) {

                //             let imgsrc = results.artists[j].img1v1Url;
                //             let a_text = results.artists[j].name
                //             getmusicians(imgsrc, a_text);
                //             let imgurl = avatar_img[j].getAttribute("data_src");
                //             avatar_img[j].src = imgurl;
                //         }
                //     }
                // });
                huidiao(musicurl, musicurl, loadnum);
                right_title[0].innerHTML = musician_li[0].innerHTML;

            }
            if (i == 1) {
                // document.documentElement.abort();
                let loadnum = 0;
                musicurl = defaultUrlHeader + '/artist/list?type=-1&area=-1' + '&limit=15';
                huidiao(musicurl, musicurl, loadnum);
                right_title[0].innerHTML = musician_li[1].innerHTML;
            }
            if (i == 2) {
                let loadnum = 0;
                musicurl = defaultUrlHeader + '/artist/list?type=1&area=7' + '&limit=15';
                huidiao(musicurl, musicurl, loadnum);
                right_title[0].innerHTML = musician_li[2].innerHTML;

            }
            if (i == 3) {
                let loadnum = 0;
                musicurl = defaultUrlHeader + '/artist/list?type=2&area=7' + '&limit=15';
                huidiao(musicurl, musicurl, loadnum);
                right_title[0].innerHTML = musician_li[3].innerHTML;

            }
            if (i == 4) {
                let loadnum = 0;
                musicurl = defaultUrlHeader + '/artist/list?type=3&area=7' + '&limit=15';
                huidiao(musicurl, musicurl, loadnum);
                right_title[0].innerHTML = musician_li[4].innerHTML;

            }
            if (i == 5) {
                let loadnum = 0;
                musicurl = defaultUrlHeader + '/artist/list?type=1&area=96' + '&limit=15';
                huidiao(musicurl, musicurl, loadnum);
                right_title[0].innerHTML = musician_li[5].innerHTML;

            }
            if (i == 6) {
                let loadnum = 0;
                musicurl = defaultUrlHeader + '/artist/list?type=2&area=96' + '&limit=15';
                huidiao(musicurl, musicurl, loadnum);
                right_title[0].innerHTML = musician_li[6].innerHTML;

            }
            if (i == 7) {
                let loadnum = 0;
                musicurl = defaultUrlHeader + '/artist/list?type=3&area=96' + '&limit=15';
                huidiao(musicurl, musicurl, loadnum);
                right_title[0].innerHTML = musician_li[7].innerHTML;

            }
            if (i == 8) {
                let loadnum = 0;
                musicurl = defaultUrlHeader + '/artist/list?type=1&area=8' + '&limit=15';
                huidiao(musicurl, musicurl, loadnum);
                right_title[0].innerHTML = musician_li[8].innerHTML;

            }
            if (i == 9) {
                let loadnum = 0;
                musicurl = defaultUrlHeader + '/artist/list?type=2&area=8' + '&limit=15';
                huidiao(musicurl, musicurl, loadnum);
                right_title[0].innerHTML = musician_li[9].innerHTML;

            }
            if (i == 10) {
                let loadnum = 0;
                musicurl = defaultUrlHeader + '/artist/list?type=3&area=8' + '&limit=15';
                huidiao(musicurl, musicurl, loadnum);
                right_title[0].innerHTML = musician_li[10].innerHTML;

            }
            if (i == 11) {
                let loadnum = 0;
                musicurl = defaultUrlHeader + '/artist/list?type=1&area=16' + '&limit=15';
                huidiao(musicurl, musicurl, loadnum);
                right_title[0].innerHTML = musician_li[11].innerHTML;

            }
            if (i == 12) {
                let loadnum = 0;
                musicurl = defaultUrlHeader + '/artist/list?type=2&area=16' + '&limit=15';
                huidiao(musicurl, musicurl, loadnum);
                right_title[0].innerHTML = musician_li[12].innerHTML;

            }
            if (i == 13) {
                let loadnum = 0;
                musicurl = defaultUrlHeader + '/artist/list?type=3&area=16' + '&limit=15';
                huidiao(musicurl, musicurl, loadnum);
                right_title[0].innerHTML = musician_li[13].innerHTML;

            }
            if (i == 14) {
                let loadnum = 0;
                musicurl = defaultUrlHeader + '/artist/list?type=1&area=0' + '&limit=15';
                huidiao(musicurl, musicurl, loadnum);
                right_title[0].innerHTML = musician_li[14].innerHTML;

            }
            if (i == 15) {
                let loadnum = 0;
                musicurl = defaultUrlHeader + '/artist/list?type=2&area=0' + '&limit=15';
                huidiao(musicurl, musicurl, loadnum);
                right_title[0].innerHTML = musician_li[15].innerHTML;

            }
            if (i == 16) {
                let loadnum = 0;
                musicurl = defaultUrlHeader + '/artist/list?type=3&area=0' + '&limit=15';
                huidiao(musicurl, musicurl, loadnum);
                right_title[0].innerHTML = musician_li[16].innerHTML;

            }
        }

    }

    // window.onscroll = function () {
    //     var height = document.documentElement.clientHeight + (document.body.scrollTop || document.documentElement.scrollTop)
    //     var list_li = document.getElementsByClassName("list_li");
    //     for (let i = 0; i < list_li.length; i++) {
    //         if (list_li[i].offsetTop < height) {
    //             var imgurl = avatar_img[i].getAttribute("data_src");
    //             avatar_img[i].src = imgurl;
    //         }
    //     }
    // }

    function getmusicians(imgsrc, a_text,musicianid) {
        let li = document.createElement("li");
        let div = document.createElement("div");
        let img = document.createElement("img");
        let p = document.createElement("p");
        let a = document.createElement("a");

        musician_list[0].appendChild(li);
        li.appendChild(div);
        div.appendChild(img);
        li.appendChild(p);
        p.appendChild(a);

        li.className = 'list_li';
        div.className = 'li_img';
        img.className = 'avatar_img';
        p.className = 'li_p';

        img.src = '../img/loading.gif';
        img.setAttribute('data_src', imgsrc);
        // img.data_src=imgsrc;
        a.innerHTML = a_text;

        img.onclick=function(){
            sessionStorage.setItem("musicianid",musicianid);
            window.location.href='../8.歌手详情/8.歌手详情.html';
        }
    }

    // 懒加载函数
    function huidiao(url, musicurl, loadnum) {
        Ajax({
            url: musicurl,
            success: function (results) {
                console.log(results);
                for (let j = 0; j < results.artists.length; j++) {

                    let imgsrc = results.artists[j].img1v1Url+'?param=130y130';
                    let a_text = results.artists[j].name;
                    let musicianid = results.artists[j].id;
                    getmusicians(imgsrc, a_text,musicianid);
                }
                window.onscroll = function () {
                    var seeHeight = document.documentElement.clientHeight; //可见区域高度
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度
                    // console.log(scrollTop + seeHeight);
                    var list_li = document.getElementsByClassName("list_li");
                    for (let i = 0; i < list_li.length; i++) {
                        if (list_li[i].offsetTop < seeHeight + scrollTop) {
                            // 获取创建的属性值
                            var imgurl = avatar_img[i].getAttribute("data_src");
                            avatar_img[i].src = imgurl;
                        }
                    }
                    // console.log(list_li[list_li.length - 1].offsetTop);
                    // console.log(scrollTop);
                    // console.log(list_li.length);
                    if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight) {
                        console.log("123");
                        loadnum++;
                        // console.log(loadnum)
                        // musicurl = defaultUrlHeader + '/artist/list?type=' + type + '&area=' + area + '&offset=' + loadnum * 30+'&limit=15';
                        musicurl = url + '&offset=' + loadnum * 30;
                        huidiao(url, musicurl, loadnum);
                    }
                }
            }
        })
    }
}