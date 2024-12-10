const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];

// The password length inputted by the user. Requires a length between 1 and 16
const inputPasswordLength = document.getElementById("password-length");

// The Generate Password button.
// The eventListener generates two passwords and outputs them into the two output fields.
// The button won't do anything unless the inputted password length is between 1 and 16.
const submitBtn = document.getElementById("submit-button");
submitBtn.addEventListener('click', generatePassword)

// The two output fields.
// The eventListeners allow the user to copy the generated passwords to their clipboard by clicking on either of the two output fields.
const outputOne = document.getElementById("output-one");
const outputTwo = document.getElementById("output-two");
outputOne.addEventListener('click', () => { copyPassword(outputOne); })
outputTwo.addEventListener('click', () => { copyPassword(outputTwo); })

const outputMessage = document.getElementById("output-messsage");

// The two checkboxes for whether the user wants to exclude either or both symbols and numbers in the generated passwords.
const symbolsCheckbox = document.getElementById("symbols-checkbox");
const numbersCheckbox = document.getElementById("numbers-checkbox");
let noSymbols = false;
let noNumbers = false;
// The code below reverses the boolean value of noSymbols and noNumber whenever the checkboxes are ticked or unticked.
symbolsCheckbox.addEventListener('change', function() {
    noSymbols = !noSymbols
})
numbersCheckbox.addEventListener('change', function() {
    noNumbers = !noNumbers
})


// Allows the user to copy the generated password suggestions as long as the output fields are not empty.
// Is activated whenever the user clicks on either of the two output fields.
function copyPassword(output) {
    if (output.textContent !== "") {
        navigator.clipboard.writeText(output.textContent)
    }
}

function generatePassword() {
    // The password length inputted by the user is used. It is also floored in case anyone decides to try and input a decimal value.
    let passwordLength = Math.floor(inputPasswordLength.value);

    // Empties the two output fields before inputting new password suggestions.
    outputOne.textContent = "";
    outputTwo.textContent = "";

    // The function will only run if the inputted length is between 1 and 16. No negative or ridiculously large values.
    if (passwordLength >= 1 && passwordLength <= 16) {
        for(let i = 1; i <= passwordLength; i++) {
            outputOne.textContent += getCharacter();
            outputTwo.textContent += getCharacter();
        }
        // The message "Click on the password to copy it to clipboard." becomes visible only after generating passwords.
        outputMessage.style.visibility = "visible";
    }
}


function getCharacter() {
    // Randomizes a number according to the length of the index characters.
    let randomNumber = Math.floor(Math.random() * characters.length);
    
    if (noSymbols === true && noNumbers === true) {
        // If the user has checked to exclude both symbols and numbers.
        // Checks the index of the randomized number.
        // If the index ISN'T any of the letters a-z or A-Z (i.e. it's a number or symbol), then randomize a new number and check the new index.
        while (/[^a-zA-Z]/.test(characters[randomNumber]) === true) {
            randomNumber = Math.floor(Math.random() * characters.length);
        }
    } else if (noSymbols === true) {
        // If only symbols are to be excluded.
        // Checks the index of the randomized number.
        // If the index ISN'T any of the letters a-z, A-Z or numbers 0-9 (i.e. it's a symbol), then randomize a new number and check the new index.
        while (/[^a-zA-Z0-9]/.test(characters[randomNumber]) === true) {
            randomNumber = Math.floor(Math.random() * characters.length);
        }
    } else if (noNumbers === true) {
        // If only numbers are to be excluded.
        // Checks the index of the randomized number.
        // If the index IS a number, then randomize a new number and check the new index.
        while (isNaN(characters[randomNumber]) === false) {
            randomNumber = Math.floor(Math.random() * characters.length);
        }
    }
    // Returns the randomized index after the above conditions are met.
    return characters[randomNumber];
};