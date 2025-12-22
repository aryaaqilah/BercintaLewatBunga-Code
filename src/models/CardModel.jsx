
export class CardModel {
  constructor(id, title, price, description, logo, image, isCustomizable) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.logo = logo;
    this.image = image;
    this.isCustomizable = isCustomizable;
  }
}