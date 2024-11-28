'use strict';

async function comments() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/comments');
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        let json = await response.json();
        return json;
    } catch(error) {
        alert(error);
        return false;
    }
}

window.addEventListener('load', () => {
    let json = comments();
    if (json) {
    console.log(json);
    
    let preloader = document.getElementsByClassName('main__preloader')[0];
    preloader.style.display = 'none';
    }

})