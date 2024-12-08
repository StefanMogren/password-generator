const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];

const inputPasswordLength = document.getElementById("password-length");

const submitBtn = document.getElementById("submit-button");
submitBtn.addEventListener('click', generatePassword)

const outputOne = document.getElementById("output-one");
const outputTwo = document.getElementById("output-two");
outputOne.addEventListener('click', () => { copyPassword(outputOne); })
outputTwo.addEventListener('click', () => { copyPassword(outputTwo); })

const symbolsCheckbox = document.getElementById("symbols-checkbox");
const numbersCheckbox = document.getElementById("numbers-checkbox");
let noSymbols = false;
let noNumbers = false;
symbolsCheckbox.addEventListener('change', function() {
    noSymbols = !noSymbols
})
numbersCheckbox.addEventListener('change', function() {
    noNumbers = !noNumbers
})

function copyPassword(output) {
    if (output.textContent !== "") {
        navigator.clipboard.writeText(output.textContent)
    }
}

function generatePassword() {
    let length = Math.floor(inputPasswordLength.value);
    outputOne.textContent = "";
    outputTwo.textContent = "";
    if (length >= 1 && length <= 25) {
        for(let i = 1; i <= length; i++) {
            outputOne.textContent += getCharacter();
            outputTwo.textContent += getCharacter();
        }
    }
}

function getCharacter() {
    let randomNumber = Math.floor(Math.random() * characters.length);
    
    if (noSymbols === true && noNumbers === true) {
        while (/[^a-zA-Z]/.test(characters[randomNumber]) === true) {
            randomNumber = Math.floor(Math.random() * characters.length);
        }
    } else if (noSymbols === true) {
        while (/[^a-zA-Z0-9]/.test(characters[randomNumber]) === true) {
            randomNumber = Math.floor(Math.random() * characters.length);
        }
    } else if (noNumbers === true) {
        while (isNaN(characters[randomNumber]) === false) {
            randomNumber = Math.floor(Math.random() * characters.length);
        }
    }
    return characters[randomNumber];
};