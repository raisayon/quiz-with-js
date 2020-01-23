const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is Tokyolima?',
    answers: [
      { text: 'bandroom', correct: false },
      { text: 'late-night restaurant and bar serving Nikkei cuisine', correct: true },
      {text: 'social club', correct: false},
      {text: 'Youtube channel', correct: false},
    ]
  },
  {
    question: 'Who is our restaurant manager?',
    answers: [
      { text: 'Michael jackson', correct: false},
      { text: 'Erik Kirakozov', correct: true },
      { text: 'Adam Levine', correct: false },
      { text: 'Mr Nobody', correct: false }
    ]
  },
  {
    question: 'Which is our food concept?',
    answers: [
      { text: 'SUSHI-CEVICHERIA', correct: false },
      { text: 'GRILL AND WOK', correct: false },
      { text: 'IZAKAYA(Picanteria)', correct: false },
      { text: 'All of the above', correct: true }
    ]
  },
  {
    question: 'What is the seating capacity of Tokyolima restaurant and bar?',
    answers: [
      { text: '121 seating capacity restaurant and counters', correct: false },
      { text: '126 seating capacity restaurant and counters', correct: true },
      { text: '126 seating capacity restaurant and reception', correct: false },
      { text: 'Oh my god! Count yourself ', correct: false },
           
    ]
  },
  {
    question: 'How much is the corkage fee per wine per bottle?',
    answers: [
      { text: 'HK$250 Per regular size bottle and HK$500 for magnums ', correct: true },
      { text: 'HK$200 Per regular size bottle and HK$500 for magnums', correct: false},
      { text: 'HK$250 Per regular size bottle and HK$450 for magnums', correct: false },
      { text: 'HK$300 Per regular size bottle and HK$500 for magnums ', correct: false },
           
    ]
  },
 

]