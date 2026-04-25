import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
});

async function testAuth() {
    const email = `test_${Date.now()}@example.com`;
    const password = 'Password123';

    try {
        console.log('Testing Signup...');
        const signupRes = await api.post('/auth/signup', {
            name: 'Test User',
            email,
            password
        });
        console.log('Signup Res:', signupRes.data);

        console.log('Testing Login...');
        const loginRes = await api.post('/auth/login', {
            email,
            password
        });
        console.log('Login Res:', loginRes.data);
        console.log('Login Cookies:', loginRes.headers['set-cookie']);

    } catch (e) {
        console.error('Test Auth Error:', e.response?.data || e.message);
    }
}

testAuth();
