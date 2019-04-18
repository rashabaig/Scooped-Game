let score = 0
let chances = 7
let clue =""
let word = ""
let guessField;
let player1 = document.getElementById('p1name').value
let player2 = document.getElementById('p2name').value
let container = document.querySelector('.playersContainer')
let wordContainer = document.getElementById('wordContainer')
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
//Step 1: form for entering player names
let playersButton = document.getElementById("submitPlayers")
playersButton.addEventListener("click", displayNames)
function displayNames(event){
    event.preventDefault()
    let player1 = document.getElementById('p1name').value
    let player2 = document.getElementById('p2name').value
    let instructions = document.querySelector('h3')
    instructions.innerHTML = `${player1}, choose a word for ${player2} to guess`
    // document.getElementById('nameForm').style.display ="none"
    document.getElementById('p1name').style.display ="none"
    document.getElementById('p2name').style.display ="none"
    document.getElementById('ins').style.display ="none"
    document.getElementById('submitPlayers').style.display ="none"
    // createClueForm()
    makeWordForm()
}

function makeWordForm(){
    let formContainer = document.createElement('FORM')
    let wordForm = document.createElement('INPUT')
    wordForm.setAttribute("type", "text")
    wordForm.setAttribute("placeholder", "Enter Word")
    wordForm.classList = "wordForm"
    wordForm.setAttribute("id", "wordForm" )
    wordFormValue = wordForm.value
    let container = document.querySelector('.playersContainer')
    container.appendChild(formContainer)
    formContainer.appendChild(wordForm)
    let submitWordButton = document.createElement('INPUT')
    submitWordButton.setAttribute("type", "submit")
    submitWordButton.setAttribute("value", "submit")
    submitWordButton.classList = "submitWord"
    submitWordButton.setAttribute("id", "submitWord")
    formContainer.appendChild(submitWordButton)
    submitWordButton.addEventListener("click", submitWord)
    }
    function submitWord(event) {
        event.preventDefault()
        let wordFormValue = document.querySelector('.wordForm').value
        console.log(wordFormValue)
        word =wordFormValue 
        console.log(word)
        document.getElementById('wordForm').style.display ="none"
        document.getElementById('submitWord').style.display ="none"
        createClueForm()()
    }

function createClueForm(){
    let formContainer = document.createElement('FORM')
    let container = document.querySelector('.playersContainer')
    container.appendChild(formContainer)
    let clueForm = document.createElement('INPUT')
    clueForm.setAttribute("type", "text")
    clueForm.setAttribute("placeholder", "Enter Clue")
    clueForm.classList = "clueForm"
    clueForm.setAttribute("id", "clueForm" )
    formContainer.appendChild(clueForm)
    let submitClueButton = document.createElement('INPUT')
    submitClueButton.setAttribute("type", "submit")
    submitClueButton.setAttribute("value", "submit")
    submitClueButton.classList = "submitClue"
    submitClueButton.setAttribute("id", "submitClue")
    formContainer.appendChild(submitClueButton) 
    let player2 = document.getElementById('p2name').value
    let clueInstructions = document.querySelector('h3')
    clueInstructions.textContent = `Provide a clue for ${player2}`
    submitClueButton.addEventListener("click", submitClue)
}

function submitClue(event) {
    event.preventDefault()
    let clueFormValue = document.querySelector('.clueForm').value
    console.log(clueFormValue)
    clue = clueFormValue 
    console.log(word)
    let h2clue = document.querySelector('.clue')
    h2clue.textContent = `Clue: ${clue}`
    document.getElementById('clueForm').style.display ="none"
    document.getElementById('submitClue').style.display ="none"
    // makeWordForm()
    createPlaceHolders()
}

function createPlaceHolders() {
    let directions = document.querySelector('h3')
    let player2 = document.getElementById('p2name').value
    directions.textContent = `${player2}, guess a letter!`
    console.log("working")
    for (let i =0; i<word.length; i++) {
    let letterDiv = document.createElement("div")
    wordContainer.appendChild(letterDiv)
    letterDiv.classList = "letterDiv"
    let p = document.createElement('p')
    letterDiv.appendChild(p)
    p.textContent = word[i]
    p.setAttribute("class",`${word[i]}`)
    // p.style.display = "none"
    console.log(p)
    }
    setUp()
}

function setUp(){
    let formContainer = document.createElement('FORM')
    let container = document.querySelector('.playersContainer')
    container.appendChild(formContainer)
    let guessField = document.createElement('INPUT')
    guessField.setAttribute("type", "text")
    guessField.setAttribute("placeholder", "Enter letter")
    guessField.setAttribute("class", `${guessField.value}`)
    guessField.setAttribute("class", "letterField")
    let submitLetterButton = document.createElement('INPUT')
    submitLetterButton.setAttribute("type", "submit")
    submitLetterButton.classList = "submitLetter"
    submitLetterButton.setAttribute("id", "submitLetter")
    var text = document.createTextNode("Guess")
    submitLetterButton.appendChild(text)
    formContainer.appendChild(guessField)
    formContainer.appendChild(submitLetterButton) 
    submitLetterButton.addEventListener("click", function(event) {
        event.preventDefault()
        if (word.includes(guessField.value)){
            for (let i=0; i<word.length; i++){
            if(word[i]== guessField.value) {
            score+=1 
            console.log(guessField.value)
            let selectLetters = document.querySelector(`[class = ${word[i]}]`)
            console.log(selectLetters)
            selectLetters.classList.add('visibility')
            console.log(guessField.value)
            let h2score = document.querySelector('.score')
            h2score.textContent = `Score:${score}`
            winner()
        } 
        }
        document.querySelector(".letterField").value = ''
        }else { 
        console.log("Wrong!")
            removeElement()
            gameOver()
        }
        document.querySelector(".letterField").value = ''
    })
}

function gameOver(){
    if (elements.length === 0) {
        console.log("player1 wins")
        let banner = document.querySelector('.banner')
        banner.setAttribute("class", "banner")
        let player1 = document.getElementById('p1name').value
        banner.textContent = `You got scooped! ${player1} wins!`
        let endGame = document.querySelector('h3')
        endGame.textContent = "*G a m e   O v e r*"
        let allLetters = document.querySelectorAll('p')
        for (let i=0;i<allLetters.length;i++){
            allLetters[i].classList.add('visibility')
        }
    }
    
}

function winner (){
    if (score >= word.length){
        let banner = document.querySelector('.banner')
        let player2 = document.getElementById('p2name').value
        banner.textContent = `${player2} wins!`
        let endGame = document.querySelector('h3')
        endGame.textContent = "*G a m e   O v e r*"
    }
}



