const API_BASE_URL = 'https://aecd097kaa.execute-api.us-west-2.amazonaws.com/production';
// const API_BASE_URL = 'http://localhost:4000';

//----HELPER----//
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

//----USER API----//
export async function registerUser(userData) {
  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
}

export async function loginUser(credentialsData) {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentialsData),
  });
  return handleResponse(response);
}

export async function getUserDetails(token) {
  const response = await fetch(`${API_BASE_URL}/users/details`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
}

//----PRODUCT API----//
export async function fetchActiveProducts() {
  const response = await fetch(`${API_BASE_URL}/products/active`);
  return handleResponse(response);
}

export async function fetchAllProducts(token) {
  const response = await fetch(`${API_BASE_URL}/products/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
}

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

export async function updateProduct(productId, productData, token) {
  const response = await fetch(`${API_BASE_URL}/products/${productId}/update`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });
  return handleResponse(response);
}

export async function toggleProductActive(productId, isActive, token) {
  const endpoint = isActive ? 'activate' : 'archive';
  const response = await fetch(`${API_BASE_URL}/products/${productId}/${endpoint}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}

export async function deleteProduct(productId, token) {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}

//  NEW FUNCTION ADDED
export async function getProductById(productId) {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`);
  return handleResponse(response);
}

//----CART API----//
export async function getCart(token) {
  const response = await fetch(`${API_BASE_URL}/cart/get-cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
}

export async function addToCart(token, productId, quantity) {
  const response = await fetch(`${API_BASE_URL}/cart/add-to-cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });
  return handleResponse(response);
}

export async function updateQuantity(token, productId, quantity) {
  const response = await fetch(`${API_BASE_URL}/cart/update-cart-quantity`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });
  return handleResponse(response);
}

export async function removeFromCart(token, productId) {
  const response = await fetch(`${API_BASE_URL}/cart/${productId}/remove-from-cart`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
}

export async function clearCart(token) {
  const response = await fetch(`${API_BASE_URL}/cart/clear-cart`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
}

export async function checkoutCart(token) {
  const response = await fetch(`${API_BASE_URL}/cart/checkout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
}

//----EXPORT ALL----//
export default {
  // User
  registerUser,
  loginUser,
  getUserDetails,

  // Products
  fetchActiveProducts,
  fetchAllProducts,
  addProduct,
  updateProduct,
  toggleProductActive,
  deleteProduct,
  getProductById,   //  added here

  // Cart
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  checkoutCart,
};
