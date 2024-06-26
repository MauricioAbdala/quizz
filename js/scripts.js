// Declaração de variáveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

//Perguntas

const questions = [
    {
        "question": "PHP foi desenvolvido para qual fim?",
        "answers": [
            {
                "answer": "back-end",
                "correct": true
            },
            {
                "answer": "front-end",
                "correct": false
            },
            {
                "answer": "Sistema operacional",
                "correct": false
            },
            {
                "answer": "Banco de dados",
                "correct": false
            },
        ]
    },
    {
        "question": "Uma forma de declarar variável em JavaScript:",
        "answers": [
            {
                "answer": "$var",
                "correct": false
            },
            {
                "answer": "var",
                "correct": true
            },
            {
                "answer": "@var",
                "correct": false
            },
            {
                "answer": "#let",
                "correct": false
            },
        ]
    },
    {
        "question": "Qual o seletor de id no CSS?",
        "answers": [
            {
                "answer": "#",
                "correct": true
            },
            {
                "answer": ".",
                "correct": false
            },
            {
                "answer": "@",
                "correct": false
            },
            {
                "answer": "/",
                "correct": false
            },
        ]
    },
]

function init() {
    // criar a primeira pergunta
    createQuestion(0);
}

// Cria uma pergunta
function createQuestion(i) {
    //limpar a questao anterior
    const oldButtons = answersBox.querySelectorAll("button");

    oldButtons.forEach(function (btn) {
        btn.remove();
    });

    // Alterar o texto da pergunta
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    //insere alternativas
    questions[i].answers.forEach(function (answer, i) {

        //cria o template da pergunta
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        //remover hode e template class
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        // inserir a alternativa na tela

        answersBox.appendChild(answerTemplate);

        // Inserir um evento de click no botao

        answerTemplate.addEventListener("click", function () {
            checkAnswer(this);
        })
    });

    // Incrementar o numero da questao
    actualQuestion++;
}

// Verificando resposta do usuario
function checkAnswer(btn) {


    // selecionar todos os botões
    const buttons = answersBox.querySelectorAll("button");

    //verefica se a resposta esta correta e adiciona classe nos botoes
    buttons.forEach(function (button) {
        if (button.getAttribute("correct-answer") === "true") {

            button.classList.add("correct-answer");

            //checa se o usuario acertou a pergunta
            if (btn === button) {
                // incremento dos pontos  
                points++;
            }

        } else {

            button.classList.add("wrong-answer");

        }
    });

    // exibir a proxima pergunta
    nextQuestion();
}

// exibir a proxima pergunta no quizz
function nextQuestion() {

    // timer para usuario ver as respostas
    setTimeout(function () {

        // verifica se ainda ha perguntas
        if (actualQuestion >= questions.length) {
            //apresenta a msg de sucesso
            showSuccessMessage();
            return;
        }

        createQuestion(actualQuestion);

    }, 1500);
};

// funcao que exibe a tela final

function showSuccessMessage() {
   
    hideOrShowQuizz();
    // trocar dados da tela de sucesso

    //calcular score

    const score = ((points / questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector("#display-score span");

    displayScore.textContent = score.toString();

    // alterar o numero de perguntas corretas
    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;

    // alterar o total de perguntas

    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;
}

// Mostra ou esconde o score

function hideOrShowQuizz() {
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
}

// Reiniciar Quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function() {

    //zerar o jogo
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();

});

// Inicializacao do Quizz
init();
