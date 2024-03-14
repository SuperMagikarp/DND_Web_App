import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params) {
        super(params)
        this.setTitle("Music");
    }

    async getHtml(){
        return `<div id="notes_app">
            <a><div class="notes_cube" id="add_note"></div></a>
        </div>`;
    }
}