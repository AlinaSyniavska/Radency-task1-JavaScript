const notesArray = [
    {
        name: 'Shopping List',
        created: '2022, 9, 25',
        category: 'Task',
        content: 'Milk, cheese, cakes',
        dates: [],
    },
    {
        name: 'Health Hackathon',
        created: '2022, 9, 29',
        category: 'Random Thought',
        content: 'Health Hackathon is an event where you will solve challenges and create new innovative products for health and healthcare!',
        dates: ['2022, 8, 29', '2022, 9, 5'],
    },
    {
        name: 'New Travel',
        created: '2022, 10, 1',
        category: 'Idea',
        content: 'New Travel',
        dates: [],
    },
    {
        name: 'Dynamic Talks',
        created: '2022, 9, 23',
        category: 'Idea',
        content: 'The event will be held in English',
        dates: ['2022, 8, 23', '2022, 8, 30'],
    },
    {
        name: 'Books',
        created: '2022, 9, 25',
        category: 'Task',
        content: 'JavaScript for impatient programmers',
        dates: [],
    },
    {
        name: ' Webinar “Devops — More than the tools and tech”',
        created: '2022, 10, 10',
        category: 'Task',
        content: 'Developers Shore are announcing a webinar — “Devops — More than the tools and tech” with Martin Comstedt',
        dates: [],
    },
    {
        name: 'NASA Open APIs',
        created: '2022, 9, 25',
        category: 'Task',
        content: 'View NASA Open APIs',
        dates: [],
    },
];

const categoryIcons = [
    ['fa-sharp', 'fa-solid', 'fa-clipboard-list-check'], // Task
    'fa-solid fa-head-side-heart', // Random Thought
    'fa-solid fa-lightbulb-exclamation-on', // Idea
];

const notesContainer = document.getElementsByClassName('notesContainer')[0];

notesArray.forEach(item => {
    const note = document.createElement('div');
    note.classList.add('note', 'noteItem');

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

    btnControl.append(btnEdit, btnArch, btnTrash);
    note.append(noteName, noteCreated, noteCategory, noteContent, noteDates, btnControl);
    notesContainer.appendChild(note);
})


// HELPERS
function formatDate(date) {
    const formatDate = new Date(date)
        .toDateString()
        .split(' ')
        .slice(-3)
        .join(' ');

    return formatDate.substring(0, formatDate.length - 5).concat(', ') + formatDate.substring(formatDate.length, formatDate.length - 4);
}
