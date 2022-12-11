import { initialzeEditPage, generateLastEdited } from "./views";
import { updateNote, removeNote } from "./notes";

const noteTitle = document.querySelector(".title");
const noteBody = document.querySelector(".body");
const removeBtn = document.querySelector(".remove");
const lastEditText = document.querySelector(".last-edit");
const noteID = location.hash.substring(1);

initialzeEditPage(noteID)

noteTitle.addEventListener("input", () => {
    const note = updateNote(noteID, {
        title: noteTitle.value
    })
    lastEditText.textContent = generateLastEdited(note.updatedAt);
});

noteBody.addEventListener("input", () => {
    const note = updateNote(noteID, {
        body: noteBody.value
    })
    lastEditText.textContent = generateLastEdited(note.updatedAt);
});

removeBtn.onclick = () => {
    removeNote(noteID);
    location.assign(`/index.html`);
};

window.addEventListener("storage", (e) => {
    if (e.key === "notes") {
        initialzeEditPage(noteID)
    }
});
