'use strict';

async function getComments() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/comments');
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        let json = await response.json();
        return json;
    } catch(error) {
        return false;
    }
}

function showComments(json) {
    const maxId = Math.random() * (400 - 0) + 0;
    for (let i = maxId; i <= maxId + 100; i++) {
        let comment = document.getElementById('tmlp_comment').content.cloneNode(true);

        let authorName = comment.querySelector('.comment__author-name');
        authorName.textContent = json[i]['name'];

        let commentText = comment.querySelector('.comment__text');
        commentText.textContent = json[i]['body'];
    }
}

window.addEventListener('load', async () => {
    let json = await getComments();
    if (json) {
        console.log(json);
        showComments(json);
    }
    else {
        alert('smth went wrong');
    }

    let preloader = document.getElementsByClassName('main__preloader')[0];
    preloader.style.display = 'none';  
})