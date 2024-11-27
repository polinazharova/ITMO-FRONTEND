'use strict';

const form = document.getElementById('сonstruct-form');

let count = 0;
let listened = 0;


if (localStorage.length > 0) {

    while (count < localStorage.getItem('count')) {

        cardCreation(localStorage.getItem('album-song-name' + count));

        let checkbox = document.getElementById('checkbox' + (count - 1));
        let isChecked = localStorage.getItem(checkbox.id) === 'true';
        checkbox.checked = isChecked;

        if (isChecked) {
            listened++;
        }
    }

    document.getElementById('all').textContent = `Всего: ${count}`;
    document.getElementById('listened').textContent = `Прослушано: ${listened}`;
}

function cardCreation(text) {
    let cards = document.getElementById('cards');
    let card = document.getElementById('tmpl_card').content.cloneNode(true);

    let checkbox = card.querySelector('.check-done');
    checkbox.setAttribute('id', 'checkbox' + count);

    let albumSongName = card.querySelector('.album-song-name');
    albumSongName.setAttribute('id', 'album-song-name' + count);
    albumSongName.textContent = text;

    let buttonDelete = card.querySelector('.buttonDelete');
    buttonDelete.setAttribute('id', 'buttonDelete' + count);

    cards.prepend(card);

    count++;

    radioListener(checkbox);
    buttonDeleteListener(buttonDelete);
}

form.addEventListener('submit', event => {
    event.preventDefault();
    event.stopPropagation(); 
    
    const formData = new FormData(form);
    event.target.reset();

    if (formData.get('listento').trim() === '') {
        alert('Некорректный ввод!');
        return;
    }

    cardCreation(formData.get('listento'));

    document.getElementById('all').textContent = `Всего: ${count}`;
    
    localStorage.setItem('album-song-name' + (count - 1), formData.get('listento')); 
    localStorage.setItem('count', count); 
});

function radioListener(radio_done) {
    radio_done.addEventListener('change', (event) => {
        event.stopPropagation();

        if (event.target.checked) {
            listened++;
        } else {
            listened--;
        }

        document.getElementById('listened').textContent = `Прослушано: ${listened}`;
        
        localStorage.setItem(event.target.id, event.target.checked); 
    });
}

function buttonDeleteListener(button) {

    button.addEventListener('click', (event) => {
        let card = document.getElementById('card' + event.target.id);
        musicNamesStorage.remove(event.target.id);
        localStorage.removeItem('checkbox' +  event.target.id);
    })
}
