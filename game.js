const dice1=document.querySelector(".dice1");
const dice2=document.querySelector(".dice2");
const startBtn=document.querySelector(".startBtn")
const rollBtn=document.querySelector(".rollBtn")
const indBtn=document.querySelector(".individualBtn")
const sumBtn=document.querySelector(".sumBtn")
const endTurnBtn=document.querySelector(".endTurnBtn")
const player1= document.querySelector(".player1");
const player2= document.querySelector(".player2");
const boxes=[0,0,0,0,0,0,0,0,0,0];
const whosTurn= document.querySelector(".whosTurn");
const scoreBoard= document.querySelector("#scorecard");
const p1Name=document.querySelector("#p1name");
const p2Name=document.querySelector("#p2name");
const roundCounter=document.querySelector("#roundcounter")


let turn=1;
let rounds=1;
let dice1Value;
let dice2Value;
let score1=0;
let score2=0;


startBtn.addEventListener('click', function(){
    const player2Name=player2Input.value.trim();
    const player1Name=player1Input.value.trim();
    if(player1Name !='' && player2Name !=''){
        whosTurn.textContent=`${player1Name}'s Turn`;
        gamePlay.style.display="block";
        face.style.display="none";
        winner.style.display="none";
        select.style.display="block";
        indBtn.disabled=true;
        sumBtn.disabled = true;
        endTurnBtn.disabled = true;
        p1Name.textContent=`${player1Name}`;
        p2Name.textContent=`${player2Name}`;
    }
    else{
        alert("Please fil in names")
        player1Name.focus()
    }
    scoreBoard.style.display="Block";
})

rollBtn.addEventListener('click',function(){
    dice1Value=rollDice();
    dice2Value=rollDice();
    dice1.innerHTML=`<i class="bi bi-dice-${dice1Value}-fill"></i>`;
    dice2.innerHTML=`<i class="bi bi-dice-${dice2Value}-fill"></i>`;
    updateButtons();

})
function rollDice(){
    const diceNumber=Math.floor(Math.random()*6)+1;
    return diceNumber;
}
function updateButtons(){
    if(dice1Value === dice2Value || boxes[dice1Value] === "X" || boxes[dice2Value] === "X"){
        indBtn.disabled=true;
    }else{
        indBtn.disabled = false;}
        const sum = dice1Value + dice2Value;
        if (sum > 9 || boxes[sum] === "X") {
            sumBtn.disabled = true;
        } else {
            sumBtn.disabled = false;
        }
        if (indBtn.disabled && sumBtn.disabled) {
            endTurnBtn.disabled = false;
        } else {
            endTurnBtn.disabled = true;
        }
        rollBtn.disabled = true;

    }


    function shut(boxNumber){
        const shutBoxes= document.getElementById(`box${boxNumber}`)
        shutBoxes.classList.add('shut')
        shutBoxes.textContent="X"
    }
    indBtn.addEventListener('click',function(){
        shut(dice1Value);
        shut(dice2Value);
        boxes[dice1Value]="X"
        boxes[dice2Value]="X"
        const sum=dice1Value +dice2Value
        boxes[0]+=sum
        sumBtn.disabled = true;
        indBtn.disabled = true;
        rollBtn.disabled = false;
    })
    sumBtn.addEventListener('click',function(){
        const sum= dice1Value+dice2Value;
        shut(sum);
        boxes[sum]="X"
        boxes[0]+=sum
        sumBtn.disabled = true;
        indBtn.disabled = true;
        rollBtn.disabled = false;
    })
    endTurnBtn.addEventListener('click', function(){
        const points=45-boxes[0];
        if (turn === 1) {
            const player1Pts=points;
            score1= score1+points
            buildRow(`${rounds}`,`${player1Pts}`)
            whosTurn.textContent=`${player2Input.value.trim()}'s Turn`;
            turn = 2;
        } else if(turn===2){
            whosTurn.textContent=`${player1Input.value.trim()}'s Turn`;
            score2=score2+points
            const p2Td = document.querySelector(`#round${rounds} .p2Pts`);
            const p2Points= points
            p2Td.textContent= p2Points;
            turn=1;
            rounds= rounds+1;
            roundCounter.textContent=`Round ${rounds}`;
            gameOver()
        }
        resetBoard()

    })

    function buildRow(currentRound, p1Points,){
        const tr=document.createElement("tr");
        tr.id=`round${currentRound}`;
        const th=document.createElement("th");
        th.textContent= `Round ${currentRound}`;
        const td=document.createElement("td");
        const p1Td = document.createElement("td");
        p1Td.classList.add("p1Pts");
        p1Td.textContent = p1Points;
        const p2Td = document.createElement("td");
        p2Td.classList.add("p2Pts");
        p2Td.textContent="";
        tr.insertAdjacentElement('beforeend', th);
        tr.insertAdjacentElement('beforeend', p1Td);
        tr.insertAdjacentElement('beforeend', p2Td);
        const tbody = document.querySelector('#scoreCard tbody');
        tbody.insertAdjacentElement('beforeend', tr);
    }



    function resetBoard(){
        boxes.fill(0)
        const cards=document.querySelectorAll('.box')

        for(let i=0; i<cards.length; i++){
            cards[i].classList.remove('shut');
            cards[i].textContent=i+1;

        }
        if(rounds>5){
            console.log("GAME OVER")
        }
        endTurnBtn.disabled=true;
        rollBtn.disabled = false;
    };

    function gameOver(){
        if (rounds>=5){
            let winnerMsg="";
            gamePlay.style.display="none";
            face.style.display="none";
            select.style.display="none";
            scorecard.style.display="block";
            winner.style.display="block";
            const player2Name=player2Input.value.trim();
            const player1Name=player1Input.value.trim();
            let winnerMessage = "";
            if (score1 < score2) {
                winnerMsg = `${player1Name} wins with ${score1} points!`;
            } else if (score2 < score1) {
                winnerMsg = `${player2Name} wins with ${score2} points!`;
            } else {
                winnerMsg = "It's a tie!";
            }
            document.querySelector("#winnermsg").textContent = `${winnerMsg}`;
            document.querySelector("#p1win").textContent = `${player1Name}: ${score1} points`;
            document.querySelector("#p2win").textContent = `${player2Name}: ${score2} points`;
            document.querySelector("#playAgainBtn").addEventListener("click", playAgain);
        }


        function playAgain() {

            score1 = 0;
            score2 = 0;
            const table = document.querySelector("#scorecard tbody");
            while (table.rows.length > 0) {
                table.deleteRow(0);
            }
            rounds= 1;
            roundCounter.textContent=`Round ${rounds}`;

        gamePlay.style.display="block";
        select.style.display="block";
        scorecard.style.display="block";
        winner.style.display="none";



        resetBoard();
        }



    };
