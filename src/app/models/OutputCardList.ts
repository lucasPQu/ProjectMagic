export interface OutputCardList {
  nameCard: string;
  cardImage: ImageUris
  cardType: string;
  cardColor: ColorId;
  cardKeywords?: string[];
}




export interface ImageUris {
  small: string;
  normal: string;
  large: string;
  png: string;
  art_crop: string;
  border_crop: string;
}

export interface ColorId {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
}
