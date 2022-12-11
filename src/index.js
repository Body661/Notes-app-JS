import { createNote } from "./notes";
import { setFilters } from "./filters"
import { renderNotes } from './views'

let div = document.querySelector(".notes-holder");

renderNotes();

document.querySelector(".search").addEventListener("input", (e) => {
    setFilters({
        searchText: e.target.value,
    })
    renderNotes();
});

// **  Creating new note & add it to localStorage
let createBtn = document.querySelector("#create-note");
createBtn.onclick = () => {
    const id = createNote()
    location.assign(`/edit.html#${id}`);
};

// **  Sorting Notes
let sortBy = document.querySelector("#sort-by");

sortBy.addEventListener("change", (e) => {
    setFilters({
        sortBy: e.target.value,
    })
    renderNotes();
});

window.addEventListener("storage", (e) => {
    if (e.key === "notes") {
        renderNotes();
    }
});
