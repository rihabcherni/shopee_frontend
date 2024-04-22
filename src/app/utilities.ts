export function formatDiscount(discount: any): string {
  const discountNumber = parseFloat(discount);
  if (!isNaN(discountNumber)) {
    if (Number.isInteger(discountNumber)) {
      return discountNumber.toString();
    } else {
      return discountNumber.toFixed(2);
    }
  } else {
    return '0';
  }
}

export function calculateNewPrice(product: any): number {
  const price = parseFloat(product.price);
  const discount = parseFloat(product.discount);
  return price - (price * (discount / 100));
}

