const sliderNav = [...document.querySelector('.nav').children],
    cards = [...document.querySelectorAll('.card')],
    dots = document.querySelector('.dots')

class Slider {
    sliderNav 
    cards 
    dots 
    
    constructor(sliderNav, cards, dots){
        this.sliderNav = sliderNav
        this.cards = cards
        this.dots = dots
    }
    active = 0;
    last = this.cards.length -1 ;

    dotsInit(){
        window.addEventListener('DOMContentLoaded', () => {
            for (let i = 0; i <= this.last; i++) {
                if(i == this.active){
                    this.dots.innerHTML +=  `<span class="dot dot-active"></span>`
                }else{
                    this.dots.innerHTML +=  `<span class="dot "></span>`
                }
            }
        })        
    }
    navControl(){
        this.sliderNav.forEach( (nav, n) => {
            nav.addEventListener('click', () => {
                const sliderNumber = this.handleNav(n);
                this.cardHandler(sliderNumber);
            })
        })
    }
    cardHandler(sliderNumber)  {
        const suffix = 'clicked';
        this.cards.filter(card => {
            card.classList.remove('active', `next-${suffix}`, `prev-${suffix}`)
            card.classList.add(sliderNumber[1]);
        })
        this.dotHandler()
        setTimeout(()=>{
            this.dots.children[sliderNumber[0]].classList.add('dot-active');
            this.cards[sliderNumber[0]].classList.add('active');
        }, 50)
    }
    dotHandler(){
        Array.from(this.dots.children).forEach(el => {
            el.classList.remove('dot-active');
        });
    }
    handleNav = (n) => {
        let resetClass = 'next-clicked';
        // prev click
        if(n == 0){
            resetClass = 'prev-clicked';
            if(this.active < 1) this.active = this.last;
            else 
            this.active -= 1;
        }
        // next click
        else{
            if (this.active >= this.last) {
                this.active = 0;
            }
            else {
                this.active +=1;
            }
        }
        return [this.active, resetClass];
    }
    
}

const slide = new Slider(sliderNav, cards, dots);
slide.dotsInit();
slide.navControl();
console.log(slide);