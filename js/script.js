import galleryItems from './app.js';

const galleryRef = document.querySelector('.gallery');
const modalRef = document.querySelector('div.lightbox');
const lightboxImageRef = document.querySelector('.lightbox__image');
const closeBtnRef = document.querySelector('.lightbox__button');
const overlayRef = document.querySelector('div.lightbox__overlay');

//индекс большой картинки
let indexBigImg;

//ссылка на массив оригинальных изображений
const arrayOriginalImg = galleryItems.map((elements) => elements.original);

//вызов функции создания галереи
addMarkupToGallery();

//вызов кастомый слайдер
customsSlider();

//вешаю слушатель событий на галерею
galleryRef.addEventListener('click', onImgClick);

//описание функции создания разметки
function createMarkupElementGallery(elements) {
    return elements.map(({preview, original, description}) => {
        return `
            <li class="gallery__item">
                <a
                    class="gallery__link"
                    //href="${preview}"
                >
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
                </a>
            </li>
        `;
    }).join('');
}

//описание функции добавления разметки
function addMarkupToGallery() {
    const imgMarkup = createMarkupElementGallery(galleryItems);
    galleryRef.insertAdjacentHTML('afterbegin', imgMarkup);
}

//описание функции нажатия на картинку
function onImgClick(e) {
    console.dir(e.target);
    e.preventDefault();

    if (e.target.nodeName !== 'IMG') {
        return;
    }

    //проверка на то чтобы в src мы не записывали ту же инфу что уже там
    if (!arrayOriginalImg.includes(e.target.dataset.source)) {
        return;
    };
   
    const urlBigImg = e.target.dataset.source;
    const altBigImg = e.target.alt;

    openModal();
    instalBgImgOnFullSkrin(urlBigImg, altBigImg);
    closeModal();
}

//функция открытия модалки
function openModal() {
    modalRef.classList.add('is-open');
}

//функция закрытия модалки
function closeModal() {
    closeBtnRef.addEventListener('click', () => modalRef.classList.remove('is-open'), {once: true});
    overlayRef.addEventListener('click', () => modalRef.classList.remove('is-open'), {once: true});
    window.addEventListener('keydown', (e) => {
        if (e.key !== "Escape") {
            return;
        }
        modalRef.classList.remove('is-open')
     }, {once: true});
}

//функция установки большого изображения
function instalBgImgOnFullSkrin(url, alt) {
    lightboxImageRef.src = url;
    lightboxImageRef.alt = alt;
    indexBigImg = arrayOriginalImg.indexOf(url);
    console.log(indexBigImg);
}

//изменяем индекс большой картинки на -1
function flipLeft() {
    indexBigImg===0 ? indexBigImg=8 : indexBigImg-=1;
}

// изменяем индекс большой картинки на +1
function flipRight () {
    indexBigImg===8 ? indexBigImg=0 : indexBigImg+=1;
}


//функция листать изображения стрелками - я не знаю как сделать чтобы стрелка в право листала по одно картинке а не до конца массива, если бы forEach поддерживал break я думаю это бы помогло, но он не поддреживате =(
function customsSlider() {
    window.addEventListener('keydown', (e) => {
        if (e.key === "ArrowLeft") {
            flipLeft();
            instalBgImgOnFullSkrin(galleryItems[indexBigImg].original, galleryItems[indexBigImg].alt);
            }
        if (e.key === "ArrowRight") {
            flipRight ();
            instalBgImgOnFullSkrin(galleryItems[indexBigImg].original, galleryItems[indexBigImg].alt);
            }
    });
}