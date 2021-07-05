import galleryItems from './app.js';

const galleryRef = document.querySelector('.gallery');
const modalRef = document.querySelector('div.lightbox');
const lightboxImageRef = document.querySelector('.lightbox__image');
const closeBtnRef = document.querySelector('.lightbox__button');

//вызов функции согздания галереи
addMarkupToGallery();

galleryRef.addEventListener('click', onImgClick);

//описание функции создания разметки
function createMarkupElementGallery(elements) {
    return elements.map(({preview, original, description}) => {
        return `
            <li class="gallery__item">
                
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
    if (!e.target.classList.contains('gallery__image')) {
        return;
    }

    const urlBigImg = e.target.dataset.source;
    const altBigImg = e.target.alt;

    console.log(urlBigImg, altBigImg);

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
    closeBtnRef.addEventListener('click', ()=>modalRef.classList.remove('is-open'));
}

//функция установки большого изображения
function instalBgImgOnFullSkrin(url, alt) {
    lightboxImageRef.src = url;
    lightboxImageRef.alt = alt;
}