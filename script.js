// Initial Data
let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

//Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

// Functions
function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'flex';

        document.querySelector('.question').innerHTML = q.question;
        document.querySelector('.options').innerHTML = '';

        let optionsHtml = '';
        for (let i in q.options){
            optionsHtml += `<div data-op="${i}" class="option">
            <span>${parseInt(i)+1}</span>
            ${q.options[i]}
            </div>`;
        }

        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
           item.addEventListener('click', optionClickEvent); 
        });

        document.querySelector('.acertos').innerHTML = `Questões Acertadas: ${correctAnswers}`;
    }else{
       // Acabaram as questões. 
       finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if (questions[currentQuestion].answer === clickedOption) {
        e.target.style.background = 'green';
        swal({
            title: "ACERTOU!",
            icon: "success",
          });
        correctAnswers++; 
    }else{
        e.target.style.background = 'red'; 
        swal({
            title: "ERROU!",
            icon: "error",
          });
    }

    currentQuestion++;
    setTimeout(showQuestion, 1000);
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if (points < 30 ){
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim em?!';
        document.querySelector('.scorePct').style.color = "red";
    }else if(points >= 30 && points < 70){
        document.querySelector('.scoreText1').innerHTML = 'Muito Bom!';
        document.querySelector('.scorePct').style.color = "#FFFF00";
    }else if(points >= 70){
        document.querySelector('.scoreText1').innerHTML = 'Parabens!';
        document.querySelector('.scorePct').style.color = "#0D630D";
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = `100%`;
}

function resetEvent() {
    currentQuestion = 0;
    correctAnswers = 0;
    showQuestion();
}