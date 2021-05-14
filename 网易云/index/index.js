window.onload = function () {
    var inner = document.getElementById("inner");
    bar_musicname[0].addEventListener('click', function () {
        sessionStorage.setItem('ing', 'true');
        console.log("3456");
        parent.inner.src = '../6.歌曲详情/6.歌曲详情.html';
    });
    bar_musician[0].onclick = function () {
        parent.inner.src = '../8.歌手详情/8.歌手详情.html';
    }

    let playingid = sessionStorage.getItem('playing_id');
    if(!playingid){
        playingid=190328;
    }
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

    // playorpause();
    play();

    let user = JSON.parse(sessionStorage.getItem("user"));
    let collect_01 = document.getElementsByClassName("collect_01");
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
    // 播放记录
    let historyurl = defaultUrlHeader + '/user/record?uid=' + user.account.id + '&type=1&cookie=' + user.cookie;
    console.log(historyurl);
    Ajax({
        url: historyurl,
        success: function (results) {
            for (let i = 0; i < results.weekData.length; i++) {
                let li = document.createElement("li");
                let span_1 = document.createElement("span");
                let span_2 = document.createElement("span");
                collect_01[0].appendChild(li);
                li.appendChild(span_1);
                li.appendChild(span_2);
                li.className = 'collect_01_li';
                span_1.className = 'collect_01_num';
                span_2.className = 'collect_01_content';
                span_1.innerHTML = i + 1;
                span_2.innerHTML = results.weekData[i].song.name;
                li.onclick = function () {
                    sessionStorage.setItem('playing_id', results.weekData[i].song.id);
                    sessionStorage.setItem('ing', 'false');
                    parent.inner.src = '../6.歌曲详情/6.歌曲详情.html';
                }
            }


        }
    });


    sessionStorage.setItem('arr', '{"arr":[{}]}');
    // 刷新页面时不会重置待播清单
    updataARR();
    let arrdata = JSON.parse(sessionStorage.getItem('arr'));
    playARR(arrdata);
}