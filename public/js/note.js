const getSearchParameters = () => {
    let prmstr = window.location.search.substr(1);
    return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

const transformToAssocArray = prmstr => {
    let params = {};
    let prmarr = prmstr.split("&");
    
    for (let i = 0; i < prmarr.length; i++) {
        let tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    
    return params;
}

const params = getSearchParameters();

const notes = JSON.parse(localStorage.getItem('notes'))
const editNote = []

notes.forEach(note => {
    if (note[2] === params.id) {
        for (let x = 0; x < note.length; x++) {
            editNote.push(note[x])
        }
    }
})

document.querySelector('#createdAt').innerHTML = 'Created at: ' + editNote[1]
document.querySelector('input').value = editNote[0]

document.querySelector('#saveChanges').addEventListener('click', () => {
    notes.forEach(note => {
        if (note[2] === params.id) {
            let index = notes.indexOf(note);

            if (index !== -1) {
                notes[index][0] = document.querySelector('input').value;
            }
        }
    });

    localStorage.setItem('notes', JSON.stringify(notes));
    window.location.href = '/';
});

document.querySelector('#deleteNote').addEventListener('click', () => {
    notes.forEach(note => {
        let index = notes.indexOf(note)

        if (note[2] === params.id) {
            notes.splice(index, 1)
        }
    });

    localStorage.setItem('notes', JSON.stringify(notes));
    window.location.href = '/';
}); 