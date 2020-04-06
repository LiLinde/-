let shangcheng = (function () {
    let navList = document.querySelectorAll('.nav .list');
    chanpinBox = document.querySelector('.chanpinBox');
    let data = null;
    let shuju = function shuju() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', './json/product.json', false);
        xhr.onreadystatechange = () => {
            if (xhr.status === 200 && xhr.readyState === 4) {
                data = JSON.parse(xhr.responseText);
            };
        };
        xhr.send(null);
    };

    let chanpin = function chanpin() {
        let moban = ``;
        data.forEach(item => {

            let {
                title,
                price,
                time,
                hot,
                img
            } = item;
            moban += `<ul class="listBox">
            <li>
                <img src="${img}" alt="">
            </li>
            <li>
                <h2>${title}</h2>
            </li>
            <li>价格：￥${price.toFixed(2)}</li>
            <li>销量：${hot}</li>
            <li>时间：${time.replace(/-/g,'/')}</li>
            <li>
                <h1>立即购买</h1>
            </li>
        </ul>`
        });
        chanpinBox.innerHTML = moban;
    }

    let paixu = function paixu() {
        Array.from(navList).forEach(item => {
            item.flog = -1;
            item.onclick = function () {
                chushi.call(this);
                this.flog *= -1;
                let pai = this.getAttribute('data-pai');
                data.sort((a, b) => {
                    a = String(a[pai]).replace(/-/g, '');
                    b = String(b[pai]).replace(/-/g, '');
                    return (a - b) * this.flog;
                })
                chanpin();
            }
        })
    }

    let chushi = function chushi() {
        Array.from(navList).forEach(item => {
            if (item !== this) {
                item.flog = -1;
            }
        });
    };

    return {
        init() {
            shuju();
            chanpin();
            paixu();

        }
    }
})();
shangcheng.init();