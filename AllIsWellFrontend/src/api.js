const BASE_URL = "http://localhost:5000";

// LOGIN
export const loginApi = async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
    });

    return res.json();
};

// SIGNUP
export const signupApi = async (name, email, password) => {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
    });

    return res.json();
};

// VERIFY EMAIL
export const verifyEmailApi = async (token) => {
    const res = await fetch(
        `${BASE_URL}/auth/verify-email?token=${token}`,
        {
            method: "POST",
        }
    );

    return res.json();
};

// REFRESH TOKEN
export const refreshApi = async () => {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
    });

    return res.json();
};