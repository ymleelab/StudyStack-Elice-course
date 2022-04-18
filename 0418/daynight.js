export function night() {
    document.querySelector('body').style.backgroundColor = 'black';
    //document.querySelector('body').style.color = 'white';
    $('body').css("color", "white");
    let as = document.querySelectorAll('a');
    for(let i=0; i<as.length; i++){
        as[i].style.color='white';
    }
}
export function day() {
    document.querySelector('body').style.backgroundColor = 'white';
    document.querySelector('body').style.color = 'black';
    let as = document.querySelectorAll('a');
    for(let i=0; i<as.length; i++){
        as[i].style.color='black';
    }
}

export function dayNight(mode) {
    if(mode === 'night') {
        night();
    } else {
        day();
    }
}