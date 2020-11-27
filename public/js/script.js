if (localStorage.getItem('notes') !== null) {
    document.querySelector('select').value = 'sortRecentlyAdded'
    
    const addNote = (note) => {
        const p = document.createElement('p');
        const noteName = document.createElement('span');
        const noteTime = document.createElement('small');
        const edit = document.createElement('a');

        noteName.innerHTML = note[0];
        noteName.setAttribute('class', 'noteName');
        noteTime.innerHTML = note[1];
        noteTime.setAttribute('class', 'noteTime');
        edit.innerHTML = '<i class="fas fa-edit"></i>'
        edit.setAttribute('href', `/note?id=${note[2]}`)

        p.innerHTML = noteName.outerHTML + edit.outerHTML + '<br>' + noteTime.outerHTML + '<br>'; 
        document.querySelector('#notes').append(p);
    }

    const getTimeInFormat = () => {
        let date = new Date(),
            curr_date = date.getDate(),
            curr_month = date.getMonth() + 1,
            curr_year = date.getFullYear(),
            curr_time = date.toTimeString().split(' ')[0];

        return curr_date + '/' + curr_month + '/' + curr_year + ' ' + curr_time;
    }

    const generateUuid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const sortRecentlyAdded = (notes) => {
        for (let x = 0; x < notes.length; x++) {
            for (let y = 0; y < notes.length; y++) {
                if (notes[y] < notes[y + 1]) {
                    let temp = notes[y];
                    notes[y] = notes[y + 1];
                    notes[y + 1] = temp;
                }
            }
        }
    }

    document.querySelector('#input').value = ''
    
    let notes = JSON.parse(localStorage.getItem('notes'));
    sortRecentlyAdded(notes)

    if (notes.length === 0) {
        const p = document.createElement('p');
        
        p.innerHTML = 'No notes...';
        p.style.textAlign = 'center'; 
        
        document.querySelector('#notes').append(p);
    } else {
        notes.forEach(note => {
            addNote(note);
        });
    }
    
    document.querySelector('#addNote').addEventListener('click', () => {
        let note = document.querySelector('#note').value;

        if (note.trim().length === 0 || note === '') {
            alert('Type your note!')
            return
        }

        let time = getTimeInFormat();
        let uuid = generateUuid();

        notes.push([note, time, uuid]);
        localStorage.setItem('notes', JSON.stringify(notes));
        
        document.querySelector('.close').click();
        window.location.reload();
    })

    document.querySelector('#input').addEventListener('input', () => {
        document.querySelector('#notes').innerHTML = '';

        if (notes.length === 0) {
            const p = document.createElement('p');
            
            p.innerHTML = 'No notes...';
            p.style.textAlign = 'center'; 
            
            document.querySelector('#notes').append(p);
        }

        notes.forEach(note => {
            if ((note[0].toLowerCase()).includes((document.querySelector('#input').value).toLowerCase())) {
                addNote(note)
            }
        });
    });

    document.querySelector('select').addEventListener('change', () => {
        if (document.querySelector('select').value == 'sortAlphabetically') {
            document.querySelector('#notes').innerHTML = ''
            
            notes = notes.sort((a, b) => {
                if (a[0].toUpperCase() < b[0].toUpperCase()) {
                    return -1;
                }
                else if (a[0].toUpperCase() > b[0].toUpperCase()) {
                    return 1;
                }
                else {
                    return 0;
                }
            });

            notes.forEach(note => {
                addNote(note)
            });

            notes = JSON.parse(localStorage.getItem('notes'));
        } else {
            document.querySelector('#notes').innerHTML = ''

            sortRecentlyAdded(notes)

            notes.forEach(note => {
                addNote(note)
            });
        }
      });
} else {
    localStorage.setItem('notes', JSON.stringify([]));
    
    const p = document.createElement('p');
    
    p.innerHTML = 'No notes...';
    p.style.textAlign = 'center';
    document.querySelector('#notes').append(p);
    
    window.location.reload();
}