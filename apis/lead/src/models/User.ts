export class User {
  id?: string;
  name: string;
  phone: string;
  source: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: {
    id?: string;
    name: string;
    phone: string;
    source: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.phone = props.phone;
    this.source = props.source;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
