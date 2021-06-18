//#region variaveis

// variaveis de get elements
// Nav Bar ###
var nav = document.querySelector("nav"); // nav bar
var options = document.getElementById("options"); // aceder as options
var overlay = document.getElementById("overlay"); // overlay [options]
var confirmed = document.getElementById("confirm"); // confirmar options
var play = document.getElementById("play"); // jogar o quiz
var leaderboard = document.getElementById("leaderboard"); // aceder a leaderboard
// Gameplay ###
var gameForm = document.getElementById("game-Form"); // form do jogo
var leaderForm = document.getElementById("leader-Form"); // form de leaderboard
var img = document.getElementById("img"); // imagem [categoria]
var btn1 = document.getElementById("btn1"); // resposta 1
var btn2 = document.getElementById("btn2"); // resposta 2
var btn3 = document.getElementById("btn3"); // resposta 3
var btn4 = document.getElementById("btn4"); // resposta 4
var question = document.getElementById("question"); // pergunta
var btnContainer = document.getElementById("btn-container");
// Game Over ###
var overlay2 = document.getElementById("overlay2"); // overlay2 [menu do game over]
var names = document.getElementById("name"); // [input] para colocar nome do player
var leaderboard2 = document.getElementById("leaderboard2"); // [btn] aceder a leaderboard
var restart = document.getElementById("restart"); // [btn] jogar o quiz (restart)
var setName = document.getElementById("setName"); // [btn] so confirma o player name 
var score = document.getElementById("score"); // mostrar pontos do player

// timer
var timerBody = document.getElementById("timer"); // corpo do timer
var timeLabel = document.getElementById("time"); // timer label

// leaderboard
var firstName = document.getElementById("first-Name"); // nome do primeiro jogador na leaderboard
var firstScore = document.getElementById("first-Score"); // score do primeiro jogador na leaderboard
var secondName = document.getElementById("second-Name"); // nome do primeiro jogador na leaderboard
var secondScore = document.getElementById("second-Score"); // score do primeiro jogador na leaderboard
var thirdName = document.getElementById("third-Name"); // nome do primeiro jogador na leaderboard
var thirdScore = document.getElementById("third-Score"); // score do primeiro jogador na leaderboard
var fourthName = document.getElementById("fourth-Name"); // nome do primeiro jogador na leaderboard
var fourthScore = document.getElementById("fourth-Score"); // score do primeiro jogador na leaderboard
var fifthName = document.getElementById("fifth-Name"); // nome do primeiro jogador na leaderboard
var fifthScore = document.getElementById("fifth-Score"); // score do primeiro jogador na leaderboard
var lastName = document.getElementById("last-Name"); // nome do ultimo jogador que jogou
var lastScore = document.getElementById("last-Score"); // score do ultimo jogador que jogou

// variaveis
var data; // api stuff
var questions = false; // verifica se ja recebeu o Q&A
var count = 0; // conta as perguntas respondidas
var correctAnswer; // recebe a resposta correta
var btnclicked; // verifica qual o botao clickado
var playerPoints = 0; // score do player
var name;
var maxQuestions = 10; // numero max de questoes
var gameOver = false; // verifica se o game over esta ativado
var leaderboardActive = false; // verifica se a leader board esta a ser mostrada
var timer;
var time = 10; // tempo inicial
var maxTime = 0; // tempo maximo
var timeEnded = false; // verificador de tempo
var gotToRed = false; // verificador de animaçao timer
var gotToYellow = false; // verificador de animaçao timer
//#endregion

//#region leaderboard Stuff

// objetos
var playerList = []; // lista de players

//criar players
function Player(name, points) {
    this.name = name;
    this.points = points;
    this.nature = "player";
}

// criar players continuação
function createPlayer() {
    if (names.value != "") {
        playerList.push(new Player(names.value, points = playerPoints)); // add na lista o player
    } else {
        playerList.push(new Player("El Anonymo", points = playerPoints)); // add na lista o player anonimo
    }
    saveOnStorage(playerList);
}

// guarda o player no local storage
function saveOnStorage(list) {
    localStorage.setItem("users", JSON.stringify(list)); // converte para string e guarda no local storage
}

// easier sort #using now
function sortLeaderboard() {
    playerList = playerList.sort((a, b) => b.points - a.points);
}

// sort hard coded
function sortLeaderboardOld() {
    // algoritmo para dar sort [hard code]
    for (let i = 0; i < playerList.length - 1; i++) {
        let aux;
        for (let j = 1; j < playerList.length; j++) {
            if (playerList[i].points <= playerList[j].points) {
                aux = playerList[i];
                playerList[i] = playerList[j];
                playerList[j] = aux;
            }
        }
    }
}

// atualizar leaderboard
function updateLeaderboard() {
    sortLeaderboard();

    let size = playerList.length;

    if (size == 1) {
        firstName.innerHTML = playerList[0].name;
        firstScore.innerHTML = playerList[0].points;

    } else if (size == 2) {
        firstName.innerHTML = playerList[0].name;
        firstScore.innerHTML = playerList[0].points;
        secondName.innerHTML = playerList[1].name;
        secondScore.innerHTML = playerList[1].points;

    } else if (size == 3) {
        firstName.innerHTML = playerList[0].name;
        firstScore.innerHTML = playerList[0].points;
        secondName.innerHTML = playerList[1].name;
        secondScore.innerHTML = playerList[1].points;
        thirdName.innerHTML = playerList[2].name;
        thirdScore.innerHTML = playerList[2].points;

    } else if (size == 4) {
        firstName.innerHTML = playerList[0].name;
        firstScore.innerHTML = playerList[0].points;
        secondName.innerHTML = playerList[1].name;
        secondScore.innerHTML = playerList[1].points;
        thirdName.innerHTML = playerList[2].name;
        thirdScore.innerHTML = playerList[2].points;
        fourthName.innerHTML = playerList[3].name;
        fourthScore.innerHTML = playerList[3].points;

    } else if (size >= 5) {
        firstName.innerHTML = playerList[0].name;
        firstScore.innerHTML = playerList[0].points;
        secondName.innerHTML = playerList[1].name;
        secondScore.innerHTML = playerList[1].points;
        thirdName.innerHTML = playerList[2].name;
        thirdScore.innerHTML = playerList[2].points;
        fourthName.innerHTML = playerList[3].name;
        fourthScore.innerHTML = playerList[3].points;
        fifthName.innerHTML = playerList[4].name;
        fifthScore.innerHTML = playerList[4].points;
    }
}

// dar load do storage e passar as strings para objetos e guardar no arr - playerList
function loadStorage() {
    if (localStorage.getItem("users") === null) {
        // nao faz nada
    } else {
        const list = JSON.parse(localStorage.users); // converte de string para json

        console.log("Dom fully loaded..."); // informaçao sobre o ready state do dom
        for (const user of list) {
            playerList.push(new Player(user.name, user.points));
        }
        updateLeaderboard();
    }
}

// chamar o loadStorage ao carregar o DOM
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadStorage); // carrega o dom e chama funçao

} else {
    loadStorage();
}

// chamar clearLS na consola para limpar o local storage
function clearLS() {
    localStorage.clear();
    if (playerList[0] == "") {
        playerList.push(new Player("El Anonymo", 0));
    }
    localStorage.setItem("users", JSON.stringify(playerList));
}
//#endregion

//#region Gameplay stuff

//  vai buscar as perguntas e respostas da API
async function getQnA() {
    return await fetch('https://opentdb.com/api.php?amount=10')
        .then((res) => res.json())
        .then((res) => {
            if (res.response_code == 0) {
                data = res.results;
                showQnA(data);
                console.log(data);
            }

            return data;
        })
        // .then(img.src = `https://source.unsplash.com/400x200/?${data[0].category.split(":")[0]}`)
        .catch((err) => {
            console.error("Questions not found!");
            console.log(err);
        });
}

// mostrar perguntas
async function showQnA(data) {
    resetBtns();

    // muda a imagem para o tema da pergunta
    img.src = `https://source.unsplash.com/400x200/?${data[count].category.split(":")[0]}`;

    question.innerHTML = data[count].question; // mostra a pergunta

    if (data[count].type != "boolean") {
        shuffleA(data);
    } else {
        btn3.classList.add("hide");
        btn4.classList.add("hide");

        shuffleA(data);

        btnContainer.style.justifyContent = "center";
        btn1.classList.add("bools");
        btn2.classList.add("bools");
    }
}

// validar resposta
function answerValidation() {
    // desabilita botoes
    btn1.disabled = true;
    btn2.disabled = true;
    btn3.disabled = true;
    btn4.disabled = true;

    // condiçoes para botao clickado
    switch (btnclicked) {
        case 1:
            if (correctAnswer == btn1.innerHTML) {
                btn1.classList.add("correct");
                playerPoints++;

            } else {
                btn1.classList.add("wrong");

                if (correctAnswer == btn2.innerHTML) {
                    btn2.classList.add("correct2");

                } else if (correctAnswer == btn3.innerHTML) {
                    btn3.classList.add("correct2");

                } else if (correctAnswer == btn4.innerHTML) {
                    btn4.classList.add("correct2");
                }
            }

            break;

        case 2:
            if (correctAnswer == btn2.innerHTML) {
                btn2.classList.add("correct");
                playerPoints++;

            } else {
                btn2.classList.add("wrong");

                if (correctAnswer == btn1.innerHTML) {
                    btn1.classList.add("correct2");

                } else if (correctAnswer == btn3.innerHTML) {
                    btn3.classList.add("correct2");

                } else if (correctAnswer == btn4.innerHTML) {
                    btn4.classList.add("correct2");
                }
            }

            break;

        case 3:
            if (correctAnswer == btn3.innerHTML) {
                btn3.classList.add("correct");
                playerPoints++;

            } else {
                btn3.classList.add("wrong");

                if (correctAnswer == btn1.innerHTML) {
                    btn1.classList.add("correct2");

                } else if (correctAnswer == btn2.innerHTML) {
                    btn2.classList.add("correct2");

                } else if (correctAnswer == btn4.innerHTML) {
                    btn4.classList.add("correct2");
                }
            }

            break;

        case 4:
            if (correctAnswer == btn4.innerHTML) {
                btn4.classList.add("correct");
                playerPoints++;

            } else {
                btn4.classList.add("wrong");

                if (correctAnswer == btn1.innerHTML) {
                    btn1.classList.add("correct2");

                } else if (correctAnswer == btn3.innerHTML) {
                    btn3.classList.add("correct2");

                } else if (correctAnswer == btn2.innerHTML) {
                    btn2.classList.add("correct2");
                }
            }

            break;

        default:
            count++;
            console.log(count);
            if (timeEnded) {
                if (correctAnswer == btn1.innerHTML) {
                    btn1.classList.add("correct2");
                    btn2.classList.add("wrong2");
                    btn3.classList.add("wrong2");
                    btn4.classList.add("wrong2");

                } else if (correctAnswer == btn2.innerHTML) {
                    btn2.classList.add("correct2");
                    btn1.classList.add("wrong2");
                    btn3.classList.add("wrong2");
                    btn4.classList.add("wrong2");

                } else if (correctAnswer == btn3.innerHTML) {
                    btn3.classList.add("correct2");
                    btn1.classList.add("wrong2");
                    btn2.classList.add("wrong2");
                    btn4.classList.add("wrong2");

                } else if (correctAnswer == btn4.innerHTML) {
                    btn4.classList.add("correct2");
                    btn1.classList.add("wrong2");
                    btn2.classList.add("wrong2");
                    btn3.classList.add("wrong2");
                }
            }

            setTimeout(function () {
                resetFx();
            }, 2000);

            endQnA();

            // verifica se o gameOver e falso
            if (!gameOver) {
                setTimeout(function () {
                    showQnA(data);
                }, 2000);

                setTimeout(function () {
                    time = 11;
                    timerF();
                }, 1300);
            }

            break;
    }
}

// baralhar respostas
function shuffleA(data) {
    // variaveis
    let rndArr = [];
    let aux;
    let x = 0;

    // algoritmo para baralhar respostas

    if (data[count].type != "boolean") {
        rndArr = [data[count].correct_answer, data[count].incorrect_answers[0], data[count].incorrect_answers[1], data[count].incorrect_answers[2]]; // por as respostas dentro do arr

        correctAnswer = data[count].correct_answer; // receber as correct answers

        // gerar numero e randomizar o arr
        for (let i = 0; i < rndArr.length; i++) {
            while (i == x) {
                x = Math.floor(Math.random() * rndArr.length);
            }

            // troca respostas
            aux = rndArr[i];
            rndArr[i] = rndArr[x];
            rndArr[x] = aux;

            x = Math.floor(Math.random() * rndArr.length); //voltar a gerar numero rnd
        }

        // atribuir respostas aos buttons
        btn1.innerHTML = rndArr[0];
        btn2.innerHTML = rndArr[1];
        btn3.innerHTML = rndArr[2];
        btn4.innerHTML = rndArr[3];

    } else {
        rndArr = [data[count].correct_answer, data[count].incorrect_answers[0]]; // por as respostas dentro do arr

        correctAnswer = data[count].correct_answer; // receber as correct answers

        // gerar numero e randomizar o arr
        for (let i = 0; i < rndArr.length; i++) {
            x = Math.floor(Math.random() * rndArr.length); //voltar a gerar numero rnd

            // troca respostas
            aux = rndArr[i];
            rndArr[i] = rndArr[x];
            rndArr[x] = aux;
        }

        // atribuir respostas aos buttons
        btn1.innerHTML = rndArr[0];
        btn2.innerHTML = rndArr[1];
    }

    // algoritmo para baralhar respostas - fim
}

// resetar os botoes 
function resetBtns() {
    // bool reseting
    btnContainer.style.justifyContent = "flex-start";

    btn1.classList.remove("wrong");
    btn1.classList.remove("correct");
    btn1.innerHTML = "A. Answer";
    btn1.disabled = false;
    btn1.classList.remove("correct2");
    btn1.classList.remove("bools");

    btn2.classList.remove("wrong");
    btn2.classList.remove("correct");
    btn2.innerHTML = "B. Answer";
    btn2.disabled = false;
    btn2.classList.remove("correct2");
    btn2.classList.remove("bools");

    btn3.classList.remove("hide");
    btn3.classList.remove("wrong");
    btn3.classList.remove("correct");
    btn3.innerHTML = "C. Answer";
    btn3.disabled = false;
    btn3.classList.remove("correct2");

    btn4.classList.remove("hide");
    btn4.classList.remove("wrong");
    btn4.classList.remove("correct");
    btn4.innerHTML = "D. Answer";
    btn4.disabled = false;
    btn4.classList.remove("correct2");
}

// resetar animaçoes dos botoes
function resetFx() {
    btn1.classList.remove("bools");
    btn1.classList.remove("wrong");
    btn1.classList.remove("wrong2");
    btn1.classList.remove("correct");
    btn1.classList.remove("correct2");
    btn1.innerHTML = "A. Answer";

    btn2.classList.remove("bools");
    btn2.classList.remove("wrong");
    btn2.classList.remove("wrong2");
    btn2.classList.remove("correct");
    btn2.classList.remove("correct2");
    btn2.innerHTML = "B. Answer";

    btn3.classList.remove("hide");
    btn3.classList.remove("wrong");
    btn3.classList.remove("wrong2");
    btn3.classList.remove("correct");
    btn3.classList.remove("correct2");
    btn3.innerHTML = "C. Answer";

    btn4.classList.remove("hide");
    btn4.classList.remove("wrong");
    btn4.classList.remove("wrong2");
    btn4.classList.remove("correct");
    btn4.classList.remove("correct2");
    btn4.innerHTML = "D. Answer";

    names.value = "";
}

// acabar o jogo
function endQnA() {
    // verificaçao do numero de perguntas efetuadas
    if (maxQuestions == count) {
        clearInterval(timer);
        btn1.disabled = true;
        btn2.disabled = true;
        btn3.disabled = true;
        btn4.disabled = true;

        gameOver = true;
        questions = false;
        count = 0;

        setTimeout(function () {
            overlay2.style.left = 0;
            score.innerHTML = "Score: " + playerPoints;
            question.innerHTML = "☛ question here! ☚";
            timeLabel.style.textShadow = "0 0 4px White";
            timerBody.style.border = "2px solid #b8333f";
            timerBody.style.boxShadow = "0px 0px 10px 1px red";
            time = 10;
            timeLabel.innerHTML = time;
        }, 2000);
    }
}

// temportizador 
function timerF() {
    timer = setInterval(function () {
        time--;

        // animaçoes timer
        timeLabel.innerHTML = time;
        timeLabel.classList.add("textBlur");

        setTimeout(() => {
            timeLabel.classList.remove("textBlur");
        }, 600);

        if (time == 10) {
            if (gotToRed) {
                timerBody.classList.add("redToGreen");
                timerBody.style.border = "2px solid #49b833";
                timerBody.style.boxShadow = "0px 0px 10px 1px #2bff00";
                timeLabel.style.textShadow = "0 0 12px #2bff00";

                setTimeout(function () {
                    timerBody.classList.remove("redToGreen");
                }, 1100);

            } else if (gotToYellow) {
                timerBody.classList.add("yellowToGreen");
                timerBody.style.border = "2px solid #49b833";
                timerBody.style.boxShadow = "0px 0px 10px 1px #2bff00";
                timeLabel.style.textShadow = "0 0 12px #2bff00";

                setTimeout(function () {
                    timerBody.classList.remove("yellowToGreen");
                }, 1100);
            }

            gotToRed = false;
            gotToYellow = false;

        } else if (time == 6) {
            gotToYellow = true;
            timerBody.classList.add("greenToYellow");
            timerBody.style.border = "2px solid #b6b833";
            timerBody.style.boxShadow = "0px 0px 10px 1px #fffb00";
            timeLabel.style.textShadow = " 0 0 12px #fffb00";

            setTimeout(function () {
                timerBody.classList.remove("greenToYellow");
            }, 1100);

        } else if (time == 3) {
            gotToYellow = false;
            gotToRed = true;
            timerBody.classList.add("yellowToRed");
            timerBody.style.border = "2px solid #b8333f";
            timerBody.style.boxShadow = "0px 0px 10px 1px red";
            timeLabel.style.textShadow = "0 0 12px red";

            setTimeout(function () {
                timerBody.classList.remove("yellowToRed");
            }, 1100);
        }

        // skip da pergunta caso excedeu tempo limite
        if (time == maxTime) {
            clearInterval(timer);
            timeEnded = true;
            btnclicked = 0;
            answerValidation();
        }
    }, 1000);
}
//#endregion

// #region answers eventlisteners

// eventlistener resposta a)
btn1.addEventListener("click", () => {
    count++;
    btnclicked = 1;
    clearInterval(timer);

    console.log(count);
    answerValidation();

    setTimeout(function () {
        resetFx();
    }, 2000);

    endQnA();

    if (!gameOver) {
        setTimeout(function () {
            showQnA(data);
        }, 2000);

        setTimeout(function () {
            time = 11;
            timerF();
        }, 1300);
    }

})

// eventlistener resposta b)
btn2.addEventListener("click", () => {
    count++;
    btnclicked = 2;
    clearInterval(timer);

    console.log(count);
    answerValidation();

    setTimeout(function () {
        resetFx();
    }, 2000);

    endQnA();

    if (!gameOver) {
        setTimeout(function () {
            showQnA(data);
        }, 2000);

        setTimeout(function () {
            time = 11;
            timerF();
        }, 1300);
    }

})

// eventlistener resposta c)
btn3.addEventListener("click", () => {
    count++;
    btnclicked = 3;
    clearInterval(timer);

    console.log(count);
    answerValidation();

    setTimeout(function () {
        resetFx();
    }, 2000);

    endQnA();

    if (!gameOver) {

        setTimeout(function () {
            showQnA(data);
        }, 2000);

        setTimeout(function () {
            time = 11;
            timerF();
        }, 1300);
    }
})

// eventlistener resposta d)
btn4.addEventListener("click", () => {
    count++;
    btnclicked = 4;
    clearInterval(timer);

    console.log(count);
    answerValidation();

    setTimeout(function () {
        resetFx();
    }, 2000);

    endQnA();

    if (!gameOver) {

        setTimeout(function () {
            showQnA(data);
        }, 2000);

        setTimeout(function () {
            time = 11;
            timerF();
        }, 1300);
    }
})
//#endregion

//#region funçoes dos botoes da nav bar

// play button
play.addEventListener("click", async () => {
    playerPoints = 0;
    timeLabel.innerHTML = time;
    gameForm.scrollIntoView(); // da scroll ate ao gameform
    nav.style.backgroundColor = "rgba(0, 0, 0, .6)";
    overlay.style.left = "-100%";

    timerBody.classList.add("redToGreen");
    timerBody.style.border = "2px solid #49b833";
    timerBody.style.boxShadow = "0px 0px 10px 1px #2bff00";
    timeLabel.style.textShadow = " 0 0 12px #2bff00";

    setTimeout(function () {
        timerBody.classList.remove("redToGreen");
    }, 1100);


    setTimeout(async function () {
        time = 10;
        // verifica se ja recebu o arr de perguntas
        if (!questions) {
            let data = await getQnA();
            questions = true;
            gameOver = false;
            timerF();
        }
    }, 500);

})

// mostra as opçoes
options.addEventListener("click", () => {
    gameForm.scrollIntoView();
    nav.style.backgroundColor = "rgba(0, 0, 0, .6)";

    setTimeout(async function () {
        overlay.style.left = 0;
    }, 500);
})

// esconde as opçoes + ...
confirmed.addEventListener("click", () => {
    overlay.style.left = "-100%";
    alert("Coming Soon!!");
})

// mostra leaderboard
leaderboard.addEventListener("click", async () => {
    // verifica se a pagina do leaderboard esta visivel
    if (leaderboardActive == false) {
        leaderForm.classList.remove("hide");
        leaderboardActive = true
        leaderForm.scrollIntoView(); // socroll para a pagina do leaderboard
        nav.style.backgroundColor = "rgba(0, 0, 0, .9)";

    } else {
        // caso esteja ativa ao clickar esconde a mesma
        gameForm.scrollIntoView();
        nav.style.backgroundColor = "rgba(0, 0, 0, .6)";
        setTimeout(function () {
            leaderForm.classList.add("hide");
            leaderboardActive = false
        }, 500);
    }
})

//#endregion funçoes dos botoes da nav bar

//#region game over functions

// restart button [game over menu]
restart.addEventListener("click", async () => {
    // cria o player, da reset ao jogo e recomeça o mesmo
    overlay2.style.left = "-100%";
    createPlayer();

    updateLeaderboard();

    setTimeout(async function () {
        playerPoints = 0;
        timeLabel.innerHMTL = time;

        timerBody.classList.add("redToGreen");
        timerBody.style.border = "2px solid #49b833";
        timerBody.style.boxShadow = "0px 0px 10px 1px #2bff00";
        timeLabel.style.textShadow = " 0 0 12px #2bff00";

        setTimeout(function () {
            timerBody.classList.remove("redToGreen");
        }, 1100);

        if (names.value != "") {
            lastName.innerHTML = names.value;
        } else {
            lastName.innerHTML = "El Anonymo";
        }
        lastScore.innerHTML = playerPoints;

        // verifica se ja recebu o arr de perguntas
        if (!questions) {
            time = 10;
            let data = await getQnA();
            questions = true;
            gameOver = false;
            timerF();
        }
    }, 1000);
})

// so confirma o player name... [game over menu]
setName.addEventListener("click", () => {
    // so cria player e fica no estado inicial da pagina
    overlay2.style.left = "-100%";
    createPlayer();

    updateLeaderboard();

    if (names.value != "") {
        lastName.innerHTML = names.value;
    } else {
        lastName.innerHTML = "El Anonymo";
    }
    lastScore.innerHTML = playerPoints;

})

leaderboard2.addEventListener("click", async () => {
    // cria o player e adiciona o jogador na leaderboard
    overlay2.style.left = "-100%";
    createPlayer();

    updateLeaderboard();

    setTimeout(async function () {
        leaderForm.classList.remove("hide");
        leaderboardActive = true

        if (names.value != "") {
            lastName.innerHTML = names.value;
        } else {
            lastName.innerHTML = "El Anonymo";
        }
        lastScore.innerHTML = playerPoints;

        leaderForm.scrollIntoView();
        nav.style.backgroundColor = "rgba(0, 0, 0, .9)";
    }, 1500);
})

//#endregion game over functions