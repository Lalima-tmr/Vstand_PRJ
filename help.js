
function clearForm(event) {
    event.preventDefault();
  
    fetch("https://formspree.io/f/meoqavzn", {
      method: "POST",
      body: new FormData(event.target),
      headers: { "Accept": "application/json" }
    })
      .then(response => {
        if (response.ok) {
          alert("Form submitted successfully!");
          event.target.reset();
        } else {
          alert("Oops! There was a problem submitting your form.");
        }
      })
      .catch(error => {
        alert("Oops! There was a problem submitting your form.");
      });
  }
  
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
    