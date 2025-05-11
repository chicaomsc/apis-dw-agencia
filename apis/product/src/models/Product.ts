export class Product {
  id?: string;
  clientId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: {
    id?: string;
    clientId: string;
    name: string;
    description: string;
    price: number;
    category: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id;
    this.clientId = props.clientId;
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.category = props.category;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
