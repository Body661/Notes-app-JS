import uuidv4 from 'uuid/v4'
import moment from 'moment'

let notes = []

const getSavedNotes = () => {
    const notesJSON = localStorage.getItem("notes");
    try {
        return notesJSON ? JSON.parse(notesJSON) : [];
    } catch (e) {
        return [];
    }
};

const saveNotes = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
};


// Expose notes from module
const getNotes = () => notes;


const createNote = () => {
    const id = uuidv4();
    const timeStamp = moment().valueOf();
    notes.push({
        id: id,
        title: "",
        body: "",
        createdAt: timeStamp,
        updatedAt: timeStamp,
    });
    saveNotes()
    return id
}

const removeNote = (noteId) => {
    const noteIndex = notes.findIndex((note) => note.id === noteId);

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
        saveNotes()
    }
};

const sortNotes = function (sortBy) {
    if (sortBy === "byEdited") {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1;
            } else if (a.updatedAt < b.updatedAt) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === "byCreated") {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt < b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === "byName") {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        });
    }
};

const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id)

    if (!note) {
        return
    }

    if (typeof updates.title === 'string') {
        note.title = updates.title
        note.updatedAt = moment().valueOf()
    }

    if (typeof updates.body === 'string') {
        note.body = updates.body
        note.updatedAt = moment().valueOf()
    }
    saveNotes()
    return note;
}

notes = getSavedNotes()

export { getNotes, createNote, removeNote, sortNotes, updateNote }