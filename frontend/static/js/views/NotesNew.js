import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params) {
        super(params)
        this.params = params
        this.setTitle("Notes");
    }

    async getHtml(){
        var notes = await super.getAllNotes()
        var existing = notes.find(note => String(note.id) === this.params.id)
        if(!existing){
            return `
                <div id="main_app">
                    <h1><textarea class="note_add" id="notes_title" placeholder="Title" rows=2 cols=15></textarea></h1>
                    <textarea placeholder="Note" id="note_add" rows=40 cols=100></textarea>
                    <button id="submit_note" type="submit">Add</button>
                </div>`;
        }else {
            return `
            <div id="main_app">
                    <h1><textarea class="note_add" id="notes_title" placeholder="Title" rows=2 cols=15>${existing.title}</textarea></h1>
                    <textarea placeholder="Note" id="note_add" rows=40 cols=100>${existing.note}</textarea>
                    <button id="submit_note" type="submit">Add</button>
            </div>`
        }   
    }

    async postData(){
        await this.getHtml()
        var button = document.getElementById("submit_note") 
        var text = document.getElementById("note_add")
        var title = document.getElementById("notes_title")
        button.addEventListener("click", () => fetch("http://localhost:5050/notes/update", {
            method: "POST",
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                id: this.params.id,
                title: title.value,
                note: text.value,
                user: "Cuan",
                date: new Date()
            })
        }).then(location.href = "/notes"))
    }
}
