export default interface Listings {
  id: string;
  make: string;
  price: string;
  mileage: string;
  seller_type: "dealer" | "private" | "other";
}
