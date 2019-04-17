let score = 0
let chances = 7
let playersButton = document.getElementById("submitPlayers")
playersButton.addEventListener("click", displayNames)
function displayNames(event){
    event.preventDefault()
    let player1 = document.getElementById('p1name').value
    let player2 = document.getElementById('p2name').value
    let playerNames = document.querySelector('h3')
    playerNames.innerHTML = `${player1} vs ${player2}!<br></br> ${player1}, choose a word for ${player2} to guess`
    document.getElementById('nameForm').style.display ="none"
    makeForm()
}

let elements = ["stem","cherry","cream1","cream2", "scoop1", "scoop2", "scoop3"]
function removeElement() {
    let component = document.querySelector(`[class = ${elements[0]}]`)
    console.log(component)
    console.log(elements[0])
        component.classList.remove(`${elements[0]}`)
        elements.shift()
        // console.log
        chances -=1
        let h2 = document.querySelector('.chances')
        h2.textContent = `Chances:${chances}`
    }
// let wordForm;
// let submitWordButton;
function makeForm(){
let wordForm = document.createElement('INPUT')
wordForm.setAttribute("type", "text")
wordForm.setAttribute("placeholder", "Enter Word")
wordForm.classList = "wordForm"
wordForm.setAttribute("id", "wordForm" )
wordFormValue = wordForm.value
let container = document.querySelector('.playersContainer')
container.appendChild(wordForm)
let submitWordButton = document.createElement('BUTTON')
submitWordButton.classList = "submitWord"
submitWordButton.setAttribute("id", "submitWord")
container.appendChild(submitWordButton) 
var text = document.createTextNode("Submit")
submitWordButton.appendChild(text)
submitWordButton.addEventListener("click", submitWord)
}

let word = ""
function submitWord(event) {
    event.preventDefault()
    let wordFormValue = document.querySelector('.wordForm').value
    console.log(wordFormValue)
    word =wordFormValue 
    console.log(word)
    document.getElementById('wordForm').style.display ="none"
    document.getElementById('submitWord').style.display ="none"
    createPlaceHolders()
}

let wordContainer = document.getElementById('wordContainer')
function createPlaceHolders() {
    let directions = document.querySelector('h3')
    let player2 = document.getElementById('p2name').value
    directions.textContent = `${player2}, your turn to guess!`
    console.log("working")
    for (let i =0; i<word.length; i++) {
    let letterDiv = document.createElement("div")
    wordContainer.appendChild(letterDiv)
    letterDiv.classList = "letterDiv"
    let p = document.createElement('p')
    letterDiv.appendChild(p)
    p.textContent = word[i]
    p.setAttribute("class",`${word[i]}`)
    // p.setAttribute("class", "reveal")
    console.log(p)
    }
    setUp()
}

function gameOver(){
    if (elements.length === 0) {
        console.log("player1 wins")
        let banner = document.querySelector('.banner')
        banner.setAttribute("class", "banner")
        let player1 = document.getElementById('p1name').value
        banner.textContent = `You got scooped! ${player1} wins!`
        let allLetters = document.querySelectorAll('p')
        for (let i=0;i<allLetters.length;i++){
            allLetters[i].style.color = "white"
        }
    }
}


function winner (){
    if (score >= word.length){
        let banner = document.querySelector('.banner')
        let player2 = document.getElementById('p2name').value
        banner.textContent = `${player2} wins!`
    }
}

let guessField;
let container = document.querySelector('.playersContainer')
function setUp(){
    let guessField = document.createElement('INPUT')
    guessField.setAttribute("type", "text")
    guessField.setAttribute("placeholder", "Enter letter here")
    guessField.setAttribute("class", `${guessField.value}`)
    guessField.setAttribute("class", "letterField")
    let submitLetterButton = document.createElement('INPUT')
    submitLetterButton.setAttribute("type", "submit")
    container.appendChild(submitLetterButton) 
    submitLetterButton.classList = "submitLetter"
    submitLetterButton.setAttribute("id", "submitLetter")
    var text = document.createTextNode("Submit")
    submitLetterButton.appendChild(text)
    container.appendChild(guessField)
    submitLetterButton.addEventListener("click", function() {
    //   if (chances > 0) {
        if (word.includes(guessField.value)){
            for (let i=0; i<word.length; i++){
            if(word[i]== guessField.value) {
            score+=1 
            console.log(guessField.value)
            let selectLetters = document.querySelector(`[class = ${word[i]}]`)
            console.log(selectLetters)
            selectLetters.classList.add('white')
            console.log(guessField.value)
            let h2score = document.querySelector('.score')
            h2score.textContent = `Score:${score}`
            winner()
            // if (score >= word.length){
            //     let youWin = document.createElement('p')
            //     youWin.setAttribute("class", "Winner")
            //     let player2 = document.getElementById('p2name').value
            //     youWin.textContent = `${player2} wins!`
            // }
        } 
        }
        document.querySelector(".letterField").value = ''
        }else { 
        console.log("Wrong!")
            removeElement()
            gameOver()
        }
        document.querySelector(".letterField").value = ''
    //   }
    })
}
