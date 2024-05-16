document.addEventListener("DOMContentLoaded", () => {
    //seletbox
    let x, i, j, l, ll, selElmnt, a, b, c;
    x = document.getElementsByClassName("sel_box");
    l = x.length;
    for (i = 0; i < l; i++) {
        selElmnt = x[i].querySelector("select");
        ll = selElmnt.length;
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < ll; j++) {
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function(e) {
                let y, k, s, h, sl, yl;
                s = this.parentNode.parentNode.querySelector("select");
                sl = s.length;
                h = this.parentNode.previousElementSibling;
                for (let i = 0; i < sl; i++) {
                    if (s.options[i].innerHTML === this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                            y[k].classList.remove("same-as-selected");
                        }
                        this.classList.add("same-as-selected");

                        // 값을 선택한 후에 "has_value" 클래스를 추가
                        h.classList.add('has_value');

                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }

    
    // 모든 선택 상자 닫는 함수
    function closeAllSelect(elmnt) {
        let x, y, xl, yl, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (let i = 0; i < yl; i++) {
            if (elmnt === y[i]) {
                arrNo.push(i);
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (let i = 0; i < xl; i++) {
            if (!arrNo.includes(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }

    document.addEventListener("click", closeAllSelect);

    //popup
    const layer_popup = (el) => {
        const $el = document.querySelector(el);    // 레이어의 id를 $el 변수에 저장
        const isDim = $el.previousElementSibling.classList.contains('dim'); // dimmed 레이어를 감지하기 위한 boolean 변수
        console.log(el);
        isDim ? document.querySelector('.dim_layer').style.display = 'block' : $el.style.display = 'block';
    
        /*const $elWidth = $el.offsetWidth,
            $elHeight = $el.offsetHeight,
            docWidth = document.documentElement.clientWidth,
            docHeight = document.documentElement.clientHeight;
    
        if ($elHeight < docHeight || $elWidth < docWidth) {
            $el.style.marginTop = `${-$elHeight / 2}px`;
            $el.style.marginLeft = `${-$elWidth / 2}px`;
        } else {
            $el.style.top = '0';
            $el.style.left = '0';
        }*/

        //$el.querySelector('a.btn_pop_close.active').addEventListener('click', () => {
            $el.querySelector('a.btn_pop_close').addEventListener('click', () => {
            //isDim ? document.querySelector('.dim_layer').style.display = 'none' : $el.style.display = 'none';
            //document.querySelector('.dim_layer').style.display = 'none';
            $el.style.display = 'none';
            return false;
        });
    
        document.querySelector('.dim_layer .dim').addEventListener('click', () => {
            document.querySelector('.dim_layer').style.display = 'none';
            return false;
        });
    };

    document.querySelectorAll('.btn_pop_open').forEach(button => {
        button.addEventListener('click', function() {
            const href = this.getAttribute('href');
            layer_popup(href);
        });
    });

   
});

function chkNumber(target, num){
    if (num > 0) {
        target.value = target.value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3').replace(/-{1,2}$/, '');
    } else {
        target.value = target.value.replace(/[^0-9]/g, '');
    }
};
