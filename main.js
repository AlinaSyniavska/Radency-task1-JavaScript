import {noteCategory, noteStatus} from './js/constants.js';
import {guid} from './js/helpers.js';

import {updateNoteIndex} from "./js/eventListeners.js"
import {renderNotes} from "./js/rendering.js"

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
        dates: [],
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
        dates: [],
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
const statsContainer = document.getElementsByClassName('statisticContainer')[0];
const iframe = document.getElementById('newNoteWin');

const btnCreateNote = document.getElementById('btnCreateNote');

const objDOMElements = {
    notesContainer,
    archNotesContainer,
    statsContainer,
    iframe,
};

renderNotes(notesArray, objDOMElements);

btnCreateNote.onclick = () => {
    iframe.classList.add('visible');
}

window.onmessage = function (event) {
    if ('id' in event.data && 'name' in event.data && 'created' in event.data && 'category' in event.data && 'content' in event.data && 'dates' in event.data && 'noteStatus' in event.data) {
        notesArray.push({...event.data});
    } else if ('name' in event.data && 'created' in event.data && 'category' in event.data && 'content' in event.data && 'dates' in event.data) {
        notesArray[updateNoteIndex] = Object.assign(notesArray[updateNoteIndex], {...event.data});
    }
    renderNotes(notesArray, objDOMElements);
};




