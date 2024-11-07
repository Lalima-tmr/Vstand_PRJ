window.addEventListener('DOMContentLoaded', () => {
  const collegeDropdown = document.getElementById('college-dropdown');
  const collegeInput = document.getElementById('college-name');
  const qualificationDropdown = document.getElementById('qualification-dropdown');
  const qualificationInput = document.getElementById('qualification-input');

  collegeDropdown.addEventListener('change', () => {
    collegeInput.style.display = collegeDropdown.value === 'Other' ? 'block' : 'none';
  });

  qualificationDropdown.addEventListener('change', () => {
    qualificationInput.style.display = qualificationDropdown.value === 'Other' ? 'block' : 'none';
  });
});

function registerUser(event) {
  event.preventDefault();

  const firstName = document.getElementById('first-name')?.value.trim();
  const lastName = document.getElementById('last-name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const phone = document.getElementById('phone')?.value.trim();
  const password = document.getElementById('password')?.value;
  const confirmPassword = document.getElementById('confirm-password')?.value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value;
  const collegeDropdownValue = document.getElementById('college-dropdown')?.value;
  const qualificationDropdownValue = document.getElementById('qualification-dropdown')?.value;

  if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
    alert('All fields are required!');
    return;
  }

  if (!gender) {
    alert('Please select your gender!');
    return;
  }

  if (!validateEmail(email)) {
    alert('Invalid email format!');
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert('Phone number must be 10 digits!');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  const userData = {
    firstName,
    lastName,
    email,
    phone,
    gender,
    college: collegeDropdownValue,
    qualification: qualificationDropdownValue,
    password,
  };

  localStorage.setItem('user', JSON.stringify(userData));

  alert('Registration successful! Please login.');
  window.location.href = 'login.html';
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

  function loginUser(event) {
    event.preventDefault();
  
    const email = document.getElementById('login-email')?.value.trim();
    const password = document.getElementById('login-password')?.value;
  
    const storedUser = JSON.parse(localStorage.getItem('user'));
  
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      localStorage.setItem('isAuthenticated', 'true');
      alert('Login successful!');
      window.location.href = 'home.html';
    } else {
      alert('Invalid email or password!');
    }
  }
  

  function logout() {
    localStorage.removeItem('isAuthenticated');
    alert('You have been logged out!');
    window.location.href = 'login.html';
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true' && !window.location.pathname.includes('home.html')) {
      window.location.href = 'home.html';
    }
  });
  

  function resetPassword(event) {
    event.preventDefault();
  
    const email = document.getElementById('forgot-email')?.value.trim();
    const newPassword = document.getElementById('new-password')?.value;
    const confirmNewPassword = document.getElementById('confirm-new-password')?.value;
  
    const storedUser = JSON.parse(localStorage.getItem('user'));
  
    if (!storedUser || storedUser.email !== email) {
      alert('No user found with this email!');
      return;
    }
  
    if (newPassword !== confirmNewPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    storedUser.password = newPassword;
    localStorage.setItem('user', JSON.stringify(storedUser));
  
    alert('Password reset successfully! Please login with your new password.');
    window.location.href = 'login.html';
  }
  
  const profilePic = document.getElementById('profilePic');
  const profileUpload = document.getElementById('profileUpload');


  document.addEventListener('DOMContentLoaded', () => {
  const savedImage = localStorage.getItem('profileImage');
  if (savedImage) {
    profilePic.src = savedImage;
  }
  });

  profilePic.addEventListener('click', () => {
    profileUpload.click();
  });

  profileUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const newImage = e.target.result;
        profilePic.src = newImage; 
        localStorage.setItem('profileImage', newImage); 
      };
      reader.readAsDataURL(file);
    }
  });
