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
const editIcon = document.getElementById('edit-icon');


let notes = [];
let isEdit = false;
let toEdit = 0;

// open/ close the modal
function closeModal(){
    modalContainer.classList.remove('show-modal');
    modalTextContentEl.value = '';
}
function openModal(){
    modalContainer.classList.add('show-modal');
    modalTextContentEl.focus();
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
// save the edited note
const saveChanges = (e) => {    
    e.preventDefault(); 
    notes[toEdit].content = modalTextContentEl.value;
    console.log('saved',modalTextContentEl.value);
    localStorage.setItem('notes', JSON.stringify(notes));
    notes = JSON.parse(localStorage.getItem('notes'));
    buildNoteContainer();
    isEdit = false;
    closeModal();
}

// edit note
const editNote = (time) => {
    console.log('in edit');
    isEdit = true;
    let text = '';
    const len = notes.length;
    let i = 0;
    for(i = 0; i < len; i++){
        if(notes[i].time === JSON.parse(time)){
            text = notes[i].content;
            console.log(text);
            toEdit = i;
            break;
        }
    }
    modalTextContentEl.value = text;
    openModal();
    
}


// creating the notes from the local storage
function buildNoteContainer(){
    allNotes.textContent = '';
    if(localStorage.getItem('notes')){
        notes = JSON.parse(localStorage.getItem('notes'));
    }
    notes.forEach((note) => {
        // div container
        const container = document.createElement('div');
        container.classList.add('container');
        container.setAttribute('id','note-container');
        // edit
        const edit = document.createElement('i');
        edit.classList.add('fas');
        edit.classList.add('fa-marker');
        edit.setAttribute('id', 'edit-icon');
        edit.setAttribute('onclick', `editNote('${note.time}')`);
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
        container.append(i,edit,h2);
        allNotes.appendChild(container);
    });

}

// store notes in local storage
const storeData = (e) => {
    e.preventDefault();
    console.log('storing');
    if(!modalTextContentEl.value) return false;
    const note = {
        time: Date.now(),
        content:  modalTextContentEl.value,
    };

    if(localStorage.getItem('notes')){
        notes = JSON.parse(localStorage.getItem('notes'));
    }
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));

    buildNoteContainer();
    form.reset();
    closeModal();
}

// event handler for dubmiting form
const handler = (e) =>{
    isEdit ? saveChanges(e) : storeData(e);
}

form.addEventListener('submit', handler);

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