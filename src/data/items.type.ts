export type Item = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  weekly_price: number;
  monthly_price: number;
  weekly_price_over_one_month: number | null;
  image: string;
};