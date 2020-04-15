let fangfaku = (function () {
    //    1、封装获取offset左上偏移量的方法
    function offset(element) {
        let canzhaowu = element.offsetParent,
            top = element.offsetTop,
            left = element.offsetLeft;
        while (canzhaowu) {
            // 加边框
            top += canzhaowu.clientTop;
            left += canzhaowu.clientLeft;
            // 加偏移值
            top += canzhaowu.offsetTop;
            left += canzhaowu.offsetLeft;
            canzhaowu = canzhaowu.offsetParent;
        }
        return {
            left,
            top
        };
    };

    //获取CSS样式

    function huoquCss(element, attr) {
        let yangshi = window.getComputedStyle(element)[attr],
            reg = /^\d+(px|rem|em)?$/i;
        if (reg.test(yangshi)) {
            yangshi = parseFloat(yangshi);
        }
        return yangshi;
    }
    // 1、封装一个set设置元素样式的方法

    function dansheCss(element, attr, yangshi) {
        if (attr === "opacity") {
            element['style']['opacity'] = yangshi;
            return;
        }
        let reg = /^(width|height|margin|padding)?(top|left|bottom|right)?$/i;
        if (reg.test(attr)) {
            if (!isNaN(yangshi)) {
                yangshi += 'px';
            }
            element['style'][attr] = yangshi;
        };
    };
    //  2、封装多个设置属性样式的方法

    function duosheCss(element, duixiang) {
        for (let key in duixiang) {
            if (!duixiang.hasOwnProperty(key)) break
            setCss(element, key, duixiang[key]);
        }
    }
    // 3、封装css合并方法
    function css(element) {
        let len = arguments.length,
            suoying1 = arguments[1],
            suoying2 = arguments[2];
        if (len >= 3) {
            dansheCss(element, suoying1, suoying2);
            return;
        };
        if (suoying1 !== null && typeof suoying1 === "object") {
            duosheCss(element, suoying1);
            return
        };
        return huoquCss(element, suoying1);
    }
    return {
        css,
        offset
    }
})();