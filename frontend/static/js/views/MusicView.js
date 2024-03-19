import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params) {
        super(params)
        this.setTitle("Music");
    }

    async getHtml(){
        return `<div id="notes_app">
            <button class="song_bar" id="add_song">
                <span id="plus_sign">
                    <span id="rec1">
                    </span>
                    <span id="rec2">
                    </span>
                </span>
            </button>
        </div>`;
    }

    async postData(){
        await this.getHtml()
        var linkregex = new RegExp("^https://www.youtube.com/watch\\?v=[A-Za-z0-9_]{11}$")
        var button = document.getElementById("add_song")
        button.addEventListener("click", () => {
            var link = window.prompt("Paste youtube link here:")
            if (link === null || link === ""){
                console.log("nothing entered")
            }else{
                console.log(linkregex.test(link))
                
            }
        })
    }
}