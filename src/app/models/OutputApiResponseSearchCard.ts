import { CardFace, ImageUris } from "./OutputCardList";

export interface ScryfallApiCard {
  name: string;
  image_uris?: ImageUris;
  card_faces?: CardFace[];
  type_line?: string;
  oracle_text?: string;
  color_identity?: string[];
  keywords?: string[];
}

export interface ScryfallApiResponse {
  object: string;
  total_cards: number;
  has_more: boolean;
  next_page?: string;
  data: ScryfallApiCard[];
}
