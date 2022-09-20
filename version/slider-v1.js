/*
    ===================================================v2
    1- replace [handlePrev handleNexxt] with  [hadleNav]
    2- cardHandler take param [card number]
    3- adding [resetClass]
    ====================================================
    version -1- complite
        simple - [1] card - loop - slidding effect 

*/
const sliderNav = [...document.querySelector('.nav').children]
const cards = [...document.querySelectorAll('.card')]

let active = 0;
const last = cards.length -1;


sliderNav.forEach( (nav, n) => {
    nav.addEventListener('click', () => {
        const sliderNumber = handleNav(n);
        cardHandler(sliderNumber);

    })
})

const handleNav = (n) => {
    let resetClass = 'next-clicked';
    // prev click
    if(n == 0){
        resetClass = 'prev-clicked';
        if(active < 1) active = last;
        else 
        active -= 1;
    // next click
    }else{
        if (active >= last) {
            active = 0;
        }
        else {
            active +=1;
        }
    }

    return [active, resetClass];
}

function cardHandler(sliderNumber)  {
    const suffix = 'clicked'
    cards.filter(card => {
        card.classList.remove('active', `next-${suffix}`, `prev-${suffix}`)
        card.classList.add(sliderNumber[1])
    })
    setTimeout(()=>{
        cards[sliderNumber[0]].classList.add('active')
    }, 50)
}
