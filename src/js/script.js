var dropped = false

function dropdown(){

    const dropdown = document.getElementById("dropdown")
    const albumtext = document.getElementById("albumtext")
    if(dropped == false){
        dropdown.style.display = "flex"
        dropdown.style.visibility = "visible"
        albumtext.style.paddingTop = "50px";
        dropped = true

    }
    else{
        albumtext.style.paddingTop = "250px";      
        dropdown.style.display = "none"
        dropdown.style.visibility = "collapse"
        dropped = false
    }
}

function iconhover(type){

    switch(type){

        case facebook:
            const facebook = getElementById("facebook")
            facebook.src = "resources/facebook_gray.png"
            break;
        case instagram:
            const instagram = getElementById("instagram")
            break;
        case youtube: 
        const youtube = getElementById("youtube")
            break;
        case tiktok:
            const tiktok = getElementById("tiktok")
            break;



    }


}