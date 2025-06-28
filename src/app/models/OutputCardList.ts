export interface OutputCardList {
  nameCard: string;
  cardImage: ImageUris;
  cardType: string;
  cardColor: string[];
  cardKeywords?: string[];
  cardText: string;
}


export interface ImageUris {
  small: string;
  normal: string;
  large: string;
  png: string;
  art_crop: string;
  border_crop: string;
}
