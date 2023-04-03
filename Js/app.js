// recupération des éléments du DOM
const dice = document.querySelector('#dice')
const name1 = document.querySelector('#p1')
const name2 = document.querySelector('#p2')  
const spot1 = document.querySelector('#spot1')
const spot2 = document.querySelector('#spot2')
const gScore1 = document.querySelector('#g-score-p1')
const gScore2 = document.querySelector('#g-score-p2')
const cScore1 = document.querySelector('#current-score-p1')
const cScore2 = document.querySelector('#current-score-p2')
const menuMode = document.querySelector('#mode-select')
const btnRoll = document.querySelector('#roll')
const btnHold = document.querySelector('#hold')
let sndDice1 = new Audio('./Audio/dice1.wav')
let sndClick = new Audio('./Audio/click.mp3')
let sndHold = new Audio('./Audio/hold.wav')
let sndRoll = new Audio('./Audio/roll.wav')

let globalScore = 0
let scoreP1 = 0
let scoreP2 = 0
let isRunning = false
let player = 1
let rolls = 0
let isRolling =false
let vsIA = false

// initialisation des variables 
function init () { 
    player = 1
    rolls = 0
    globalScore = 0
    scoreP1 = 0
    scoreP2 = 0
    spot1.style.opacity = 0
    spot2.style.opacity = 0
    name1.style.color = 'rgb(200,200,200)'
    name2.style.color = 'rgb(200,200,200)'
    gScore1.textContent = 0
    gScore2.textContent = 0 
    cScore1.textContent = 0 
    cScore2.textContent = 0 
    isRolling = false
}
// nouvelle partie
function start () {
    sndClick.play(); 
    if (isRunning || isRolling){
        let ask = confirm("Une partie est en cours . \n êtes vous sure de vouloir recommencer ?");
        if ( ask == true ) {
            isRunning = false ;
            start ();
        }
    } else {
        init();
        swipePlayer(1)
         askForMode()
    }
    
}

function askForMode(){
    menuMode.style.display = "block"
    
}
function selectMode (nb){
    if (nb == 1){
        vsIA = true
    } else { vsIA = false }
    isRunning = true
    sndClick.play()
    menuMode.style.display = "none"
}
function rollDice () {
    let rdm = 0
    rolls ++
    if ( isRolling && rolls < 12 ){
        rdm = Math.floor( Math.random() * 6 + 1)
        dice.src = "./Images/dice" + rdm + '.png'
        setTimeout(rollDice,1000/12)

    } else if ( isRolling && rolls == 12){
        rdm = Math.floor( Math.random() * 6 + 1)
        dice.src = "./Images/dice" + rdm + '.png'
        isRolling = false
        isRunning = true
        rolls = 0
        //ecxeption nb 1
        if ( rdm == 1){
            sndRoll.pause();
            sndRoll.currentTime = 0;
            sndDice1.play()
            globalScore = 0
            if ( player == 1){
                cScore1.textContent = globalScore
                swipePlayer(2)
            } else { 
                
                cScore2.textContent = globalScore
                swipePlayer(1)
            }
        } else {
            globalScore += rdm 
            if ( player == 1 ) {
                cScore1.textContent = globalScore
            }
            else { 
                cScore2.textContent = globalScore
            }
            if ( player == 2 && vsIA && rdm!=1){
                let reRoll = Math.random() 
                
                if (globalScore + parseInt(gScore2.textContent , 10) >= 100){
                    hold()
                }else if (globalScore < 6 && rdm!=1){
                    if (reRoll > 0.02 ){
                       setTimeout(roll,800)
                    } else { setTimeout(hold,1000) }
                }else if (globalScore >= 6 && globalScore < 12){
                    if (reRoll > 0.03 ){
                        setTimeout(roll,800)
                    } else { setTimeout(hold,1000) }
                } else if (globalScore >= 12 && globalScore < 18){
                    if (reRoll > 0.1 ){
                        setTimeout(roll,800)
                    } else { setTimeout(hold,1000) }
                } else if (globalScore >= 18 && globalScore < 24){
                    if (reRoll > 0.5 ){
                        setTimeout(roll,800)
                    } else { setTimeout(hold,1000) }
                }else if (globalScore >= 24 && globalScore < 32){
                    if (Math.random() > 0.6 ){
                        setTimeout(roll,800)
                    } else { setTimeout(hold,1000) }
                } else if (globalScore >= 32){
                    
                        setTimeout(hold,1000)}   
            }
            
        }
        
    } 
    
}

function roll () {
    if ( isRunning ) {
        sndRoll.play()
        isRolling = true;
        isRunning = false
        rollDice()  
        console.log(player + "roll") 
    }
}

function hold () {
    console.log(player + ' hold')
    if ( isRunning ){
        sndHold.play()
        if ( player == 1 ){
            scoreP1 +=globalScore
            globalScore = 0 
            gScore1.textContent = scoreP1
            cScore1.textContent = 0
            if ( scoreP1 < 100 )
                swipePlayer(2)  
        } else { 
            scoreP2 +=globalScore
            globalScore = 0 
            gScore2.textContent = scoreP2
            cScore2.textContent = 0
            if ( scoreP2 < 100 )
                swipePlayer(1)    
        }
        if ( scoreP1 >= 100 || scoreP2 >= 100 )
                { 
                    isRunning = false
                    setTimeout(win , 500)
                }
    }
}

function win () {
   alert ('le joueur' + player + ' remporte la partie')
}

function swipePlayer ( nb ) {
    player = nb
    if ( nb == 1 ) {
        name2.style.color = 'rgb(200,200,200)'
        name1.style.color = 'black'
        spot2.style.opacity = 0
        spot1.style.opacity = 1
        if ( vsIA ) {
            btnHold.setAttribute('onclick','hold()')
            btnRoll.setAttribute('onclick','roll()')
            playIA()

        }
    }
    if ( nb == 2 ) {
        name1.style.color = 'rgb(200,200,200)'
        name2.style.color = 'black'
        spot1.style.opacity = 0
        spot2.style.opacity = 1
        if ( vsIA ) {
            btnHold.setAttribute('onclick','')
            btnRoll.setAttribute('onclick','')
            playIA()

        }
    }

}

function playIA ( ){
    if (player == 2) {roll()}
}

init();