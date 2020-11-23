const CART_KEY_PREFIX = "cartCheckout";

export function saveCartToLocalStorage(userId, cart) {
  const key = `${CART_KEY_PREFIX}_${userId}`;
  const stringifiedCart = JSON.stringify(cart);
  localStorage.setItem(key, stringifiedCart);
}

export function fetchCartFromLocalStorage(userId) {
  const key = `${CART_KEY_PREFIX}_${userId}`;
  const cartString = localStorage.getItem(key);
  return JSON.parse(cartString);
}
