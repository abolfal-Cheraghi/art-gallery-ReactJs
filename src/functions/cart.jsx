import { useGlobalData } from "../hooks/useGlobalData";

const { cart, setCart } = useGlobalData();

// Add to cart
export const addToCart = (newObject) => {
  const existingItem = cart.find((item) => item.id === newObject.id);

  if (!existingItem) {
    const { perecentageValue, finalValue } = discountPrice(
      newObject.price,
      newObject.discount
    );
    setCart((prevItems) => [
      ...prevItems,
      { ...newObject, quantity: 1, finalPrice: finalValue },
    ]);
  } else {
    const updatedCart = cart.map((item) =>
      item.id === newObject.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  }
};

// Remove to cart
export function removeTo_Cart(id) {
  setCart((prevState) => {
    const updatedCart = prevState.map((item) => {
      if (item.id === id) {
        if (item.quantity === 1) {
          return null; // Remove this item from the cart
        } else {
          return { ...item, quantity: item.quantity - 1 }; // Decrease the quantity of this item
        }
      }
      return item;
    });

    return updatedCart.filter((item) => item !== null); // Remove null items from the cart
  });
}
// remove all to cart
export function removeAll_cart() {}

// is save to cart
export function isTo_cart(id) {
  if (!cart.some((i) => i.id === id)) {
    return false;
  } else {
    return true;
  }
}
