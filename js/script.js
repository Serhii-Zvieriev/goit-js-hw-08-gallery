import galleryItems from './app.js';

const galleryRef = document.querySelector('.gallery');
const modalRef = document.querySelector('div.lightbox');
const lightboxImageRef = document.querySelector('.lightbox__image');
const closeBtnRef = document.querySelector('.lightbox__button');
const overlayRef = document.querySelector('div.lightbox__overlay');

//ссылка на массив оригинальных изображений
const arrayOriginalImg = galleryItems.map((elements) => elements.original);

//вызов функции создания галереи
addMarkupToGallery();

//вызов кастомый слайдер
customsSlider();

// instalBgImgOnFullSkrin(customsSlider())

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
}

//функция листать изображения стрелками - я не знаю как сделать чтобы стрелка в право листала по одно картинке а не до конца массива, если бы forEach поддерживал break я думаю это бы помогло, но он не поддреживате =(
function customsSlider() {
    window.addEventListener('keydown', (e) => {
        galleryItems.forEach((el, index, arr) => {
            if (el.original === lightboxImageRef.src) {
                if (e.key === "ArrowLeft") {
                //     let a;
                //     let b;
                //     if (index === 0) {
                //         a = arr[arr.length - 1].original.toString();
                //         b = arr[arr.length - 1].description.toString();
                //     } else {
                //         a = arr[index - 1].original.toString();
                //         b = arr[index - 1].description.toString();
                //     }
                //     console.log(a, b);
                //     return a, b;
                     index === 0
                        ? instalBgImgOnFullSkrin(arr[arr.length-1].original, arr[arr.length - 1].description)
                        : instalBgImgOnFullSkrin(arr[index - 1].original, arr[index - 1].description);
                }
                if (e.key === "ArrowRight") {
                    if (index > arr.length-2) {
                        return;
                    }
                    index === arr[arr.length-1]
                        ? instalBgImgOnFullSkrin(arr[0].original, arr[0].description)
                        : instalBgImgOnFullSkrin(arr[index + 1].original, arr[index + 1].description);
                }
            }
        })
    });
}