const API_BASE_URL = 'https://aecd097kaa.execute-api.us-west-2.amazonaws.com/production';

// Helper to handle responses safely
async function handleResponse(response) {
  const contentType = response.headers.get('content-type') || '';

  if (!response.ok) {
    if (contentType.includes('application/json')) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    } else {
      const errorText = await response.text();
      throw new Error(errorText || 'Something went wrong');
    }
  }

  return contentType.includes('application/json') ? response.json() : response.text();
}

// Register user with x-www-form-urlencoded
export async function registerUser(userData) {
  const formBody = new URLSearchParams();
  for (const key in userData) {
    formBody.append(key, userData[key]);
  }

  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formBody.toString(),
  });

  return handleResponse(response);
}

// User login with x-www-form-urlencoded
export async function loginUser(credentials) {
  const formBody = new URLSearchParams();
  for (const key in credentials) {
    formBody.append(key, credentials[key]);
  }

  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formBody.toString(),
  });

  return handleResponse(response);
}

// Fetch active products (for public catalog)
export async function fetchActiveProducts() {
  const response = await fetch(`${API_BASE_URL}/products/active`);
  return handleResponse(response);
}

// Fetch all products (admin)
export async function fetchAllProducts(token) {
  const response = await fetch(`${API_BASE_URL}/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
}

// Add new product (admin)
export async function addProduct(productData, token) {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });
  return handleResponse(response);
}

// Update product (admin)
export async function updateProduct(productId, productData, token) {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });
  return handleResponse(response);
}

// Toggle product active status (admin)
export async function toggleProductActive(productId, isActive, token) {
  const response = await fetch(`${API_BASE_URL}/products/${productId}/active`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ active: isActive }),
  });
  return handleResponse(response);
}

export default {
  registerUser,
  loginUser,
  fetchActiveProducts,
  fetchAllProducts,
  addProduct,
  updateProduct,
  toggleProductActive,
};
