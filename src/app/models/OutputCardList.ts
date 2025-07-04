export interface OutputCardList {
  nameCard: string;
  cardImage: ImageUris;
  cardType: string;
  cardColor: string[];
  cardKeywords?: string[];
  cardText: string;
}

export interface ImageUris {
  small?: string;
  normal: string;
  large?: string;
  png?: string;
  art_crop?: string;
  border_crop?: string;
}

export interface CardFace {
  object?: string;
  name?: string;
  mana_cost?: string;
  type_line?: string;
  oracle_text?: string;
  colors?: string[];
  power?: string;
  toughness?: string;
  flavor_text?: string;
  artist?: string;
  artist_id?: string;
  illustration_id?: string;
  image_uris?: ImageUris;
}
