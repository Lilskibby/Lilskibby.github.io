var dropped = false

function dropdown(){

    const dropdown = document.getElementById("dropdown")
    const albumtext = document.getElementById("albumtext")
    if(dropped == false){
        dropdown.style.display = "flex"
        dropdown.style.visibility = "visible"
        albumtext.style.paddingTop = "50px"
        dropped = true
    }
    else{

        dropdown.style.display = "none"
        dropdown.style.visibility = "collapse"
        albumtext.style.paddingTop = "250px"
        dropped = false
    }

}