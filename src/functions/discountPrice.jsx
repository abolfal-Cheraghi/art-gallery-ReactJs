export default function discountPrice(price, discountPerecent) {
  const perecentageValue = (Number(price) * discountPerecent) / 100;
  const finalValue = price - perecentageValue;
  return { perecentageValue, finalValue };
}
