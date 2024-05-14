document.addEventListener("DOMContentLoaded", () => {
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
    $('.btn-example').click(function(){
        const $href = $(this).attr('href');
        layer_popup($href);
    });

    function layer_popup(el){
        const $el = $(el);    // 레이어의 id를 $el 변수에 저장
        const isDim = $el.prev().hasClass('dim'); // dimmed 레이어를 감지하기 위한 boolean 변수

        isDim ? $('.dim_layer').fadeIn() : $el.fadeIn();

        const $elWidth = $el.outerWidth(),
            $elHeight = $el.outerHeight(),
            docWidth = $(document).width(),
            docHeight = $(document).height();

        // 화면의 중앙에 레이어를 띄웁니다.
        if ($elHeight < docHeight || $elWidth < docWidth) {
            $el.css({
                marginTop: -$elHeight /2,
                marginLeft: -$elWidth/2
            });
        } else {
            $el.css({top: 0, left: 0});
        }

        $el.find('a.btn_pop_close.active').click(function(){
            isDim ? $('.dim_layer').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힙니다.
            return false;
        });

        $('.layer .dim').click(function(){
            $('.dim_layer').fadeOut();
            return false;
        });
    }

    function chkNumber(target, num){
        if(num > 0){
            target.value = target.value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`).replace(/(\-{1,2})$/g, "");
        } else {
            target.value = target.value.replace(/[^0-9]/g, '');
        }
    }

    $(document).ready(() => {
        const tag = {};
        let counter = 0;
    
        const addTag = (value) => {
            tag[counter] = value;
            counter++;
        };
    
        const marginTag = () => Object.values(tag).filter(word => word !== "");
    
        $("#tag-form").on("submit", (e) => {
            const value = marginTag(); // 배열로 반환
            $("#rdTag").val(value); 
            $(e.target).submit();
        });
    
        $("#tag").on("keypress", (e) => {
            const self = $(e.target);
    
            if (e.key === "Enter" || e.keyCode === 32) {
                const tagValue = self.val(); 
    
                // 해시태그 값이 없으면 실행X
                if (tagValue !== "") {
                    // 중복 태그 확인
                    const result = Object.values(tag).filter(word => word === tagValue);
                    
                    // 중복 태그가 없으면 실행
                    if (result.length === 0) { 
                        $("#tag_list").append(`<li class='tag_item'>${tagValue}<span class='btn_del' idx='${counter}'>태그삭제</span></li>`);
                        addTag(tagValue);
                        self.val("");
                    } else {
                        alert("특기가 중복됩니다.");
                    }
                }
                e.preventDefault(); // 스페이스바 시 빈 공간이 생기지 않도록 방지
            }
        });
    
        // 인덱스 검사 후 삭제
        $(document).on("click", ".btn_del", (e) => {
            const index = $(e.target).attr("idx");
            tag[index] = "";
            $(e.target).parent().remove();
        });
    });
});
