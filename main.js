import {noteCategory, noteStatus} from './js/constants.js'
import {noteHeaderHtml, statHeaderHtml} from './js/htmlTemplates.js'
import {formatDate, countStatus, guid, getDate2Digits} from './js/helpers.js'

const notesArray = [
    {
        id: guid(),
        name: 'Shopping List',
        created: '2022, 9, 25',
        category: noteCategory.TASK,
        content: 'Milk, cheese, cakes',
        dates: [],
        noteStatus: noteStatus.ACTIVE,
    },
    {
        id: guid(),
        name: 'Health Hackathon',
        created: '2022, 9, 29',
        category: noteCategory.RANDOM_THOUGHT,
        content: 'Health Hackathon is an event where you will solve challenges and create new innovative products for health and healthcare!',
        dates: ['2022, 8, 29', '2022, 9, 5'],
        noteStatus: noteStatus.ACTIVE,
    },
    {
        id: guid(),
        name: 'New Travel',
        created: '2022, 10, 1',
        category: noteCategory.IDEA,
        content: 'New Travel',
        dates: [],
        noteStatus: noteStatus.ACTIVE,
    },
    {
        id: guid(),
        name: 'Dynamic Talks',
        created: '2022, 9, 23',
        category: noteCategory.IDEA,
        content: 'The event will be held in English',
        dates: ['2022, 8, 23', '2022, 8, 30'],
        noteStatus: noteStatus.ACTIVE,
    },
    {
        id: guid(),
        name: 'Books',
        created: '2022, 9, 25',
        category: noteCategory.TASK,
        content: 'JavaScript for impatient programmers',
        dates: [],
        noteStatus: noteStatus.ACTIVE,
    },
    {
        id: guid(),
        name: ' Webinar “Devops — More than the tools and tech”',
        created: '2022, 10, 10',
        category: noteCategory.TASK,
        content: 'Developers Shore are announcing a webinar — “Devops — More than the tools and tech” with Martin Comstedt',
        dates: [],
        noteStatus: noteStatus.ACTIVE,
    },
    {
        id: guid(),
        name: 'NASA Open APIs',
        created: '2022, 9, 25',
        category: noteCategory.TASK,
        content: 'View NASA Open APIs',
        dates: [],
        noteStatus: noteStatus.ACTIVE,
    },
];

const notesContainer = document.getElementsByClassName('notesContainer')[0];
const archNotesContainer = document.getElementsByClassName('archNotesContainer')[0];
const statContainer = document.getElementsByClassName('statisticContainer')[0];
const btnCreateNote = document.getElementById('btnCreateNote');
const iframe = document.getElementById('newNoteWin');
let index;

renderNotes(notesArray, notesContainer, archNotesContainer);

// FUNCTIONS
function renderNotes(arr, actContainer, archContainer) {
    actContainer.innerHTML = noteHeaderHtml;
    archContainer.innerHTML = '';

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
                actContainer.appendChild(note);
            } else if (item.noteStatus === noteStatus.ARCHIVED) {
                archContainer.appendChild(note);
            }
        }
    })

    addEventAllBtnTrash();
    addEventAllBtnArch();
    addEventAllBtnEdit();
    addEventAllBtnUnzip();

    renderStatistic(noteCategory, notesArray, statContainer);
}

function renderStatistic(categories, arr, container) {
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

function addEventAllBtnTrash() {
    const btnTrash = document.querySelectorAll('.noteItem > .btnControl > .btnTrash');
    btnTrash.forEach((btn) => {
        btn.addEventListener('click', () => {
            const idDeletedNote = btn.parentElement.parentElement.getAttribute('data-id');
            const indexDeletedNote = notesArray.findIndex(item => item.id === idDeletedNote);

            // notesArray.splice(indexDeletedNote, 1);
            notesArray[indexDeletedNote].noteStatus = noteStatus.DELETED;

            const note = document.querySelector(`[data-id="${idDeletedNote}"]`);
            note.remove();

            renderStatistic(noteCategory, notesArray, statContainer);
        })
    })
}

function addEventAllBtnArch() {
    const btnArch = document.querySelectorAll('.notesContainer > .noteItem > .btnControl > .btnArch');
    btnArch.forEach((btn) => {
        btn.addEventListener('click', () => {
            const idArchivedNote = btn.parentElement.parentElement.getAttribute('data-id');
            const indexArchivedNote = notesArray.findIndex(item => item.id === idArchivedNote);

            notesArray[indexArchivedNote].noteStatus = noteStatus.ARCHIVED;

            const note = document.querySelector(`[data-id="${idArchivedNote}"]`);
            note.remove();

            renderNotes(notesArray, notesContainer, archNotesContainer);
        })
    })
}

function addEventAllBtnEdit() {
    const btnEdit = document.querySelectorAll('.notesContainer > .noteItem > .btnControl > .btnEdit');
    btnEdit.forEach((btn) => {
        btn.addEventListener('click', () => {
            const idEditNote = btn.parentElement.parentElement.getAttribute('data-id');
            const editNote = notesArray.find(item => item.id === idEditNote);
            index = notesArray.findIndex(item => item.id === idEditNote);

            const dateForForm = editNote.created.split(', ');
            editNote.created = getDate2Digits(dateForForm).join('-')
            console.log(editNote.created)

            iframe.contentWindow.postMessage(editNote, '*');
            iframe.classList.add('visible');
        })
    })
}

function addEventAllBtnUnzip() {
    const btnUnzip = document.querySelectorAll('.archNotesContainer > .noteItem > .btnControl > .btnArch');

    btnUnzip.forEach((btn) => {
        btn.addEventListener('click', () => {

            const idArchivedNote = btn.parentElement.parentElement.getAttribute('data-id');
            const indexArchivedNote = notesArray.findIndex(item => item.id === idArchivedNote);

            notesArray[indexArchivedNote].noteStatus = noteStatus.ACTIVE;

            const note = document.querySelector(`[data-id="${idArchivedNote}"]`);
            note.remove();

            renderNotes(notesArray, notesContainer, archNotesContainer);
        })
    })
}

btnCreateNote.onclick = () => {
    iframe.classList.add('visible');
}

window.onmessage = function (event) {
    if ('id' in event.data && 'name' in event.data && 'created' in event.data && 'category' in event.data && 'content' in event.data && 'dates' in event.data && 'noteStatus' in event.data) {
        console.log(event.data);
        notesArray.push({...event.data});
    } else if ('name' in event.data && 'created' in event.data && 'category' in event.data && 'content' in event.data && 'dates' in event.data) {
        notesArray[index] = Object.assign(notesArray[index], {...event.data});
    }
    renderNotes(notesArray, notesContainer, archNotesContainer);
};




