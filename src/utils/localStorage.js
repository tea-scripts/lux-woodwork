/*

*** User ***

*/

export const addUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('user');
  const user = result ? JSON.parse(result) : null;
  return user;
};

/*

*** Token ***

*/

export const addTokenToLocalStorage = (token) => {
  localStorage.setItem('token', token);
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('token');
};

export const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem('token');
  return token ? token : null;
};

/*

*** Cart ***

*/

export const addCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const getCartFromLocalStorage = () => {
  const result = localStorage.getItem('cart');
  const cart = result ? JSON.parse(result) : [];
  return cart;
};

export const removeCartFromLocalStorage = () => {
  localStorage.removeItem('cart');
};

/*

*** Wishlist ***

*/

export const addWishlistToLocalStorage = (wishlist) => {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
};

export const getWishlistFromLocalStorage = () => {
  const result = localStorage.getItem('wishlist');
  const wishlist = result ? JSON.parse(result) : [];
  return wishlist;
};

export const removeWishlistFromLocalStorage = () => {
  localStorage.removeItem('wishlist');
};
