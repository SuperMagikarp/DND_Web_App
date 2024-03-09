import Dashboard from "./views/Dashboard.js"
import Notes from "./views/Notes.js"


const router = async () => {
    const routes = [
        {path:"/", view:  Dashboard},
        {path:"/notes", view: Notes}
    ]

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    })

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)

    if (!match){
        console.log("no match found returning to home")
        match = {
            route: routes[0],
            isMatch: true
        }
    }
    const view = new match.route.view()

    document.querySelector("#app").innerHTML = await view.getHtml();

    console.log(view)
}

window.addEventListener("popstate", router)

document.addEventListener("DOMContentLoaded", () =>{
    var images = document.querySelectorAll(".icon")
    images.forEach(image => {
        var static_image = image.getAttribute("src")
        var anim_image = image.getAttribute("animatedimage")
        image.onmouseover = () => image.setAttribute("src", anim_image)
        image.onmouseleave = () => image.setAttribute("src", static_image)
    })
    router();
})



