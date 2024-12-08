const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];

const submitBtn = document.getElementById("submit-button");
const inputPasswordLength = document.getElementById("password-length");
const outputOne = document.getElementById("output-one");
const outputTwo = document.getElementById("output-two");

submitBtn.addEventListener('click', generatePassword)
outputOne.addEventListener('click', () => { copyPassword(outputOne); })
outputTwo.addEventListener('click', () => { copyPassword(outputTwo); })

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
    return characters[randomNumber];
};