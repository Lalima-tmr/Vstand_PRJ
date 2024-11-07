const modeToggle = document.getElementById('modeToggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
    body.classList.replace('light', 'dark');
    modeToggle.textContent = '☀️';
}

modeToggle.addEventListener('click', () => {
    const isLightMode = body.classList.contains('light');
    body.classList.toggle('light', !isLightMode);
    body.classList.toggle('dark', isLightMode);

    modeToggle.textContent = isLightMode ? '☀️' : '🌙';
    localStorage.setItem('theme', isLightMode ? 'dark' : 'light');
});


    document.getElementById('displayName').textContent = localStorage.getItem('name');
    document.getElementById('displayEmail').textContent = localStorage.getItem('email');
    document.getElementById('displayPassword').textContent = localStorage.getItem('password');
    document.getElementById('displayCollege').textContent = localStorage.getItem('college');
    document.getElementById('displayQualification').textContent = localStorage.getItem('qualification');
    document.getElementById('displayGender').textContent = localStorage.getItem('gender');

    const profilePic = localStorage.getItem('profilePic');
    if (profilePic) {
        document.getElementById('displayProfilePic').src = profilePic;
    }

    function logout() {
        localStorage.removeItem('isAuthenticated');
        alert('You have been logged out!');
        window.location.href = 'login.html';
      }