document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        console.log('Login form submitted');

        const formData = new FormData(loginForm);
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Login successful:', result);
                window.location.replace(`/current/${result.user.id}`);
            } else {
                console.log('Login failed:', response.statusText);
                alert('Invalid email or password');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    });

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        console.log('Registration form submitted');

        const formData = new FormData(registerForm);
        const data = {
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            email: formData.get('email'),
            password: formData.get('password'),
            age: formData.get('age'),
        };

        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                window.location.replace(`/login`);
            } else {
                console.log('Login failed:', response.statusText);
                alert('There was an error');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    });
});