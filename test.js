let userScore = 0;

document.getElementById('submit').addEventListener('click', function () {
  const questions = document.querySelectorAll('.question');
  let score = 0;
  let unanswered = false;

      questions.forEach((question) => {
        const selectedOption = question.querySelector('input[type="radio"]:checked');
        if (!selectedOption) {
          unanswered = true;
        }
      });

      if (unanswered) {
        alert('Please attempt all questions before submitting.');
        return;
      }


  questions.forEach((question) => {
    const correctAnswer = question.getAttribute('data-correct');
    const selectedOption = question.querySelector('input[type="radio"]:checked');

    if (selectedOption && selectedOption.value === correctAnswer) {
      score++;
    }
  });

  const totalQuestions = questions.length;
  const percentage = (score / totalQuestions) * 100;
  userScore = percentage;

  const resultElement = document.getElementById('result');
  resultElement.textContent = `You scored ${score} out of ${totalQuestions}! (${percentage.toFixed(2)}%)`;


  if (percentage >= 95) {
    document.getElementById('certificate-link').style.display = 'block';
    resultElement.style.color = 'green';
  } else {
    resultElement.style.color = 'red';
    alert('You need to score at least 95% to access the certificate.');
  }
});

function accessCertificate() {
  if (userScore >= 95) {
    window.location.href = `certificate.html?score=${userScore}`;
  } else {
    alert('You need to score at least 95% to access the certificate.');
  }
}