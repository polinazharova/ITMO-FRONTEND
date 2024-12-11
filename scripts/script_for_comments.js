'use strict';

async function getComments() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/comments/');
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
    const maxId = Math.floor(Math.random() * json.length);
    for (let i = maxId; i <= maxId + 100 && i < json.length; i++) {
        let comment = document.getElementById('tmpl_comment').content.cloneNode(true);

        let authorName = comment.querySelector('.comment__author-name');
        authorName.textContent = json[i]['name'];

        let commentText = comment.querySelector('.comment__text');
        commentText.textContent = json[i]['body'];

        document.getElementsByTagName('main')[0].append(comment);
    }
}

window.addEventListener('load', async () => {
    for (let i = 0 ; i < 5; i++) {
        let comment = document.getElementById('tmpl_comment').content.cloneNode(true);

        let authorName = comment.querySelector('.comment__author-name');
        authorName.textContent = 'Идет загрузка комментариев';

        let commentText = comment.querySelector('.comment__text');

        commentText.textContent = 'Тестовая версия, на случай, если как всегда не загрузится)))';

        document.getElementsByTagName('main')[0].append(comment);
    }
    const json = await getComments();

    let removeComments = document.querySelectorAll('.comment');

    Array.from(removeComments).forEach(element => {
        element.remove();
    });
    
    const preloader = document.getElementsByClassName('main__preloader')[0];
    preloader.style.display = 'none';  

    if (json) {
        showComments(json);
    } else {
        let error = document.getElementById('tmpl_error').content.cloneNode(true);
        document.getElementsByTagName('main')[0].append(error);
    }
})