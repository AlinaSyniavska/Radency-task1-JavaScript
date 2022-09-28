import {noteHeaderHtml, statHeaderHtml} from "./htmlTemplates.js";
import {noteCategory, noteStatus} from "./constants.js";
import {countStatus, formatDate} from "./helpers.js";
import {addEventAllBtnArch, addEventAllBtnEdit, addEventAllBtnTrash, addEventAllBtnUnzip} from "./eventListeners.js";

export const renderNotes = (arr, objDOM) => {
    const {notesContainer, archNotesContainer, statsContainer} = objDOM;

    notesContainer.innerHTML = noteHeaderHtml;
    archNotesContainer.innerHTML = '';

    arr.forEach(item => {
        if (item.noteStatus !== noteStatus.DELETED) {
            const note = document.createElement('div');
            note.classList.add('note', 'noteItem');
            note.setAttribute('data-id', item.id);

            const noteName = document.createElement('div');
            noteName.classList.add('noteName');

            switch (item.category) {
                case 'Task':
                    noteName.innerHTML = '<i class="fa-solid fa-calendar-check"></i>' + item.name
                    break;
                case 'Random Thought':
                    noteName.innerHTML = '<i class="fa-solid fa-head-side-virus"></i>' + item.name
                    break;
                case 'Idea':
                    noteName.innerHTML = '<i class="fa-solid fa-lightbulb"></i>' + item.name
                    break;
                default:
                    noteName.innerHTML = '<i class="fa-sharp fa-solid fa-clipboard-list-check"></i>' + item.name
            }

            const noteCreated = document.createElement('div');
            noteCreated.classList.add('noteCreated');
            noteCreated.innerText = formatDate(item.created);

            const noteCategory = document.createElement('div');
            noteCategory.classList.add('noteCategory');
            noteCategory.innerText = item.category;

            const noteContent = document.createElement('div');
            noteContent.classList.add('noteContent');
            noteContent.innerText = item.content;

            const noteDates = document.createElement('div');
            noteDates.classList.add('noteDates');
            noteDates.innerText = item.dates.map(i => formatDate(i)).join('; ');

            const btnControl = document.createElement('div');
            btnControl.classList.add('btnControl');

            const btnEdit = document.createElement('div');
            btnEdit.classList.add('btnEdit');
            btnEdit.innerHTML = '<i class="fa-solid fa-pen"></i>'
            const btnArch = document.createElement('div');
            btnArch.classList.add('btnArch');
            btnArch.innerHTML = '<i class="fa-solid fa-file-zipper"></i>'
            const btnTrash = document.createElement('div');
            btnTrash.classList.add('btnTrash');
            btnTrash.innerHTML = '<i class="fa-solid fa-trash"></i>'

            if (item.noteStatus === noteStatus.ACTIVE) {
                btnControl.append(btnEdit, btnArch, btnTrash);
            } else if (item.noteStatus === noteStatus.ARCHIVED) {
                btnControl.append(btnArch);
            }

            note.append(noteName, noteCreated, noteCategory, noteContent, noteDates, btnControl);
            if (item.noteStatus === noteStatus.ACTIVE) {
                notesContainer.appendChild(note);
            } else if (item.noteStatus === noteStatus.ARCHIVED) {
                archNotesContainer.appendChild(note);
            }
        }
    })

    addEventAllBtnTrash(getDOMButtons(), arr, objDOM);
    addEventAllBtnArch(getDOMButtons(), arr, objDOM);
    addEventAllBtnEdit(getDOMButtons(), arr, objDOM);
    addEventAllBtnUnzip(getDOMButtons(), arr, objDOM);

    renderStatistics(noteCategory, arr, statsContainer);
}

export const renderStatistics = (categories, arr, container) => {
    container.innerHTML = statHeaderHtml;

    for (const [, value] of Object.entries(categories)) {
        const note = document.createElement('div');
        note.classList.add('note', 'noteItem');

        const noteCategory = document.createElement('div');
        noteCategory.classList.add('noteName');

        switch (value) {
            case 'Task':
                noteCategory.innerHTML = '<i class="fa-solid fa-calendar-check"></i>' + value
                break;
            case 'Random Thought':
                noteCategory.innerHTML = '<i class="fa-solid fa-head-side-virus"></i>' + value
                break;
            case 'Idea':
                noteCategory.innerHTML = '<i class="fa-solid fa-lightbulb"></i>' + value
                break;
            default:
                noteCategory.innerHTML = '<i class="fa-sharp fa-solid fa-clipboard-list-check"></i>' + value
        }

        const actCount = document.createElement('div');
        actCount.classList.add('noteContent');
        actCount.innerText = countStatus(value, noteStatus.ACTIVE, arr);
        const archCount = document.createElement('div');
        archCount.classList.add('noteContent');
        archCount.innerText = countStatus(value, noteStatus.ARCHIVED, arr);

        note.append(noteCategory, actCount, archCount);
        container.appendChild(note);
    }
}

function getDOMButtons() {
    const btnTrash = document.querySelectorAll('.noteItem > .btnControl > .btnTrash');
    const btnArch = document.querySelectorAll('.notesContainer > .noteItem > .btnControl > .btnArch');
    const btnEdit = document.querySelectorAll('.notesContainer > .noteItem > .btnControl > .btnEdit');
    const btnUnzip = document.querySelectorAll('.archNotesContainer > .noteItem > .btnControl > .btnArch');

    return {
        btnTrash,
        btnArch,
        btnEdit,
        btnUnzip,
    };
}
