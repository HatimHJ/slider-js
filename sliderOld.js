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
let active = 0;
const last = cards.length -1;
const looping = true;

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
    // nav init
    if(!looping){
        sliderNav[0].style.visibility = 'hidden';
    }else{
        sliderNav[0].style.visibility = 'visible';
    }

    // the html does not contain dot span so the code below MUST BE HERE  
    Array.from(dots.children).forEach( (el, index) => {    
        el.addEventListener('click', () => {
            dotClicked(index)
        })
    })

})

// bounder handling
function indexFiltering(index){
    if(index < 0) {
        index = last;
    }else if(index > last){
        index = 0
    }
    return index
}

// the meat and potato
function cardHandler(sliderNumber)  {
    const index = indexFiltering(sliderNumber);
    setTimeout(()=>{
        cards[index].classList.add('active');
    }, 50);
}


// what will happen if [next || prev] 'buttons' clicked
sliderNav.forEach( (nav, nextPrev) => {
    nav.addEventListener('click', () => {
        const sliderNumber = handleNav(nextPrev);
        cardHandler(sliderNumber);
        dotHandler(sliderNumber)
    })
})


// handling [next || prev] and filtering active slide index
const handleNav = (nextPrev) => {    
    let resetClass = 'next-clicked';
    const suffix = 'clicked';
    // prev click
    if(nextPrev == 0){
        resetClass = 'prev-clicked';
        active -=1
    }
    // next click
    else{
        active +=1;
    }
    // dealing with no loop option
    if(!looping){
        loopHandler()
    }
    // reseting calsses
    cards.forEach(card => {
        card.classList.remove('active', `next-${suffix}`, `prev-${suffix}`)
        card.classList.add(resetClass);
    })
    return active;
}

//  dots click
function dotClicked(index){
    dotHandler(index);
    cardHandler(index);
    loopHandler()
}
//  dots handler
function dotHandler(index){
    Array.from(dots.children).forEach(el => {
        el.classList.remove('dot-active');
    });
    cards.forEach(card => {
        card.classList.remove('active');
    })
    dots.children[index].classList.add('dot-active');
}


function loopHandler(){
    if(active == 0) {
        sliderNav[0].style.visibility = 'hidden'
    }else if(active == last){
        sliderNav[1].style.visibility = 'hidden'
    }
    else {
        sliderNav[0].style.visibility = 'visible'
        sliderNav[1].style.visibility = 'visible'
    }
}