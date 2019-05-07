let score = 0
let chances = 7
let clue =""
let word = ""
let randomWord =""
let guessField;
let lettersGuessed = []
let incorrectGuesses = []
let acceptableInput = "abcdefghijklmnopqrstuvwxyz"
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

let twoPlayerButton = document.querySelector('.twoPlayerButton')
twoPlayerButton.addEventListener("click",showNameForm)
function showNameForm(){
    document.querySelector('.twoPlayerButton').style.display="none"
    document.querySelector('.onePlayerButton').style.display="none"
    let hiddenForm = document.querySelectorAll('.invisible')
        for (let i=0;i<hiddenForm.length;i++){
            hiddenForm[i].classList.remove('invisible')
        }
let title = document.querySelector('h3')
title.textContent = "Enter Player Names:"

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
}

function makeWordForm(){
    let hiddenElements = document.querySelectorAll('.secret')
    for (let i=0;i<hiddenElements.length;i++){
        hiddenElements[i].classList.remove('secret')
    }
    let submitWordButton = document.querySelector('.submitWordButton')
    submitWordButton.addEventListener("click", submitWord)
    }
    function submitWord(event) {
        event.preventDefault()
        let wordFormValue = document.querySelector('.wordForm').value.toLowerCase()
        console.log(wordFormValue)
        word = wordFormValue.split(' ').join('') 
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
    document.querySelector('.clue').style.display ="block"
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
    guessField.setAttribute("class", `${guessField.value.toLowerCase()}`)
    guessField.setAttribute("class", "letterField")
    guessField.setAttribute("id", "letterField")
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
            let valuee = guessField.value.toLowerCase()
            console.log(guessField.value)
            console.log(valuee)
            console.log(lettersGuessed)
            if (lettersGuessed[k] === valuee){
                $('#doubleGuess').show()
                document.querySelector(".letterField").value = ''
            }
        } 
        for (let l=0; l<incorrectGuesses.length; l++){
            let valuee = guessField.value.toLowerCase()
            console.log(guessField.value)
            console.log(valuee)
            console.log(incorrectGuesses)
            if (incorrectGuesses[l] === valuee){
                $('#doubleGuess').show()
                document.querySelector(".letterField").value = ''
            }
        } 
        if (word.includes(guessField.value.toLowerCase())){
            for (let i=0; i<word.length; i++){
                if(word[i]== guessField.value.toLowerCase()) {
                    lettersGuessed.push(guessField.value.toLowerCase())
                    score+=1 
                    console.log(guessField.value.toLowerCase())
                    let selectLetters = document.querySelector(`[class = ${word[i]}]`)
                    console.log(selectLetters)
                    selectLetters.classList.add('visibility')
                    console.log(guessField.value)
                    winner()
                } 
            }
            document.querySelector(".letterField").value = ''
        } else if (word.includes(guessField.value.toLowerCase()) != true && guessField.value.toLowerCase().length ===1){
            console.log("Wrong!")
            incorrectGuesses.push(guessField.value.toLowerCase())
            let wrongGuessContainer = document.querySelector('.incorrect')
            wrongGuessContainer.textContent = `Incorrect guesses: ${incorrectGuesses}`
            removeElement()
            gameOver()
        } else if(guessField.value.toLowerCase().length >1){
            $('#oneLetter').show()
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

function createPlaceHolders1() {

    let randomWords = [
        {dessert: 'tiramisu'},
        {icecream: 'mochi'},
        {language: 'madarin'},
        {breakfast: 'oatmeal'},
        {fruit: 'avocado'},
        {flower: 'magnolia'},
        {hobby: 'gardening'},
        {paint: 'gouache'},
        {nature: 'cactus'},
        {animal: 'lemur'},
        {career: 'anthropologist'},
        {weather: 'precipitation'},
        {pink: 'flamingo'},
        {pet:'chihuahua'},
        {travel: 'itinerary'},
        {slow: 'sloth'}
    ]
    let randomObject = randomWords[Math.floor(Math.random()*randomWords.length)]
    console.log(randomObject)
    clue = Object.keys(randomObject).join()
    console.log(clue)
    randomWord = Object.values(randomObject).join()
    console.log(randomWord)
    document.querySelector('.clue').style.display ="block"
    let h2clue = document.querySelector('.clue')
    h2clue.textContent = `Clue: ${clue}`

    let directions = document.querySelector('h3')
    let player1 = document.getElementById('p1name').value
    directions.textContent = `Welcome ${player1}! Guess a letter.`
    console.log("working")
    for (let i =0; i<randomWord.length; i++) {
    let letterDiv = document.createElement("div")
    wordContainer.appendChild(letterDiv)
    letterDiv.classList = "letterDiv"
    let p = document.createElement('p')
    letterDiv.appendChild(p)
    p.textContent = randomWord[i]
    p.setAttribute("class",`${randomWord[i]}`)
    console.log(p)
    }
}


let onePlayerButton = document.querySelector('.onePlayerButton')
onePlayerButton.addEventListener("click",showNameForm1)
function showNameForm1(){
    let title = document.querySelector('h3')
    title.textContent = "Enter Name:"
    document.querySelector('.twoPlayerButton').style.display="none"
    document.querySelector('.onePlayerButton').style.display="none"
    let hiddenForm = document.querySelectorAll('.invisible1')
        for (let i=0;i<hiddenForm.length;i++){
            hiddenForm[i].classList.remove('invisible')
        }

        let playersButton = document.getElementById("submitPlayers")
        playersButton.addEventListener("click", displayNames)
        function displayNames(event){
            event.preventDefault()
            let player1 = document.getElementById('p1name').value
            let instructions = document.querySelector('h3')
            instructions.innerHTML = `${player1}, guess a letter`
            document.getElementById('p1name').style.display ="none"
            document.getElementById('p2name').style.display ="none"
            document.getElementById('submitPlayers').style.display ="none"
            createPlaceHolders1()
            setUp2()
        } 

}

function setUp2(){
    let formContainer = document.createElement('FORM')
    let container = document.querySelector('.playersContainer')
    container.appendChild(formContainer)
    let guessField = document.createElement('INPUT')
    guessField.setAttribute("type", "text")
    guessField.setAttribute("placeholder", "Enter letter")
    guessField.setAttribute("class", `${guessField.value.toLowerCase()}`)
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
            let valuee = guessField.value.toLowerCase()
            console.log(guessField.value)
            console.log(valuee)
            console.log(lettersGuessed)
            if (lettersGuessed[k] === valuee){
                $('#doubleGuess').show()
                document.querySelector(".letterField").value = ''
            }
        } 
        for (let p=0; p<incorrectGuesses.length; p++){
            let valuee = guessField.value.toLowerCase()
            console.log(guessField.value)
            console.log(valuee)
            console.log(incorrectGuesses)
            if (incorrectGuesses[p] === valuee){
                $('#doubleGuess').show()
                document.querySelector(".letterField").value = ''
            }
        } 
        if (randomWord.includes(guessField.value.toLowerCase())){
            for (let i=0; i<randomWord.length; i++){
                if(randomWord[i]=== guessField.value.toLowerCase()) {
                    lettersGuessed.push(guessField.value.toLowerCase())
                    score+=1 
                    console.log(score)
                    console.log(guessField.value.toLowerCase())
                    let selectLetters = document.querySelector(`[class = ${randomWord[i]}]`)
                    console.log(selectLetters)
                    selectLetters.classList.add('visibility')
                    console.log(guessField.value)
                    winner2()
                } 
            }
            document.querySelector(".letterField").value = ''
        } else if (randomWord.includes(guessField.value.toLowerCase()) != true && guessField.value.toLowerCase().length ===1){
            console.log("Wrong!")
            incorrectGuesses.push(guessField.value.toLowerCase())
            let wrongGuessContainer = document.querySelector('.incorrect')
            wrongGuessContainer.textContent = `Incorrect guesses: ${incorrectGuesses}`
            removeElement()
            gameOver2()
        } else if(guessField.value.toLowerCase().length >1){
            $('#oneLetter').show()
        }
        document.querySelector(".letterField").value = ''
    })
}


function gameOver2(){
    if (elements.length === 0) {
        console.log("player1 wins")
        let player2 = document.getElementById('p2name').value
        let banner = document.querySelector('.banner')
        banner.setAttribute("class", "banner")
        banner.textContent = "You got scooped!"
        let allLetters = document.querySelectorAll('p')
        for (let i=0;i<allLetters.length;i++){
            allLetters[i].classList.add('visibility')
        }
        let endGame = document.querySelector('h3')
        endGame.textContent = `Better luck next time ${player2}!`
    }
    
}

function winner2 (){
    if (score >= randomWord.length){
        let player1 = document.getElementById('p1name').value
        let banner = document.querySelector('.banner')
        banner.textContent = "You win!"
        let endGame = document.querySelector('h3')
        endGame.textContent = `Well done ${player1}!`
    }
}
