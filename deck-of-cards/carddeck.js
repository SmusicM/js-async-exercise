const baseUrl = 'https://deckofcardsapi.com/api/deck';
const shuff_button = document.getElementById("shuff-button");
const start_deck_btn = document.getElementById('start-deck-btn');
const card_cont = document.getElementById('card-cont');
const deck_cont = document.getElementById('deck-cont');
const draw_button = document.getElementById('draw-card-btn');
const messages_cont = document.getElementById('messages-cont');
const foot = document.getElementById("foot");
//to get one cards from newly shuffled deck
//https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
//https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1

const deck = {
   async init(){
    let res = await axios.get(`${baseUrl}/new/shuffle/?deck_count=1`)
    //deck id in innit so we can use throughout
    this.deckid = res.data.deck_id;
    console.log( res.data.deck_id)
   },
   async draw(){
    //draws one card
     let res = await axios.get(`${baseUrl}/${this.deckid}/draw/`)
     console.log(res)
     console.log(res.data.cards)
     console.log(res.data.cards[0].value)
     console.log(res.data.cards[0].suit)
      //uses index each card at top of deck or drawn is index 0 
     this.cardImage = res.data.cards[0].image
     this.cardSuit = res.data.cards[0].suit
     this.cardValue = res.data.cards[0].value
     console.log(`'this is from the this:'image: ${this.cardImage}, suit:${this.cardSuit}, value: ${this.cardValue}`)
   },
   async shuffle(){
    //shuffles and keeps remaining card on top of deck
    let res = await axios.get(`${baseUrl}/${this.deckid}/shuffle/?remaining=true`)
    console.log(res.data)
    console.log(res.data.shuffled)
    this.shuff = res.data.shuffled
    console.log(`shuff: ${this.shuff}`)
   }
   
}

start_deck_btn.addEventListener('click',async function(){
    //calls init to start deck to be ready for drawing cards
    deck.init();
    const start_message = `<p>Deck started click draw to start pulling cards</p>`;
    messages_cont.innerHTML += start_message;
})

let timesshuffled = 0;
shuff_button.addEventListener('click',async function(){
    await deck.shuffle()
    
    console.log(` deck_id:  ${deck.deckid}`)
    console.log(` deck shuffle true or false:  ${deck.shuff}`)
    //if deck shuffled returns true show html , and counts times shuffled
        if(deck.shuff === true){
            timesshuffled++
            console.log(timesshuffled)
            const shuffText = `<h4>DECK SHUFFLED(${timesshuffled})time's</h4>`
            messages_cont.innerHTML = shuffText
            
        }
       
    
    
    
    
})




draw_button.addEventListener('click',async function(){
    await deck.draw();
    //calls draw on click and adds cards to html
    
        
        const newCard = `<div>
        <h3></h3>
       
        <img src="${deck.cardImage}">
        </div>`
            deck_cont.innerHTML += newCard
            
    
})



//clears html for message after deck is started
start_deck_btn.addEventListener("click",async function(){
    setTimeout(() => {
        foot.innerHTML = ''
    },1000);
})