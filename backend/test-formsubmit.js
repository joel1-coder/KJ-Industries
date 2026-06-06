(async () => {
  const response = await fetch('https://formsubmit.co/ajax/kjindus70@gmail.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin': 'https://kj-industries.onrender.com',
      'Referer': 'https://kj-industries.onrender.com/'
    },
    body: JSON.stringify({
      Name: 'Test Name',
      Email: 'test@example.com',
      Message: 'This is a test message'
    })
  });
  const text = await response.text();
  console.log('Status:', response.status);
  console.log('Response:', text);
})();
