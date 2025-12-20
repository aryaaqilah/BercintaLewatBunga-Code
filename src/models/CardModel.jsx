
export class CardModel {
  constructor(title, price, description, logo, image, isCustomizable) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.logo = logo;
    this.image = image;
    this.isCustomizable = isCustomizable;
  }
}