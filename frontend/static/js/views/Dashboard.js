import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params) {
        super(params)
        this.setTitle("Dashboard");
    }

    async getHtml(){
        return `
        <div id=main_app>
            <div class="info_cube">square1</div>
            <div class="info_cube">square2</div>
        </div>
        `;
    }
}