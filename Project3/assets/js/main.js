let questions;
let questionsCount;
let currentQuestion;
let score = 0;

let question_title_elem = document.getElementById("title");
let answer_elem = document.getElementById("answers");
let action_btn = document.getElementById("action_btn");

function getQuestions() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            questions = JSON.parse(this.responseText).questions;

            questionsCount = questions.length;

            currentQuestion = 0;
        }
    }

    request.open("GET", "questions.json", false);
    request.send();
}

function displayQuestion(question) {
    question_title_elem.innerHTML = "";
    answer_elem.innerHTML = "";

    let question_title = document.createTextNode(question.title);
    question_title_elem.appendChild(question_title);

    question.answers.forEach(answer => {
        let label = document.createElement("label");

        let answer_input = document.createElement("input");
        answer_input.setAttribute("type", "radio");
        answer_input.setAttribute("name", "answer");
        answer_input.setAttribute("value", answer.id);
        answer_input.classList.add("answer");

        let answer_title = document.createTextNode(answer.answer);
        label.appendChild(answer_input);
        label.appendChild(answer_title);

        answer_elem.appendChild(label);
    });
}

action_btn.addEventListener("click", function() {
    let answers = document.getElementsByClassName("answer");
    for (let i = 0; i < answers.length; i++) {
        let answer = answers[i];
        let question = questions[currentQuestion];

        if (answer.checked && answer.value == question.correct) {
            answer.parentNode.classList.add("correct");
            score += 2;
        } else if (answer.checked && answer.value != question.correct) {
            answer.parentNode.classList.add("incorrect");
            score--;
        }

        answer.disabled = true;
    }
    currentQuestion++;
    let next_btn = document.getElementById("next_btn");
    next_btn.classList.remove("hide");
    this.classList.add("hide");

});

next_btn.addEventListener("click", function() {
    if (currentQuestion == questionsCount) {
        document.getElementById("question").classList.add("hide");
        document.getElementById("scores").classList.remove("hide");
        document.getElementById("score").innerHTML = score + "/" + questionsCount;
        return;
    }

    displayQuestion(questions[currentQuestion]);
    action_btn.classList.remove("hide");
    this.classList.add("hide");

});
// 
getQuestions();
displayQuestion(questions[currentQuestion]);