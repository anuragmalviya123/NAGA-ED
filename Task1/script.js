document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
  
    if (name === '' || email === '' || message === '') {
      alert('Please fill out all fields.');
      return;
    }
  
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = 'Thank you for contacting us!';
    successMessage.style.display = 'block';
  
    console.log({
      Name: name,
      Email: email,
      Message: message
    });
  
    document.getElementById('contactForm').reset();
  });
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
  