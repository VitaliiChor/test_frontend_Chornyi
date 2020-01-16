const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const favorImgBlock = document.getElementById('favorite-img-block');
const savedImg = document.getElementById('favor-save-img');

let id = 0;
let photos = [];

fetch('https://picsum.photos/v2/list?page=2&limit=100')
    .then(data => {
        return data.json();
    })
    .then(data => {
        photos = data;
    })

function next() {
    id = id + 1;
    if (id == 100) {
        return
    }
    dynamicUrl()
}
function prev() {
    id = id - 1;
    if (id == 0) {
        return
    }
    dynamicUrl()
}

let img = document.getElementById('image-id');

function dynamicUrl() {

    let srcLink = photos[id].download_url;
    img.src = srcLink;
}

//Show more photos and add them to favorite
let moreImgBlock = document.getElementById('more-img-block');
let moreImgBtn = document.getElementById('more-img-btn');


moreImgBtn.addEventListener('click', function () {
    for (let i = 0; i < 10; i++) {
        next();
        let newImg = document.createElement('img');
        newImg.id = 'new-img';
        newImg.className = 'fav-img';
        newImg.style.cursor = 'pointer';
        newImg.title = 'Click to add in favorite';
        let srcLink = photos[id].download_url;
        newImg.src = srcLink;
        moreImgBlock.appendChild(newImg);
        
        newImg.addEventListener('click', function () {
            favorImgBlock.appendChild(newImg);
            savedImg.style.display = 'block';
        })
    }
    document.getElementById('main-img').remove();
})

function newPage() {
    let view = window.open();
    let favoriteImages = document.querySelector('.favorite-images');
    view.document.write(favoriteImages.innerHTML);
};

document.getElementById('delete-btn').addEventListener('click', function () {
    while (favorImgBlock.firstChild) {
        favorImgBlock.removeChild(favorImgBlock.firstChild)
    }
})