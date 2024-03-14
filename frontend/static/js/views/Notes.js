import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params) {
        super(params) 
        this.setTitle("Notes");
    }

    async getHtml(){
        const notes = await super.getAllNotes()
        var main_div_str = await this.getNoteDivs(notes)
        return `
        <div id="notes_app">
            ${main_div_str}
            <a href="/notes/new"><div class="notes_cube" id="add_note"></div></a>
        </div>`;
    }

    async getNoteDivs(notes){
        var main_str = ""
        for (const note of notes){
            main_str += `<a href="/notes/${note.id}" class="notes__link"><div class="notes_cube"><h1>${note.title}</h1>${note.note}</div><a>\n`
        }
        return main_str
    }
}