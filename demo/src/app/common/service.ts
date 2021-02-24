export class Service {
    name: string = "";
    description: string = "";
    price: number = 1;
    imageUrl: string = "";
    active: boolean = true;
    created!: Date;
    modified!: Date;
}
