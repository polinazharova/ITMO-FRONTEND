'use strict';

function addSlider(img, figcap) {
    const sliderLi = document.getElementById('jc-slider__li-tmpl').content.cloneNode(true);
    const image = sliderLi.querySelector('.jc-animation__cover');
    image.setAttribute('src', img);

    const figcaption = sliderLi.querySelector('.jc-animation__caption');
    figcaption.textContent = figcap;

    const ul = document.querySelector('.jc-slider');
    ul.append(sliderLi);
}

//дожидаемся загрузки дома
document.addEventListener('DOMContentLoaded', () => {
    //массив src
    let imgURLS = ['https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/b4/b7/09/b4b70982-7c17-723c-a4f0-8cf8a1a1c98f/24UMGIM94806.rgb.jpg/1200x1200bf-60.jpg', 'https://the-flow.ru/uploads/images/catalog/element/6740bc2fa13b4.jpg', 'https://the-flow.ru/uploads/images/catalog/element/673665a28e056.jpg', 'https://i0.wp.com/live-metal.com/wp-content/uploads/2024/11/Poppy_Album_Art_1x1_01-1.jpg?fit=736%2C736&ssl=1', 'https://upload.wikimedia.org/wikipedia/ru/c/c6/Songs_of_a_Lost_World_the_Cure.jpg', 'https://the-flow.ru/uploads/images/catalog/element/672de7ea6220c.jpg', 'https://images.genius.com/f5cdcf47c99164ccade3d5af81d44138.1000x1000x1.png'];
    //массив кэпшенов
    let figcaps = ['Gwen Stefani — Bouquet', 'Kendrick Lamar — GNX', 'Saluki — Bolshie Kurtki', 'Poppy — Negative Spaces', 'The Cure — Songs of a Lost World', 'Ferg — Darold', 'Egor Kreed - Меньше чем три (<3)'];

    try {
        for (let i = 0; i < imgURLS.length; i++) {
            //создаем слайдер с заданным src для img и textcontent для figcaption
            addSlider(imgURLS[i], figcaps[i]);
        }
    } catch(error) {
        console.log(error);
    }

})

window.addEventListener('load', () => { 
    //$('.jc-slider') синтаксис jquery === document.querySelector('.jc-slider'), .jcSlider() - функция библиотеки, 
    //создающая анимацию для слайдера. в {} указываем параметры анимации. (loop = true, stopOnHover = true по умолчанию)
    try {
        $('.jc-slider').jcSlider({
            animationIn: 'flipInX',
            animationOut: 'bounceOutLeft',
        }); 
    } catch(error) {
        console.log(error);
    }
     
    const currentLocation = document.location.href;
    const menuLinks = document.querySelectorAll('.main-navigation__year-link');
    menuLinks.forEach(link => {
       if (link.href === currentLocation) {
           link.classList.add('main-navigation__year-link_active');
       }
   });
});