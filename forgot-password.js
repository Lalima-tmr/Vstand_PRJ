function generateOtp() {
    const email = document.getElementById('email').value;
    fetch('http://localhost:3000/generate-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    })
    .then(response => {
        if (response.ok) {
            alert('OTP sent to your email!');
            document.getElementById('otp-section').style.display = 'block';
        } else {
            alert('Failed to send OTP!');
        }
    })
    .catch(error => console.error('Error:', error));
}

function verifyOtp() {
    const email = document.getElementById('email').value;
    const enteredOtp = document.getElementById('otp').value;

    fetch('http://localhost:3000/verify-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, enteredOtp }),
    })
    .then(response => {
        if (response.ok) {
            alert('OTP verified!');
            document.getElementById('reset-section').style.display = 'block';
        } else {
            alert('Invalid or expired OTP!');
        }
    })
    .catch(error => console.error('Error:', error));
}

function resetPassword() {
const email = document.getElementById('email').value;
const newPassword = document.getElementById('new-password').value;

fetch('http://localhost:3000/reset-password', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, newPassword }),
})
.then(response => {
    if (!response.ok) {
        console.error('Error:', response.status, response.statusText);
        alert('Failed to reset password!');
    } else {
        alert('Password reset successfully!');
        window.location.href = 'login.html';
    }
})
.catch(error => console.error('Network Error:', error));
}