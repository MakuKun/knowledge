
// Соц.сети при нажатии
const btnSocialNetwork = document.querySelector('.social');
const headerCallMe = document.querySelector('.header_call_me');

btnSocialNetwork.addEventListener('click', function(){
    headerCallMe.classList.toggle('active');
})

// Бургер меню
const btnBurger = document.querySelector('.burger');
const burgerBack = document.querySelector('.burger_back');
const burgerMenu = document.querySelector('.burger_menu');

function burgerOpen(){
    btnBurger.classList.toggle('active');
    burgerBack.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    document.body.classList.toggle('lock');
}

btnBurger.addEventListener('click', function() {
    burgerOpen();
}); 



// "Связаться со мной"

const callMe = document.querySelector('.call');
const closeBtnCall = document.querySelector('.close_btn_call');
const callMeLink = document.querySelector('.call_link');
const modalCallMe = document.querySelector('.modal_call_me');

callMe.addEventListener('click', function(){
    toggleTwoClasses(modalCallMe, "active", "noactive", 500);
    document.body.classList.add('lock');
});

callMeLink.addEventListener('click', function(){
    toggleTwoClasses(modalCallMe, "active", "noactive", 500);
    document.body.classList.add('lock');
    if(btnBurger.classList.contains('active')){
        document.body.classList.remove('lock');
        btnBurger.classList.remove('active');
        burgerBack.classList.remove('active');
        burgerMenu.classList.remove('active');
    }
});

function toggleTwoClasses(element, first, second, timeOfAnimation) {
  if (!element.classList.contains(first)) {
    element.classList.add(first);
    element.classList.remove(second);
  } else {
    element.classList.add(second);
    window.setTimeout(function() {
      element.classList.remove(first);
    }, timeOfAnimation);
  }
}

closeBtnCall.addEventListener('click', function(){
    toggleTwoClasses(modalCallMe, "active", "noactive", 500);
    document.body.classList.remove('lock');
})

window.onclick = function(event){
    if (event.target == modalCallMe) {
        toggleTwoClasses(modalCallMe, "active", "noactive", 500);
        document.body.classList.remove('lock');
    }
}

// плавная прокрутка к элементам

const menuList = document.querySelectorAll('.menu_link[data-goto]');

if (menuList.length > 0) {
    menuList.forEach(menuLinks => {
        menuLinks.addEventListener('click', onMenuLink);
    });

    function onMenuLink(link) {
        const menuLink = link.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('.header').offsetHeight;
            console.log(gotoBlockValue);
            if(btnBurger.classList.contains('active')){
                document.body.classList.remove('lock');
                btnBurger.classList.remove('active');
                burgerBack.classList.remove('active');
                burgerMenu.classList.remove('active');
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth",
            });

            link.preventDefault();
        }
    }
}

////////////////////// albom_modal
const headerLogo = document.querySelector('.header_logo');
const modalLogo = document.querySelector('.modal_logo');
const closeBtnLogo = document.querySelector('.close_btn_logo');

headerLogo.addEventListener('click', function(){
    toggleTwoClasses(modalLogo, "active", "noactive", 500);
    document.body.classList.add('lock');
});

closeBtnLogo.addEventListener('click', function(){
    toggleTwoClasses(modalLogo, "active", "noactive", 500);
    document.body.classList.remove('lock');
})

window.onclick = function(event){
    if (event.target == modalLogo) {
        toggleTwoClasses(modalLogo, "active", "noactive", 500);
        document.body.classList.remove('lock');
    }
}

/////////////// slider_logo

/* Устанавливаем стартовый индекс слайда по умолчанию: */
let slideIndex = 1;
/* Вызываем функцию, которая реализована ниже: */
showSlides(slideIndex);

/* Увеличиваем индекс на 1 — показываем следующий слайд: */
function nextSlide() {
    showSlides(slideIndex += 1);
}

/* Уменьшаем индекс на 1 — показываем предыдущий слайд: */
function previousSlide() {
    showSlides(slideIndex -= 1);  
}

/* Устанавливаем текущий слайд: */
function currentSlide(n) {
    showSlides(slideIndex = n);
}

/* Функция перелистывания: */
function showSlides(n) {
    /* Обращаемся к элементам с названием класса "item", то есть к картинкам: */
    let slides = document.getElementsByClassName("item");
    
    /* Проверяем количество слайдов: */
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
  
    /* Проходим по каждому слайду в цикле for: */
    for (let slide of slides) {
        slide.style.display = "none";
    }
    /* Делаем элемент блочным: */
    slides[slideIndex - 1].style.display = "block";    
}


////// отправка формы

document.addEventListener('DOMContentLoaded', function(){
    const form = document.querySelector('.form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let formData = new FormData(form)


        let response = await fetch('mail.php', {
            method: 'POST',
            body: formData
        });
        if(response.ok) {
            let result = await response.json();
            alert(result.message);
            form.reset();
        } else {
            alert('Ошибка');
        }

    }
})