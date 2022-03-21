const addNoteBtn = document.getElementById('add-note');
const noteContainer = document.getElementById('note-container');
const closeIcon = document.getElementById('close-icon');
const noteCloseIcon = document.getElementById('close-note');
const insideText = document.getElementById('inside-text');
const saveBtn = document.getElementById('saveBtn');
const modalContainer = document.getElementById('modal-container');
const modalTextContentEl = document.getElementById('note');
const form = document.getElementById('form');
const allNotes = document.getElementById('all-notes');


let notes = [];


// open/ close the modal
function closeModal(){
    modalContainer.classList.remove('show-modal');
}
function openModal(){
    modalContainer.classList.add('show-modal');
}

// deleting the note
function deleteNote(id){
    notes = JSON.parse(localStorage.getItem('notes'));
    notes.forEach((note, i) => {
        if(note.time === JSON.parse(id)){
            notes.splice(i, 1);
        }
      
    });
    localStorage.setItem('notes', JSON.stringify(notes));
    buildNoteContainer();
}

// creating the notes from the local storage
function buildNoteContainer(){
    allNotes.textContent = '';
    notes = JSON.parse(localStorage.getItem('notes'));
    notes.forEach((note) => {
        // div container
        const container = document.createElement('div');
        container.classList.add('container');
        container.setAttribute('id','note-container');
        // i / x icon
        const i = document.createElement('i');
        i.classList.add('fas');
        i.classList.add('fa-times');
        i.setAttribute('id', 'close-icon');
        i.setAttribute('onclick', `deleteNote('${note.time}')`);
        

        // h2 inside text
        const h2 = document.createElement('h2');
        h2.setAttribute('id', 'inside-text');
        h2.textContent = note.content;

        // appending
        container.append(i,h2);
        allNotes.appendChild(container);
    });

}

// store notes in local storage
function storeData(e){
    e.preventDefault();
    if(!modalTextContentEl.value) return false;
    const note = {
        time: Date.now(),
        content:  modalTextContentEl.value,
    };

    if(localStorage.getItem('notes')){
        notes = JSON.parse(localStorage.getItem('notes'));
        notes.push(note);
    } else {
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
 
    
    localStorage.setItem('notes', JSON.stringify(notes));

    buildNoteContainer();
    form.reset();
    closeModal();
}

form.addEventListener('submit', storeData);

window.addEventListener('click', (e) => {
    if(e.target === modalContainer){
        closeModal();
    }    
});







addNoteBtn.addEventListener('click', openModal);
noteCloseIcon.addEventListener('click', closeModal);


// if(closeIcon){
//     closeIcon.addEventListener('click', (e) => {
//         console.log('fddd');
//     });
// }

// on load
buildNoteContainer();