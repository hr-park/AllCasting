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

//dropbox
document.querySelectorAll('.drop_box button').forEach(button => {
    button.addEventListener('click', () => {
        const nextUl = button.nextElementSibling;
        if (nextUl && nextUl.tagName.toLowerCase() === 'ul') {
            button.classList.toggle('active');
            nextUl.style.display = nextUl.style.display === 'block' ? 'none' : 'block';
        }
    });
});

//calendar
// const flatpickr = document.querySelector('#flatpickr');
// flatpickr.flatpickr();

//layerpopup
document.querySelectorAll('.dim_layer .dim').forEach(dim => {
    dim.addEventListener('click', () => {
        dim.closest('.dim_layer').style.display = 'none';
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    });
});

function openPop(popName) {
    document.querySelectorAll(`#${popName}`).forEach(pop => pop.style.display = 'block');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
}

function closePop(popName) {
    document.querySelectorAll(`#${popName}`).forEach(pop => pop.style.display = 'none');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
}

//chkNumber
function chkNumber(target, num){
    target.value = num > 0 
    ? target.value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3').replace(/-{1,2}$/, '')
    : target.value.replace(/[^0-9]/g, '');
};