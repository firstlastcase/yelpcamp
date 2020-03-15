
// document.querySelector('button[type="submit"]').disabled =true;
let submitButton      =   document.getElementById('submit'),
    // userInput   =   document.querySelector('input[type="email]'),
    pw1Input    =   document.getElementById('password'),
    pw2Input    =   document.getElementById('confirmPassword');

// let inputs = [userInput, pw1Input, pw2Input];

submitButton.disabled = true;

function checkPass() {
    // if(pw2Input.value !==pw1Input.value || userInput.value==''){
    if(pw2Input.value !==pw1Input.value){    
        submitButton.disabled = true;
    } 
    else {
        submitButton.disabled = false;
    }
}


// checkPass();

// || document.getElementById('confirmPassword').value !== document.getElementById('password').value




//     } 