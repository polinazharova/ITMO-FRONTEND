form = document.getElementById('сonstruct-form');
checkboxes = document.getElementsByClassName('check-done');

musicNamesStorage = [];

count = 0;
listened = 0;

if (localStorage.length > 0) {

    if (localStorage.getItem('musicNames')) {
        musicNamesStorage = JSON.parse(localStorage.getItem('musicNames'));
    }

    for (i = 0; i < musicNamesStorage.length; i++) {
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
        albumSongName.textContent = musicNamesStorage[i];
        card.appendChild(albumSongName);

        cards.prepend(card);

        count++;
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
    albumSongName.textContent = formData.get('listento');
    card.appendChild(albumSongName);
    
    cards.prepend(card);

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

    count++;
    document.getElementById('all').textContent = `Всего: ${count}`;

    musicNamesStorage.push(formData.get('listento'));
    localStorage['musicNames'] = JSON.stringify(musicNamesStorage);
});

for (i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', (event) => {
        event.stopPropagation();

        if (event.target.checked) {
            listened++;
        }
        else {
            listened--;
        }

        document.getElementById('listened').textContent = `Прослушано: ${listened}`;

        localStorage[event.target.id] = event.target.checked;
    });
}