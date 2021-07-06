import galleryItems from './app.js';

const galleryRef = document.querySelector('.gallery');
const modalRef = document.querySelector('div.lightbox');
const lightboxImageRef = document.querySelector('.lightbox__image');
const closeBtnRef = document.querySelector('.lightbox__button');
const overlayRef = document.querySelector('div.lightbox__overlay');

//вызов функции создания галереи
addMarkupToGallery();

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

    // lightboxImageRef.addEventListener('clicl', (e)=>console.log(e.target));
}

//функция листать изображения стрелками
function customsSlider() {
     
    window.addEventListener('keydown', (e) => {
        if (e.key !== "ArrowLeft") {
            return;
        }
        console.log(lightboxImageRef.src);

        galleryItems.forEach((el, index) => {
            if (el.preview === lightboxImageRef.src)
            {
                console.log(el.preview);
                console.log(lightboxImageRef.src);
                console.log(index);
            }
            
        })
        // instalBgImgOnFullSkrin('https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg', 'Hokkaido Flower');
     });
    
    //  window.addEventListener('keydown', (e) => {
    //     if (e.key !== "ArrowRight") {
    //         return;
    //     }
    //     modalRef.classList.remove('is-open')
    //  }, {once: true});
    window.addEventListener('keydown', (e)=>console.dir(e))
}

customsSlider()