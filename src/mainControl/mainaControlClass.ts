import AbstractNote from "./abstracNote.js";
class mainControlClass {
    notes: AbstractNote[];
    constructor() {
        this.notes = [];
    }
    addNote(note) {
        this.notes.push(note);
    }
    deleteNote() {
        this.notes.pop();
    }
    getNotes() {
        return this.notes;
    }

}