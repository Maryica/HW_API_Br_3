
let currentPhotoId = '';

async function loadRandomPhoto() {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=L2yUN7mwgWszmwnHHtYYo2U9cIb1SSrb4rnvukDvgZ4`);
        const data = await response.json();

        currentPhotoId = data.id;
        document.getElementById('photo').src = data.urls.regular;
        document.getElementById('author').textContent = `Автор: ${data.user.name}`;

        const likes = 0;
        const storedData = JSON.parse(localStorage.getItem(currentPhotoId));
        if (storedData) {
            likes = storedData.likes;
        } else {
            localStorage.setItem(currentPhotoId, JSON.stringify({
                id: currentPhotoId,
                url: data.urls.regular,
                author: data.user.name,
                likes: likes,
                lastViewed: new Date().toLocaleString()

            }));
        }
        updateLikeButton(likes);


    } catch (error) {
        console.error('Фото отсутствует', error);
    }
}

function likesUp() {
    const storedData = JSON.parse(localStorage.getItem(currentPhotoId));
    storedData.likes++;
    localStorage.setItem(currentPhotoId, JSON.stringify(storedData));
    updateLikeButton(storedData.likes);
}

function updateLikeButton(likes) {
    const likeBtn = document.getElementById('like-btn');
    likeBtn.textContent = `${likes} ${likes === 1 ? 'лайк' : 'лайков'}`;
}


document.getElementById('like-btn').addEventListener('click', likesUp);

loadRandomPhoto();