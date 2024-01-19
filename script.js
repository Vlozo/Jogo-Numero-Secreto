
let max_number = 1000;
let secret_number = parseInt(Math.random() * max_number) + 1;
let attempts = 12;

let guess = document.getElementById('guess');
let attempts_count = document.querySelector('#attempts_count');

let button = document.querySelector('#guess_btn');
button.addEventListener('click', validateInput);

document.addEventListener('keypress', function(event){
    if (event.key === 'Enter'){
        button.click();
    }
})

function guessNumber(){
    if (attempts > 0){
        if (guess.value == secret_number) {
            playerWins();
        } else {
            attempts--;
            if (attempts == 0){ 
                playerLoses();
            }
            let attempts_verbose = attempts > 1 ? 'tentativas' : 'tentativa';
            attempts_count.innerHTML = `Você tem <strong>${attempts}</strong> ${attempts_verbose}.`;
            showGuessHistory();
            cleanAndFocus();
        }
    } else {
        playerLoses();
    }
  
}

function showGuessHistory(){
    let guess_history = document.querySelector('#guess_history');
    let li = document.createElement("li");
    let hint = (guess.value > secret_number)? "é menor que" : "é maior que";
    li.innerHTML = `&#10060; <strong>Tentativa ${12 - attempts}</strong>: o número secreto ${hint} <strong>${guess.value}</strong>`;
    guess_history.appendChild(li);

}

function playerWins(){
    document.write("<head><link rel='stylesheet' href='style.css'></head>");
    if (attempts == 12){
        document.write(`<div class="end_screen"><h1>WOW, VOCÊ ACERTOU DE PRIMEIRA!!</h1><h2>O número secreto era ${secret_number}</h2>`);
        document.write("<p>Na primeira tentativa?! Acho que você realmente deve ser experiente em adivinhações númericas.</p>");
        document.write(`<a class="end_action" href=".">Jogar Novamente</a></div>`);
    } else {
        document.write("<div class='end_screen'><h1>Parabéns, você acertou!!</h1>");
        document.write(`<p>O número secreto era <strong>${secret_number}</strong>, você conseguiu em <strong>${12 - attempts + 1}</strong> tentativas.</p>`);
        document.write(`<a class="end_action" href=".">Jogar Novamente</a></div>`);
    }
}

function playerLoses(){
    document.write("<head><link rel='stylesheet' href='style.css'></head>");
    document.write(`<div class='end_screen'><h1>Você perdeu!</h1>`);
    document.write(`<p>Infelizmente suas tentativas acabaram, o número secreto era <strong>${secret_number}</strong>.</p>`);
    document.write(`<a class="end_action" href=".">Revanche</a></div>`);
}

function validateInput(){
    let regex = /^(?!$)\d+$/;
    let validation = regex.test(guess.value);
    if (validation){
        if (guess.value > 1000){
            alert('Entrada inválida: O número inserido como palpite deve ser entre 1 e 1000');
            cleanAndFocus();
        } else {
            guessNumber();
        }
    } else {
        alert("Entrada inválida: O palpite deve ser composto apenas por números");
        cleanAndFocus();
    }
}

function cleanAndFocus(){
    guess.value = "";
    guess.focus();
}


