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

let globalScore = 0
let scoreP1 = 0
let scoreP2 = 0
let isRunning = false
let player = 1;

// initialisation des variables 
function init () {
    player = 1
    globalScore = 0
    scoreP1 = 0
    scoreP2 = 0
    spot1.style.opacity = 0
    spot2.style.opacity = 0
    gScore1.textContent = 0
    gScore2.textContent = 0 
    cScore1.textContent = 0 
    cScore2.textContent = 0 

}
// nouvelle partie
function start () {
    if (isRunning){
        let ask = confirm("Une partie est en cours . \n êtes vous sure de vouloir recommencer ?");
        if ( ask == true ) {
            isRunning = false ;
            start ();
        }
    }
    init();
    isRunning =true ; 
    spot1.style.opacity = 1;
}


function roll () {
    if ( isRunning ) {
        let rdm = Math.floor( Math.random() * 6 + 1)
        dice.src = "./Images/dice" + rdm + '.png'
        globalScore += rdm 

        if ( rdm == 1){
            globalScore = 0
            if ( player == 1){
                player = 2
                cScore1.textContent = globalScore
                spot1.style.opacity = 0
                spot2.style.opacity = 1
            } else { 
                player = 1 
                cScore2.textContent = globalScore
                spot1.style.opacity = 1
                spot2.style.opacity = 0
            }

            return;
        }
        if ( player == 1 ) {
            cScore1.textContent = globalScore
        }
        else { 
            cScore2.textContent = globalScore
        }
        
    }

}

function hold () {
    if ( isRunning ){
        if ( player == 1 ){
            player = 2 
            scoreP1 +=globalScore
            globalScore = 0 
            gScore1.textContent = scoreP1
            cScore1.textContent = 0
            spot1.style.opacity = 0
            spot2.style.opacity = 1
            if ( scoreP1 >= 100)
                {
                    isRunning = false
                    player = 1
                    setTimeout(win , 500)
                }
        }
        else {
            player = 1 
            scoreP2 +=globalScore
            globalScore = 0 
            gScore2.textContent = scoreP2
            cScore2.textContent = 0
            spot1.style.opacity = 1
            spot2.style.opacity = 0
            if ( scoreP2 >= 100)
                { 
                    isRunning = false
                    player = 2
                    setTimeout(win , 600)
                }
        }
    }
}

function win () {
   alert ('le joueur' + player + ' remporte la partie')
}

init();