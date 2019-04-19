let score = 0
let chances = 7
let clue =""
let word = ""
let guessField;
let lettersGuessed = []
let container = document.querySelector('.playersContainer')
let wordContainer = document.getElementById('wordContainer')
let elements = ["stem","cherry","cream1","cream2", "scoop1", "scoop2", "scoop3"]
function removeElement() {
    let component = document.querySelector(`[class = ${elements[0]}]`)
    console.log(component)
    console.log(elements[0])
        component.classList.remove(`${elements[0]}`)
        elements.shift()
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
    document.getElementById('p1name').style.display ="none"
    document.getElementById('p2name').style.display ="none"
    document.getElementById('submitPlayers').style.display ="none"
    makeWordForm()
} 

function makeWordForm(){
    let hiddenElements = document.querySelectorAll('.secret')
    for (let i=0;i<hiddenElements.length;i++){
        hiddenElements[i].classList.remove('secret')
    }
    
    let wordForm = document.getElementById('inputPassword2')
    wordFormValue = wordForm.value
    console.log(wordFormValue)
    let submitWordButton = document.querySelector('.submitWordButton')
    submitWordButton.addEventListener("click", submitWord)
    }
    function submitWord(event) {
        event.preventDefault()
        let wordFormValue = document.querySelector('.wordForm').value
        console.log(wordFormValue)
        word =wordFormValue 
        console.log(word)
        createClueForm()
    }

function createClueForm(){
    let hiddenElements = document.querySelectorAll('.reveal')
        for (let i=0;i<hiddenElements.length;i++){
            hiddenElements[i].classList.add('secret')
        }
    let submitClueButton = document.querySelector('#button2')
    let hiddenElements2 = document.querySelectorAll('.secret2')
    for (let i=0;i<hiddenElements2.length;i++){
        hiddenElements2[i].classList.remove('secret2')
    }
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
    var form2 = document.getElementById('form2');
    form2.remove();
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
        console.log(lettersGuessed)

        for (let k=0; k<lettersGuessed.length; k++){
            let valuee = guessField.value
            console.log(guessField.value)
            console.log(valuee)
            console.log(lettersGuessed)
            if (lettersGuessed[k] === valuee){
                document.querySelector(".letterField").value = ''
            }
        } 
        
        //
        if (word.includes(guessField.value)){
            for (let i=0; i<word.length; i++){
                if(word[i]== guessField.value) {
                    lettersGuessed.push(guessField.value)
                    score+=1 
                    console.log(guessField.value)
                    let selectLetters = document.querySelector(`[class = ${word[i]}]`)
                    console.log(selectLetters)
                    // if(selectLetters.classList.includes('visibility')){
                    //     document.querySelector(".letterField").value = ''
                    // } else {
                    selectLetters.classList.add('visibility')
                    console.log(guessField.value)
                    // let h2score = document.querySelector('.score')
                    // h2score.textContent = `Score:${score}`
                    winner()
                } 
            }
            document.querySelector(".letterField").value = ''
        } else { 
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
        endGame.textContent = " "
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
        endGame.textContent = " Well Done! "
    }
}



