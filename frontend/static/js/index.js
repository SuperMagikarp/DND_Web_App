import Dashboard from "./views/Dashboard.js"
import Notes from "./views/Notes.js"
import NotesNew from "./views/NotesNew.js"
import MusicView from "./views/MusicView.js"
import MapView from "./views/MapView.js"
import MapNew from "./views/MapNew.js"
import TokenView from "./views/TokenView.js"

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]]
    }))
}

const router = async () => {
    const routes = [
        {path:"/", view:  Dashboard},
        {path:"/notes", view: Notes},
        {path:"/notes/:id", view: NotesNew},
        {path:"/music", view:MusicView},
        {path:"/maps", view:MapView},
        {path:"/maps/:id", view:MapNew},
        {path:"/tokens", view:TokenView},
        {path:"/tokens/:id", view:Dashboard}
    ]
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        }
    })

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null)
    
    if (!match){
        console.log("no match found returning to home")
        match = {
            route: routes[0],
            result: true
        }
    }
    const view = new match.route.view(getParams(match))
    
    document.querySelector("#app").innerHTML = await view.getHtml();
    await view.postData()
    console.log(view)
}

window.addEventListener("popstate", router)


var images = document.querySelectorAll(".icon")
    images.forEach(image => {
        var static_image = image.getAttribute("src")
        var anim_image = image.getAttribute("animatedimage")
        image.onmouseover = () => image.setAttribute("src", anim_image)
        image.onmouseleave = () => image.setAttribute("src", static_image)
})

document.addEventListener("DOMContentLoaded", () =>{
    router();
})



