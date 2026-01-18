
export class CardModel {
  constructor(id, title, price, description, image, isCustomizable) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.image = image;
    this.isCustomizable = isCustomizable;
  }
}