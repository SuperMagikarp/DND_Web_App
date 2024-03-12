import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params) {
        super(params)
        this.params = params
        this.setTitle("Notes");
    }

    async getHtml(){
        var notes = await super.getAllNotes()
        var existing = notes.find(note => note.id === this.params.id)
        console.log(existing)
        if(!existing){
            return `
                <div id="main_app">
                    <h1><textarea class="note_add" id="notes_title" placeholder="Title" rows=2 cols=15></textarea></h1>
                    <textarea placeholder="Note" class="note_add" rows=40 cols=100></textarea>
                    <button id="submit_note" type="submit">Add</button>
                </div>`;
        }else {
            return `<div id="main_app">
            <h1><textarea class="note_add" id="notes_title" placeholder="Title" rows=2 cols=15>${existing.title}</textarea></h1>
            <textarea placeholder="Note" class="note_add" rows=40 cols=100>${existing.note}</textarea>
            <button id="submit_note" type="submit">Add</button>
            </div>`
        }   
    }

    async postData(){
        var button = document.getElementById("submit_note") 
        var text = document.getElementById("note_add")
        button.addEventListener("click", () => fetch("http://localhost:5050/notes/update", {
            method: "POST",
            body: {
                id: params[id],
                note: text,
                user: "Cuan",
                date: new Date()
            }
        }))
    }
}
