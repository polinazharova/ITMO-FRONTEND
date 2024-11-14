form = document.getElementById('сonstruct-form');
checkboxes = document.getElementsByClassName('check-done');

musicNamesStorage = [];

count = 0;
listened = 0;

function cardCreation(text) {
    cards = document.getElementById('cards');

    card = document.createElement('div');
    card.className = 'card';

    radio_done = document.createElement('input');
    radio_done.className = 'check-done';
    radio_done.setAttribute('type', 'checkbox');
    radio_done.setAttribute('name', 'done-not');
    radio_done.setAttribute('id', 'done' + count);
    card.appendChild(radio_done);


    albumSongName = document.createElement('span');
    albumSongName.className = 'album-song-name';
    albumSongName.textContent = text;
    card.appendChild(albumSongName);

    cards.prepend(card);

    count++;

    radioListener(radio_done);
}

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

if (localStorage.length > 0) {

    if (localStorage.getItem('musicNames')) {
        musicNamesStorage = JSON.parse(localStorage.getItem('musicNames'));
    }

    for (i = 0; i < musicNamesStorage.length; i++) {
        cardCreation(musicNamesStorage[i]);
    }

    document.getElementById('all').textContent = `Всего: ${count}`;

    Array.from(checkboxes).forEach(checkbox => {
        isChecked = localStorage.getItem(checkbox.id) === 'true';

        checkbox.checked = isChecked;

        if (isChecked) {
            listened++;
        }
    })

    document.getElementById('listened').textContent = `Прослушано: ${listened}`;
}

form.addEventListener('submit', event => {
    event.preventDefault();
    event.stopPropagation(); 
    
    const formData = new FormData(form);

    cardCreation(formData.get('listento'));

    document.getElementById('all').textContent = `Всего: ${count}`;

    musicNamesStorage.push(formData.get('listento'));
    localStorage['musicNames'] = JSON.stringify(musicNamesStorage);
});