export const formattedPrice = (value: number) => {
  const calculatedPrice = value / 100;
  return `${calculatedPrice.toLocaleString('fi-FI')} \u20AC`;
};

export default formattedPrice;
