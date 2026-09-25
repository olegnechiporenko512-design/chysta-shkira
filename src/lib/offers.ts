export const OFFERS = [
  {
    quantity: 1,
    total: 299,
    variant: "1 шт. - 299 грн",
    label: "1 шт. - 299 грн",
  },
  {
    quantity: 2,
    total: 548,
    variant: "2 шт. - знижка -50 грн - 548 грн",
    label: "2 шт. - знижка -50 грн - 548 грн",
  },
  {
    quantity: 3,
    total: 797,
    variant: "3 шт. - знижка -100 грн - 797 грн",
    label: "3 шт. - знижка -100 грн - 797 грн",
  },
] as const;

export type Offer = (typeof OFFERS)[number];

export function getOfferByQuantity(quantity: number): Offer | undefined {
  return OFFERS.find((offer) => offer.quantity === quantity);
}

export function unitPrice(total: number, quantity: number): number {
  if (!quantity) return 0;
  return Math.round(total / quantity);
}
