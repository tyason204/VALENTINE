let currentQuestion = 0;

const questions = [
    {
        question: "Are you ready to go ahead?",
        correctAnswers: ["Yes"],
        answers: ["Yes", "No"],
        type: "choice"
    },
    {
        question: "Are you sure?",
        correctAnswers: ["Yes"],
        answers: ["Yes", "No"],
        type: "choice"
    },
    {
        question: "Really ?!!!",
        correctAnswers: ["Yes"],
        answers: ["Yes", "No"],
        type: "choice"
    },
    {
        question: "When did I propose to you?",
        correctAnswers: ["20 April"],
        answers: ["20 April", "18 March"],
        type: "choice"
    },
    {
        question: "How many huggy and kissie do you want today?",
        correctAnswers: ["♾️", "♾️"],
        answers: ["♾️", "♾️"],
        type: "choice"
    },
    {
        question: "What is the best name I call you with?",
        correctAnswers: ["babe"],
        answers: ["babe", "whale", "fish", "bhalu"],
        type: "choice"
    },
    {
        question: "Imagine when you come to my house and you spend the night with me, what are we gonna do?",
        correctAnswers: ["watch movie", "cooking or baking", "building lego", "smth else 😏"],
        answers: ["watch movie", "cooking or baking", "building lego", "smth else 😏"],
        type: "choice"
    },
    {
        question: "Are you sure you want to continue with that option? 😏",
        correctAnswers: ["watch movie", "cooking or baking", "building lego", "smth else 😏"],
        answers: ["watch movie", "cooking or baking", "building lego", "smth else 😏"],
        type: "choice"
    },
    {
        question: "How much do you love me?",
        correctAnswers: ["endlessly but which Is less than my love 😼"],
        answers: ["little 😱", "much which is enough for me 😩", "most 🤩", "endlessly but which Is less than my love 😼"],
        type: "choice"
    },
    {
        question: "What part of my body do you like the most?",
        correctAnswers: ["Hands", "Hair", "face", "everythinggggg"],
        answers: ["Hands", "Hair", "face", "everythinggggg"],
        type: "choice"
    },
    {
        question: "What do you think which body part I like of yours?",
        correctAnswers: ["everyythinggggggggg"],
        answers: ["Hair", "face", "🍑🍒", "everyythinggggggggg"],
        type: "choice"
    },
    {
        question: "Describe one of our best moments that will stay in your heart?",
        correctAnswers: ["*"],
        type: "text"
    },
    {
        question: "What was difficult for you to accept about me?",
        correctAnswers: ["*"],
        type: "text"
    },
    {
        question: "When we live together, what’s one thing you want me to change about myself?",
        correctAnswers: ["*"],
        type: "text"
    },
    {
        question: "Have you ever blushed because of me?",
        correctAnswers: ["Yes", "No"],
        answers: ["Yes", "No"],
        type: "choice"
    },
    {
        question: "Do you miss me randomly in a day?",
        correctAnswers: ["Yes", "No"],
        answers: ["Yes", "No"],
        type: "choice"
    },
    {
        question: "Is cuddling with me the best feeling ever?",
        correctAnswers: ["Yes", "No"],
        answers: ["Yes", "No"],
        type: "choice"
    },
    {
        question: "did you ever feel butterflies by my touch?",
        correctAnswers: ["Yes", "No"],
        answers: ["Yes", "No"],
        type: "choice"
    },
    {
        question: "Have I ever made your heart race just by looking at you? How?",
        correctAnswers: ["*"],
        type: "text"
    },
    {
        question: "Are we going to Keller today?",
        correctAnswers: ["Yes", "No"],
        answers: ["Yes", "No"],
        type: "choice"
    },
    {
        question: "Think about it!!!",
        correctAnswers: ["Yes", "No"],
        answers: ["Yes", "No"],
        type: "choice"
    },
    {
        question: "You have one more chaceee!!!!",
        correctAnswers: ["Yes and maybe"],
        answers: ["Yes and maybe", "No"],
        type: "choice"
    },
    
];

// Display the current question
function displayQuestion() {
    const questionBox = document.getElementById("question");
    const answerContainer = document.querySelector(".answers");
    const inputBox = document.getElementById("text-input");
    const feedbackBox = document.getElementById("feedback");

    const current = questions[currentQuestion];
    questionBox.textContent = current.question;

    answerContainer.innerHTML = "";
    inputBox.style.display = "none";
    feedbackBox.textContent = "";

    if (current.type === "choice") {
        current.answers.forEach(answer => {
            const button = document.createElement("button");
            button.classList.add("answer");
            button.textContent = answer;
            button.onclick = () => checkAnswer(answer);
            answerContainer.appendChild(button);
        });
    } else if (current.type === "text") {
        inputBox.style.display = "block";
        inputBox.value = "";

        inputBox.onkeypress = function (e) {
            if (e.key === "Enter" && inputBox.value.trim() !== "") {
                checkAnswer(inputBox.value.trim());
            }
        };
    }

    updateProgress(); // Update the progress bar
}

// Check if the answer is correct
function checkAnswer(selectedAnswer) {
    const current = questions[currentQuestion];
    const correctAnswers = current.correctAnswers;
    const feedbackBox = document.getElementById("feedback");

    if (correctAnswers.includes(selectedAnswer) || correctAnswers.includes("*")) {
        currentQuestion++;
        if (currentQuestion >= questions.length) {
            // Hide the question box
            const questionBox = document.getElementById("question-box");
            questionBox.style.opacity = "0";
            questionBox.style.transform = "translateY(-20px)";

            // Show the love letter with smooth transition
            const loveLetter = document.getElementById("love-letter");
            loveLetter.style.display = "block";
            setTimeout(() => {
                loveLetter.classList.add("show"); // Add the 'show' class for transition
            }, 10);

            showConfetti(); // Trigger confetti animation
        } else {
            displayQuestion();
        }
    } else {
        feedbackBox.textContent = "Oops! Try again.";
    }
}

// Update the progress bar
function updateProgress() {
    const progress = (currentQuestion / questions.length) * 100;
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute("data-progress", `${Math.round(progress)}%`); // Update progress text
}

// Confetti animation
function showConfetti() {
    const confettiSettings = { target: 'confetti-canvas', max: 200, size: 2, animate: true };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    setTimeout(() => confetti.clear(), 5000); // Stop confetti after 5 seconds
}

// Start the quiz
displayQuestion();
