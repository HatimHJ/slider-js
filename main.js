/*
    ==================================================v3
    1- dots 
    2- to loop or not to loop
    ====================================================
*/

// no comment needed but the variables declaration
const sliderNav = [...document.querySelector('.nav').children]
const cards = [...document.querySelectorAll('.card')]
const dots = document.querySelector('.dots')
const last = cards.length -1;
const looping = false;
let active = 0;

// after the html loaded
window.addEventListener('DOMContentLoaded', () => {

    // dots initial
    for (let i = 0; i <= last; i++) {
        if(i == active){
            dots.innerHTML +=  `<span class="dot dot-active"></span>`;
        }else{
            dots.innerHTML +=  `<span class="dot "></span>`;
        }
    }
    // the html does not contain dot span so the code below MUST BE HERE  
    Array.from(dots.children).forEach( (el, index) => {    
        el.addEventListener('click', () => {
            // change the active 
            active = index;
            dotClicked(active);
        })
    })
    navHandler(active, looping)
})

function navHandler(index, isLooping){
    if(!isLooping){
        sliderNav.forEach(el => el.style.visibility = 'visible')
        if(index == 0){
            sliderNav[0].style.visibility = 'hidden'
        }else if(index == last){
            sliderNav[1].style.visibility = 'hidden'
        }
    }
}
sliderNav.forEach( el => {
    el.addEventListener('click', () =>{
        if(el.classList.contains('prev')) {
            active -= 1
        }else{
            active += 1
        }
        navHandler(active, looping)
        cardHandler(active)
        dotHandler(active)
    })
})
// the meat and potato
function cardHandler(index)  {
    cards.forEach(card => {
        card.classList.remove('active');
    })
    setTimeout(()=>{
        cards[index].classList.add('active');
    }, 50);
}

//  dots click
function dotClicked(index){
    dotHandler(index);
    cardHandler(index);
    navHandler(index, looping);
}
//  dots handler
function dotHandler(index){
    Array.from(dots.children).forEach(el => {
        el.classList.remove('dot-active');
    });    
    dots.children[index].classList.add('dot-active');
}
