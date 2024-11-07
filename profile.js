function submitForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const college = document.getElementById('college').value;
    const qualification = document.getElementById('qualification').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const profilePic = document.getElementById('profilePic').files[0];

    if (profilePic) {
        const reader = new FileReader();
        reader.onload = function(event) {
            localStorage.setItem('profilePic', event.target.result); 
            storeAndRedirect();
        };
        reader.readAsDataURL(profilePic); 
    } else {
        storeAndRedirect();
    }

    function storeAndRedirect() {
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('college', college);
        localStorage.setItem('qualification', qualification);
        localStorage.setItem('gender', gender);

        window.location.href = './Dashboard.html'; 
    }
}

function cancle(){
    window.location.href = './Dashboard.html'; 
}