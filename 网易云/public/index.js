window.onload = function () {
    var inner = document.getElementById("inner");

    // 点击歌曲名跳转
    bar_musicname[0].addEventListener('click', function () {
        sessionStorage.setItem('ing', 'true');
        parent.inner.src = '../6.歌曲详情/6.歌曲详情.html';
    });

    // 点击歌手跳转
    bar_musician[0].onclick = function () {
        parent.inner.src = '../8.歌手详情/8.歌手详情.html';
    }

    // 防止第一次打开网页没有歌曲
    let playingid = sessionStorage.getItem('playing_id');
    if(!playingid){
        playingid=190328;
        sessionStorage.setItem('playing_id',190328);
    }

    // 导入歌曲信息
    bofangurl_1 = defaultUrlHeader + '/song/detail?ids=' + playingid;
    Ajax({
        url: bofangurl_1,
        success: function (resultss) {
            let bofangurl = defaultUrlHeader + '/song/url?id=' + resultss.songs[0].id;
            Ajax({
                url:bofangurl,
                success:function(results){
                    let musicurl=results.data[0].url;
                    bofangurls(musicurl);
                }
            })
            parent.header_avatar_img[0].src = resultss.songs[0].al.picUrl;
            parent.bar_musicname[0].innerHTML = resultss.songs[0].name;
            parent.bar_musician[0].innerHTML = resultss.songs[0].ar[0].name;
            bofang();
            shichangload();
        }
    });

    // 播放
    play();

    // 点击待播清单和播放历史按钮
    let user = JSON.parse(sessionStorage.getItem("user"));
    let collect_btn_01 = document.getElementsByClassName("collect_btn_01");
    let collect_btn_02 = document.getElementsByClassName("collect_btn_02");
    let collect_all = document.getElementsByClassName("collect_all");
    collect_btn_01[0].onclick = function () {
        collect_all[0].style.left = 0;
        collect_btn_02[0].style.backgroundColor = '';
        collect_btn_02[0].style.color = '';
        collect_btn_01[0].style.backgroundColor = 'gray';
        collect_btn_01[0].style.color = '#fff';
    }
    collect_btn_02[0].onclick = function () {
        collect_all[0].style.left = -230 + 'px';
        collect_btn_01[0].style.backgroundColor = '';
        collect_btn_01[0].style.color = '';
        collect_btn_02[0].style.backgroundColor = 'gray';
        collect_btn_02[0].style.color = '#fff';
    }
    
    // 初始化待播清单
    sessionStorage.setItem('arr', '{"arr":[{}]}');
    // 刷新页面时不会重置待播清单
    updataARR();
    let arrdata = JSON.parse(sessionStorage.getItem('arr'));
    playARR(arrdata);
}