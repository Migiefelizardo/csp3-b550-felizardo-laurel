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

  return response.json(); // should include token
}

export async function fetchActiveProducts() {
  const response = await fetch(`${API_BASE_URL}/products/active`);
  if (!response.ok) {
    throw new Error('Failed to fetch active products');
  }
  return response.json(); // { products: [...] }
}

export async function addProduct(productData, token) {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error('Failed to add product');
  }

  return response.json();
}

export default {
  loginUser,
  fetchActiveProducts,
  addProduct,
};
