import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params) {
        super(params)
        this.params = params
        this.setTitle("Notes");
    }

    async getHtml(){
        return `
        <div id="main_app">
            <h1>Note # ${this.params.id}</h1>
            <textarea id="note_add" rows=40 cols=100>s</textarea>
            <button id="submit_note" type="submit">Add</button>
        </div>
        `;
    }

    async postData(){
        var button = document.getElementById("submit_note") 
        var text = document.getElementById("note_add")
        button.addEventListener("click", () => (console.log(text.value)))
    }
}
