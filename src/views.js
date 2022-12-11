import moment from 'moment'
import { getFilters } from './filters'
import { getNotes, sortNotes } from './notes'

const generateDomNote = (note) => {
    const noteEl = document.createElement("a");
    const textEle = document.createElement("p");
    const status = document.createElement('p')

    if (note.title.length === 0) {
        note.title = "Unnamed Note";
    }
    textEle.textContent = note.title;
    textEle.classList.add('list-item__title')
    noteEl.appendChild(textEle);

    noteEl.setAttribute("href", `edit.html#${note.id}`);
    noteEl.classList.add('list-item')

    status.textContent = generateLastEdited(note.updatedAt)
    status.classList.add('list-item__subtitle')
    noteEl.appendChild(status)

    return noteEl;
};

const renderNotes = () => {
    let div = document.querySelector(".notes-holder");
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy);

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    );

    div.innerHTML = "";


    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const textEle = generateDomNote(note);
            div.appendChild(textEle);
        });
    } else {
        const noNotes = document.createElement('p')
        noNotes.textContent = 'No notes to show'
        noNotes.classList.add('empty-message')
        div.appendChild(noNotes)
    }

};

const initialzeEditPage = (noteID) => {
    const noteTitle = document.querySelector(".title");
    const noteBody = document.querySelector(".body");
    const lastEditText = document.querySelector(".last-edit");

    const notes = getNotes();
    const note = notes.find((note) => note.id === noteID);

    if (!note) {
        location.assign(`/index.html`);
    }

    noteTitle.value = note.title;
    noteBody.value = note.body;
    lastEditText.textContent = generateLastEdited(note.updatedAt);
}

const generateLastEdited = (timeStamp) => `Last edit ${moment(timeStamp).fromNow()}`;

export { generateDomNote, generateLastEdited, renderNotes, initialzeEditPage }