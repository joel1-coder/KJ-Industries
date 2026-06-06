(async () => {
  try {
    const data = {
      service_id: 'service_jozmq0q',
      template_id: 'template_p4mst2v',
      user_id: 'IVdcbIrBfShbFsjSn',
      template_params: {
        from_name: 'Test Name',
        from_email: 'test@example.com',
        mobile: '1234567890',
        subject: 'Test Subject',
        message: 'Test message body'
      }
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Origin': 'https://kj-industries.onrender.com',
        'Referer': 'https://kj-industries.onrender.com/'
      },
      body: JSON.stringify(data)
    });

    const text = await response.text();
    console.log('Status:', response.status);
    console.log('Response:', text);
  } catch (err) {
    console.error('Fetch Error:', err);
  }
})();
