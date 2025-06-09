const API_BASE_URL = 'https://aecd097kaa.execute-api.us-west-2.amazonaws.com/production';

export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}

export default {
  loginUser,
};
