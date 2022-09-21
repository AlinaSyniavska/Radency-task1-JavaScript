import {guid} from "../js/helpers.js";
import {noteStatus} from "../js/constants.js";

const form = document.forms.noteForm;
const btnSetNote = document.getElementById('btnSetNote');
const btnEditNote = document.getElementById('btnEditNote');
const btnClose = document.getElementById('btnClose');

btnSetNote?.addEventListener('click', () => {
    if (form.noteName.value === '' || form.noteCreateDate.value === '' || form.noteContent.value === '') {
        alert('Fill all fields!')
        return;
    }

    const newNote = {
        id: guid(),
        name: form.noteName.value,
        created: form.noteCreateDate.value,
        category: form.noteCategory.value,
        content: form.noteContent.value,
        dates: [],
        noteStatus: noteStatus.ACTIVE,
    }

    window.top.postMessage(newNote, '*')
})

btnClose?.addEventListener('click', () => {
    // window.parent.document.getElementById('newNoteWin').parentNode.removeChild(window.parent.document.getElementById('newNoteWin'))
    window.parent.document.getElementById('newNoteWin').classList.remove('visible')
})

