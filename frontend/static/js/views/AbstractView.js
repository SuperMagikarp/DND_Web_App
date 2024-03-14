export default class {

    constructor(params) {
        this.params = params
        
        console.log(params)
    }

    setTitle(title) {
        document.title = title;
    }

    async getHtml(){
        return "";
    }

    async getAllNotes(){
        try{
            const response = await fetch("http://localhost:5050/notes/all")
            if (!response.ok){
                throw new Error("Could not find resource")
            }
            const data = await response.json()
            return data.notes
        }catch(error){
            console.error(error)
        }
    }
}