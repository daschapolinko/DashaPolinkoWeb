var sources = [
    'img/services/serv-1.svg',
    'img/services/serv-2.svg',
    'img/services/serv-3.svg',
    'img/services/serv-4.svg',
    'img/services/serv-5.svg',
    'img/services/serv-6.svg',
    'img/services/serv-7.svg',
    'img/services/serv-8.svg',
    'img/services/serv-1.svg',
    'img/services/serv-2.svg',
    'img/services/serv-3.svg'
];

const body = document.body;
var templateItem = document.querySelector('#services__item').content;
var item = templateItem.querySelector('.services__item');
var templateItemClone = document.querySelector('#services__item--clone').content;
var itemClone = templateItemClone.querySelector('.services__item');
var templateSwiper = document.querySelector('#swiper-slide').content;
var slideT = templateSwiper.querySelector('.swiper-slide');
var galeryItem = document.querySelector('.services__galery');
var galeryItems = document.querySelector('.services__galery-container');
var galerySwiper = document.querySelector('.swiper-wrapper');

var service_btn = body.querySelector('.services__button')

const breakpointSwiper = window.matchMedia('(max-width: 767px)');
const swiper = body.querySelector('.swiper')
let sliders, galeryWidth, servicesCount

function findGaleryWidth() {
    if (galeryItems.classList.contains('hidden-element')) {
        galeryWidth = galerySwiper.offsetWidth;
    } else {
        galeryWidth = galeryItem.offsetWidth;
    }
    servicesCount = Math.floor(galeryWidth / 234) * 2;
    createGalery();
    console.log(galeryWidth, servicesCount);
}

function addService(source) {
    var service = item.cloneNode(true);
    img = service.querySelector('.services__logo');
    img.src = source;
    galeryItem.appendChild(service);
}

function addServiceClone() {
    var service = itemClone.cloneNode(true);
    service.classList.add('invisible-element')
    galeryItem.appendChild(service)
}

function addSlide(source) {
    var slide = slideT.cloneNode(true);
    var service = item.cloneNode(true);
    img = service.querySelector('.services__logo');
    img.src = source;
    slide.appendChild(service);
    galerySwiper.appendChild(slide);
}

function createGalery() {
    if (breakpointSwiper.matches) {
        if (galerySwiper.children.length == 0) {
            for (var i = 0; i < sources.length; i++) {
                addSlide(sources[i]);
            };
        }
        galeryItems.classList.add('hidden-element')
        swiper.classList.remove('hidden-element')
        while (galeryItem.children.length > 0) {
            galeryItem.children[0].remove();
        }
        sliders = new Swiper('.swiper', {
            direction: 'horizontal',
            spaceBetween: 16,
            centeredSlides: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        });
    } else {
        if (swiper.classList.contains('swiper-initialized')) {
            for (slider of sliders.slides) {
                slider.remove()
            };
            if (swiper) { sliders.destroy(false, false); }
            swiper.classList.add('hidden-element')
            galeryItems.classList.remove('hidden-element')
        };
        if (service_btn.textContent != 'Скрыть' && galeryItem.children.length != servicesCount) {
            if (galeryItem.children.length > servicesCount) {
                while (galeryItem.children.length > servicesCount) {
                    galeryItem.children[galeryItem.children.length - 1].remove();
                }
            } else {
                for (var i = galeryItem.children.length; i < servicesCount; i++) {
                    addService(sources[i]);
                };
            }
        }
    }
};

findGaleryWidth();

window.addEventListener('resize', findGaleryWidth)

service_btn.addEventListener('click', function(evt) {
    console.log(galeryWidth, servicesCount)
    if (service_btn.textContent == 'Показать все') {
        for (var i = servicesCount; i < sources.length; i++) {
            addService(sources[i]);
        };
        if (galeryItem.children.length % (servicesCount / 2) != 0) {
            for (var i = 0; i < galeryItem.children.length % (servicesCount / 2); i++) {
                addServiceClone();
            }
        }
        service_btn.textContent = 'Скрыть';
        service_btn.classList.toggle('reverse-button');
    } else {
        while (galeryItem.children.length > servicesCount) {
            galeryItem.children[galeryItem.children.length - 1].remove();
        }
        service_btn.textContent = 'Показать все';
        service_btn.classList.toggle('reverse-button');
    }
})