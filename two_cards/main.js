const sliderNav = [...document.querySelector('.nav').children];
const cards = [...document.querySelectorAll('.card')];
const dots = document.querySelector('.dots');
const last = cards.length -1;
const looping = false;
let active = 0;
let slideNum = 2;


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
    navHandler(active, looping);
    cardHandler(active)
})

function navHandler(index, isLooping){
    if(!isLooping){
        sliderNav.forEach(el => el.style.visibility = 'visible');
        if(index == 0){
            sliderNav[0].style.visibility = 'hidden';
        }else if(index == last){
            sliderNav[1].style.visibility = 'hidden';
        }
    }else{
        if(index < 0){
            active = last;
        }else if(index > last) {
            active = 0;
        }
    }
}


// nav clicking
sliderNav.forEach( el => {
    el.addEventListener('click', () =>{
        if(el.classList.contains('prev')) {
            active -= 1;
        }else{
            active += 1;
        }
        navHandler(active, looping);
        cardHandler(active);
        dotHandler(active);
    })
})


// next card
function nextToActive(){
    let next = active + 1
    if (active == last){
        next = 0;
    }
    return next
}
// prev card
function prevToActive(){
    let prev = active - 1
    if (active == 0){
        prev = last;
    }
    return prev
}
// the cards handler
function cardHandler(index)  {
    const prev = prevToActive()
    const next = nextToActive()
    cards.forEach(card => {
        card.classList.remove('active', 'next', 'prev');
        card.style.right = '-100%'
    })
    setTimeout(()=>{
        cards[prev].classList.add('prev');
        cards[index].classList.add('active');
        cards[next].classList.add('next');

        cards[active].style.right = '70% '
        cards[next].style.right = '10%'
    }, 50);
    cards.forEach(card => {
    })
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
