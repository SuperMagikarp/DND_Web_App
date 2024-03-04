import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    contructor() {
        this.setTitle("Notes");
    }

    async getHtml(){
        return `
        <div id="notes_app">
            <div class="notes_cube">square1</div>
            <div class="notes_cube">square2</div>
            <div class="notes_cube">square3</div>
            <div class="notes_cube">square1</div>
            <div class="notes_cube">square2</div>
            <div class="notes_cube">square3</div>
            <div class="notes_cube">square1</div>
            <div class="notes_cube">square2</div>
            <div class="notes_cube">square3</div>
            <div class="notes_cube">square1</div>
            <div class="notes_cube">square2</div>
            <div class="notes_cube">square3</div>
            <div class="notes_cube">square1</div>
            <div class="notes_cube">square2</div>
            <div class="notes_cube">square3</div>
            <div class="notes_cube">square1</div>
            <div class="notes_cube">square2</div>
            <div class="notes_cube">square3</div>
        </div>
            `;
    }
}