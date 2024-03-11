import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params) {
        super(params)
        this.setTitle("Notes");
    }

    async getHtml(){
        return `
        <div id="notes_app">
            <a href="/notes/edit"><div class="notes_cube" id="add_note"></div></a>
        </div>
            `;
    }
}