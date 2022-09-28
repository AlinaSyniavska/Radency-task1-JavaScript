import {noteCategory, noteStatus} from "./constants.js";
import {renderNotes, renderStatistics} from "./rendering.js";
import {getDate2Digits} from "./helpers.js";

export let updateNoteIndex;

export function addEventAllBtnTrash(objBtn, arr, objDOM) {
    objBtn.btnTrash.forEach((btn) => {
        btn.addEventListener('click', () => {
            const idDeletedNote = btn.parentElement.parentElement.getAttribute('data-id');
            const indexDeletedNote = arr.findIndex(item => item.id === idDeletedNote);

            arr[indexDeletedNote].noteStatus = noteStatus.DELETED;

            const note = document.querySelector(`[data-id="${idDeletedNote}"]`);
            note.remove();

            renderStatistics(noteCategory, arr, objDOM.statsContainer);
        })
    })
}

export function addEventAllBtnArch(objBtn, arr, objDOM) {
    objBtn.btnArch.forEach((btn) => {
        btn.addEventListener('click', () => {
            const idArchivedNote = btn.parentElement.parentElement.getAttribute('data-id');
            const indexArchivedNote = arr.findIndex(item => item.id === idArchivedNote);

            arr[indexArchivedNote].noteStatus = noteStatus.ARCHIVED;

            const note = document.querySelector(`[data-id="${idArchivedNote}"]`);
            note.remove();

            renderNotes(arr, objDOM);
        })
    })
}

export function addEventAllBtnEdit(objBtn, arr, objDOM) {
    objBtn.btnEdit.forEach((btn) => {
        btn.addEventListener('click', () => {
            const idEditNote = btn.parentElement.parentElement.getAttribute('data-id');
            const editNote = arr.find(item => item.id === idEditNote);
            updateNoteIndex = arr.findIndex(item => item.id === idEditNote);

            const dateForForm = editNote.created.split(', ');
            editNote.created = getDate2Digits(dateForForm).join('-')

            objDOM.iframe.contentWindow.postMessage(editNote, '*');
            objDOM.iframe.classList.add('visible');
        })
    })
}

export function addEventAllBtnUnzip(objBtn, arr, objDOM) {
    objBtn.btnUnzip.forEach((btn) => {
        btn.addEventListener('click', () => {

            const idArchivedNote = btn.parentElement.parentElement.getAttribute('data-id');
            const indexArchivedNote = arr.findIndex(item => item.id === idArchivedNote);

            arr[indexArchivedNote].noteStatus = noteStatus.ACTIVE;

            const note = document.querySelector(`[data-id="${idArchivedNote}"]`);
            note.remove();

            renderNotes(arr, objDOM);
        })
    })
}

