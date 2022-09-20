/*
    ==================================================v3
    1- dots 
    ====================================================
*/

// no comment needed but the variables declaration
const sliderNav = [...document.querySelector('.nav').children]
const cards = [...document.querySelectorAll('.card')]
const dots = document.querySelector('.dots')
let active = 0;
const last = cards.length -1;

// what will happen if [next || prev] 'buttons' clicked
sliderNav.forEach( (nav, n) => {
    nav.addEventListener('click', () => {
        const sliderNumber = handleNav(n);
        sliderNumber.push('fade')
        cardHandler(sliderNumber);
    })
})

// handling [next || prev] and filtering active slide index
const handleNav = (n) => {
    let resetClass = 'next-clicked';
    // prev click
    if(n == 0){
        resetClass = 'prev-clicked';
        if(active < 1) active = last;
        else 
        active -= 1;
    }
    // next click
    else{
        if (active >= last) {
            active = 0;
        }
        else {
            active +=1;
        }
    }
    return [active, resetClass];
}

// the meat and potato
function cardHandler(sliderNumber)  {
    const suffix = 'clicked';
    // if(sliderNumber[2] == 'fade'){
    //     cards.forEach(card => {
    //         card.classList.remove( `next-${suffix}`, `prev-${suffix}`)
    //     })
    //     return
    // }
    cards.forEach(card => {
        card.classList.remove('active', `next-${suffix}`, `prev-${suffix}`)
        card.classList.add(sliderNumber[1]);
    })
    dotHandler()
    setTimeout(()=>{
        dots.children[sliderNumber[0]].classList.add('dot-active');
        cards[sliderNumber[0]].classList.add('active');
    }, 50)
}

// be aware from the dots
function dotHandler(){
    Array.from(dots.children).forEach(el => {
        el.classList.remove('dot-active');
    });
}

// dots initial
window.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i <= last; i++) {
        if(i == active){
            dots.innerHTML +=  `<span class="dot dot-active"></span>`
        }else{
            dots.innerHTML +=  `<span class="dot "></span>`
        }
    }
})


