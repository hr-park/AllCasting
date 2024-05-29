document.addEventListener('DOMContentLoaded', () => {
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    window.addEventListener('resize', setVH);
    setVH();

    //selectbox
    const selectCustom = document.querySelectorAll('.sel_box');
    selectCustom.forEach(function(selectContainer) {
        const selectElmnt = selectContainer.querySelector('select');
        const selectedDiv = document.createElement('DIV');
        selectedDiv.setAttribute('class', 'select-selected');
        selectedDiv.innerHTML = selectElmnt.options[selectElmnt.selectedIndex].innerHTML;
        selectContainer.appendChild(selectedDiv);
        
        const optionsDiv = document.createElement('DIV');
        optionsDiv.setAttribute('class', 'select-items select-hide');

        Array.from(selectElmnt.options).slice(1).forEach(function(option, idx) {
            const optionDiv = document.createElement('DIV');
            optionDiv.innerHTML = option.innerHTML;

            optionDiv.addEventListener('click', function(e) {
                selectElmnt.selectedIndex = idx + 1;
                selectedDiv.innerHTML = option.innerHTML;

                const sameAsSelected = optionsDiv.getElementsByClassName('same-as-selected');
                Array.from(sameAsSelected).forEach(function(item) {
                    item.removeAttribute('class');
                });
                optionDiv.setAttribute('class', 'same-as-selected');

                selectedDiv.click();

                if (selectElmnt.selectedIndex !== 0) {
                    selectedDiv.classList.add('has_value');
                }
            });

            optionsDiv.appendChild(optionDiv);
        });

        selectContainer.appendChild(optionsDiv);

        selectedDiv.addEventListener('click', function(e) {
            e.stopPropagation();
            closeAllSelect(this);
            optionsDiv.classList.toggle('select-hide');
            selectedDiv.classList.toggle('select-arrow-active');
        });
    });

    function closeAllSelect(el) {
        const selectItems = document.getElementsByClassName('select-items');
        const selectSelected = document.getElementsByClassName('select-selected');

        Array.from(selectSelected).forEach(function(item) {
            if (el == item) {
                return;
            } else {
                item.classList.remove('select-arrow-active');
            }
        });

        Array.from(selectItems).forEach(function(item, index) {
            if (index !== Array.from(selectSelected).indexOf(el)) {
                item.classList.add('select-hide');
            }
        });
    }

    document.addEventListener('click', function() {
        closeAllSelect();
    });

    // dropbox
    document.querySelectorAll('.drop_box button').forEach(button => {
        button.addEventListener('click', (event) => {
            const nextUl = button.nextElementSibling;
            if (nextUl && nextUl.tagName.toLowerCase() === 'ul') {
                button.classList.toggle('active');
                nextUl.style.display = nextUl.style.display === 'block' ? 'none' : 'block';
            }
            event.stopPropagation();
        });
    });

    function hideDropBox(event) {
        if (event.target.classList.contains('drop_box')) {
            return;
        }
        document.querySelectorAll('.drop_box ul').forEach(dropBox => {
            if (dropBox.style.display === 'block' && !dropBox.contains(event.target)) {
                dropBox.style.display = 'none';
                //dropBox.previousElementSibling.classList.remove('active');
            }
        });
    }

    function hideDropMenu(event) {
        if (event.target.classList.contains('btn_drop_menu')) {
            return;
        }
        document.querySelectorAll('.drop_menu').forEach(dropBox => {
            if (dropBox.style.display === 'block' && !dropBox.contains(event.target)) {
                dropBox.style.display = 'none';
                //dropBox.previousElementSibling.classList.remove('active');
            }
        });
    }

    document.querySelector('body').addEventListener('click', hideDropBox);
    document.querySelector('body').addEventListener('click', hideDropMenu);

    //btndropmenu
    document.querySelectorAll('.btn_drop_menu').forEach(button => {
        button.addEventListener('click', () => {
            event.stopPropagation(); // 이벤트 버블링 방지
            const dropBox = button.nextElementSibling;
            if (dropBox && dropBox.classList.contains('drop_menu')) {
                dropBox.style.display = dropBox.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    //type_nav slide
    const typeNavElement = document.querySelector('.type_nav');
    if (typeNavElement && typeNavElement.clientHeight > 40) {
        const activeSlide = typeNavElement.querySelector('.swiper-slide.active');
        if (activeSlide) {
            const typeNavChildren = Array.from(typeNavElement.children);
            const typeNavIdx = typeNavChildren.indexOf(activeSlide);
            const typeNavSwiper = new Swiper('.type_nav', {
                slidesPerView: "auto",
                observer: true,
                observeParents: true,
                initialSlide: typeNavIdx,
            });
            typeNavElement.classList.add('swiper_type_nav');
        }
    }

    //layerpopup
    document.querySelectorAll('.dim_layer .dim').forEach(dim => {
        dim.addEventListener('click', () => {
            dim.closest('.dim_layer').classList.remove('active');
            //dim.closest('.dim_layer').style.display = 'none';
            dim.closest('.dim_layer').style.visibility = 'hidden';
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        });
    });
});

function openPop(popName) {
    document.querySelectorAll(`#${popName}`).forEach(pop => {
        pop.style.visibility = 'visible';
        pop.classList.add('active');
    });
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
}

function closePop(popName) {
    document.querySelectorAll(`#${popName}`).forEach(pop => {
        pop.style.visibility = 'hidden';
        pop.classList.remove('active');
    });
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
}

function showNotification(message) {
    const layerNoti = document.querySelector('#layerNoti');
    if (!layerNoti) {
        document.querySelector('.content').insertAdjacentHTML('beforeend', `<div class="layer_noti" id="layerNoti">${message}</div>`);
        setTimeout(function(){
            const updatedLayerNoti = document.querySelector('#layerNoti');
            if (updatedLayerNoti) {
                updatedLayerNoti.remove();
            }
        }, 1000);
    }
}

//chkNumber
function chkNumber(target, num){
    target.value = num > 0 
    ? target.value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3').replace(/-{1,2}$/, '')
    : target.value.replace(/[^0-9]/g, '');
};