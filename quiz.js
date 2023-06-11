const questionElement = document.getElementById('question');
const optionButtons = document.getElementsByClassName('option');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const retryButton = document.getElementById('retry-btn');
const scoreElement = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
        question: '(Q 1/20) What is the capital of Nigeria',
        options: ['Abuja', 'Lagos', 'Calabar'],
        correctAnswer: 'Abuja'
    },
  {
    question: '(Q 2/20) What is the largest planet in our solar system ?',
    options: ["Mars", "Jupiter", "Saturn"],
    correctAnswer: "Saturn"
  },
  {
    question: '(Q 3/20) What is the capital of France?',
    options: ['Paris', 'London', 'Berlin'],
    correctAnswer: 'Paris'
  },
  {
    question: '(Q 4/20) What does HTML stands for?',
    options: ["Home Tool Mark-up Language", 'Hyper Text Mark-up Language', "Hyperlinks and Text Mark-up Language"],
    correctAnswer: 'Hyper Text Mark-up Language'
  },
  {
    question: '(Q 5/20) Who is likely to be next richest man in Africa?',
    options: ['A.A Rano', "Aliko Dangote", 'Berlin'],
    correctAnswer: 'A.A Rano'
  },
  {
    question: '(Q 6/20) Nigeria just inagural her _______ president?',
    options: ['18', '16', '14'],
    correctAnswer: '14'
  },
  {
    question: '(Q 7/20) Which time start a new day?',
    options: ['Monarch', '00:00', '12:00pm'],
    correctAnswer: '00:00'
  },
  {
    question: '(Q 8/20) Nigeria Practice which from of goverance most?',
    options: ['11:59pm', 'London', 'Berlin'],
    correctAnswer: 'Paris'
  },
  {
    question: '(Q 9/20) What is the timezone for african countries like Nigeria, Ghana, Togo?',
    options: ["WAT", 'CAT', 'CET'],
    correctAnswer: "WAT"
  },
  {
    question: '(Q 10/20) Is the moon a luminous object / body?',
    options: ['No', 'Yes', 'Let me ask google'],
    correctAnswer: 'No'
  },
  {
    question: '(Q 11/20) Nigeria as a nation have how many LGAs??',
    options: ['911', '774', '477'],
    correctAnswer: '774'
  },
  {
    question: '(Q 12/20) MTN Nigera changed their USSD code efectively from which month?',
    options: ['April', 'May', 'June'],
    correctAnswer: 'May'
  },
  {
    question: '(Q 13/20) A leadership is a _____?',
    options: ['Passion', 'Sprit', 'Skill'],
    correctAnswer: 'No'
  },
  {
    question: '(Q 14/20) Nigeria as a nation have how many Federal University?',
    options: ['91', '43', '79'],
    correctAnswer: '43'
  },
  {
    question: '(Q 15/20) Are programmer a set of Genius or Guru?',
    options: ['No', 'Yes', 'They are the Egg head'],
    correctAnswer: 'No'
  },
  {
    question: '(Q 16/20) Nigeria as a nation have how many Private University?',
    options: ['76', '79', '48'],
    correctAnswer: 'No'
  },
  {
    question: '(Q 17/20) What does Nigeria means to you ?',
    options: ['A great nation', 'A place to stay for a while"', 'A corruption breached Nation'],
    correctAnswer: 'A great nation'
  },
  {
    question: '(Q 18/20) Nigeria as a nation have how many State University?',
    options: ['42', '49', '36'],
    correctAnswer: '49'
  },
  {
    question: '(Q 19/20) Nigeria as a nation have how many petroleum refineries?',
    options: ['6', '5', '4'],
    correctAnswer: '5'
  },
  {
    question: '(Q 20/20) What should you thank God for mostly?',
    options: ['Your Life', 'Your Riches', 'Your Families'],
    correctAnswer: 'Your Life'
  },
  
];

// Display the current question and options
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  for (let i = 0; i < optionButtons.length; i++) {
    optionButtons[i].innerText = currentQuestion.options[i];
  }
}

// Check the selected option and update the score
function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswer = currentQuestion.correctAnswer;

  if (selectedOption === correctAnswer) {
    score++;
  }
}

// Move to the next question or finish the quiz
function nextQuestion() {
  const selectedOption = getSelectedOption();
  if (selectedOption) {
    checkAnswer(selectedOption);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
      clearSelectedOption();
    } else {
      finishQuiz();
    }
  }
}

// Get the selected option
function getSelectedOption() {
  for (let i = 0; i < optionButtons.length; i++) {
    if (optionButtons[i].classList.contains('selected')) {
      return optionButtons[i].innerText;
    }
  }
  return null;
}

// Clear the selected option
function clearSelectedOption() {
  for (let i = 0; i < optionButtons.length; i++) {
    optionButtons[i].classList.remove('selected');
  }
}

// Finish the quiz and display the score
function finishQuiz() {
  questionElement.innerText = '';
  for (let i = 0; i < optionButtons.length; i++) {
    optionButtons[i].style.display = 'none';
  }
  nextButton.style.display = 'none';
  submitButton.style.display = 'none';

  const percentageScore = (score / questions.length) * 100;
  scoreElement.innerText = `Your Score is: ${score} out of ${questions.length} (${percentageScore}%)`;
  scoreElement.parentNode.style.display = 'block';

  if (percentageScore < 70) {
    retryButton.style.display = 'block';
  }
}

// Retry the quiz
function retryQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  displayQuestion();
  clearSelectedOption();
  scoreElement.parentNode.style.display = 'none';
  retryButton.style.display = 'none';
  for (let i = 0; i < optionButtons.length; i++) {
    optionButtons[i].style.display = 'block';
  }
  nextButton.style.display = 'block';
  submitButton.style.display = 'block';
}

// Add event listeners
for (let i = 0; i < optionButtons.length; i++) {
  optionButtons[i].addEventListener('click', function() {
    clearSelectedOption();
    this.classList.add('selected');
  });
}

nextButton.addEventListener('click', nextQuestion);
submitButton.addEventListener('click', finishQuiz);
retryButton.addEventListener('click', retryQuiz);

// Start the quiz
displayQuestion();