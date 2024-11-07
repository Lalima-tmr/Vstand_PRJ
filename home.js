 
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

function navigateToDashboard() {
  window.location.href = './Dashboard.html';
}
  const profilePic = localStorage.getItem('profilePic');
    if (profilePic) {
        document.getElementById('displayProfilePic').src = profilePic;
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

  document.querySelectorAll('.accordion_title').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      item.classList.toggle('is_active');
      document.querySelectorAll('.accordion_item').forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove('is_active');
        }
      });
    });
  });