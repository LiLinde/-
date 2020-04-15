let pubuliu = (function () {
    // 一、获取三个li盒子并转数组
    let liebiao = Array.from(document.querySelectorAll('.liebiao'));
    // 二、获取数据
    let _data = [];
    let shuju = function shuju() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', 'json/data.json', false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                _data = JSON.parse(xhr.responseText);
                console.log(_data);

            }
        }
        xhr.send(null);
    };
    // 三、数据绑定
    let tupianhezi = function tupianhezi() {
        _data.map(item => {
            item.height = (277 * item.height) / item.width;
            item.width = 277;
            return item
        });
        for (let i = 0; i < _data.length; i += 4) {
            let fengzu = _data.slice(i, i + 4);
            fengzu.sort((a, b) => {
                return a.height - b.height
            });
            liebiao.sort((a, b) => {
                return b.offsetHeight - a.offsetHeight;
            });
            fengzu.forEach((item, index) => {
                let {
                    pic,
                    height,
                    title,
                    link
                } = item;
                let hezi = document.createElement('div');
                // console.log(div);

                hezi.className = "hezi";
                hezi.innerHTML = `  <a href="${link}">
                <div class="tupian" style="height:${height}px">
                    <img src="" alt="" data-image="${pic}">
                </div>
                <p>${title}</p>
            </a>`;
                liebiao[index].appendChild(hezi);
            });
        }
    }
    // 四、延迟加载
    let yanchi = function yanchi() {
        let tupian = document.querySelectorAll('.tupian');
        [].forEach.call(tupian, tupian => {
            let isLoad = tupian.getAttribute('isLoad');
            if (isLoad === 'true') return;
            let B = fangfaku.offset(tupian).top + tupian.offsetHeight / 2;
            let A = document.documentElement.clientHeight + document.documentElement.scrollTop;
            if (B <= A) {
                jiazai(tupian)
            }
        });
    }
    // 封装加载图片方法
    let jiazai = function jiazai(tupian) {
        let img = tupian.querySelector('img');
        let cunchu = img.getAttribute('data-image');
        let linshiimg = new Image;
        linshiimg.src = cunchu;
        linshiimg.onload = () => {
            img.src = cunchu;
            console.log(img);

            fangfaku.css(img, 'opacity', 1);
        };
        img.removeAttribute('data-image');
        linshiimg = null;
        tupian.setAttribute('isLoad', 'true')
    }

    // 五、加载跟多数据
    let shifouxuanran;
    let gengduoshuju = function gengduoshuju() {
        let HTML = document.documentElement;
        if (HTML.clientHeight * 1.5 + HTML.scrollTop >= HTML.scrollHeight) {
            if (shifouxuanran) return
            shifouxuanran = this;
            shuju();
            tupianhezi();
            yanchi();
            shifouxuanran = false;
        }
    }
    return {
        init() {
            shuju();
            tupianhezi();
            yanchi();
            window.onscroll = function () {
                yanchi();
                gengduoshuju();

            }

        }
    }
})();
pubuliu.init();