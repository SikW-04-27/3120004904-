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