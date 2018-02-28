
export class Property {
    $key: string;
    address: string;
    bathrooms: number;
    bedrooms: number;
    // broker: {};
    city: string;
    contact: string;
    description: string;
    label: string;
    lat: string;
    long: string;
    period: string;
    pictures: string[];
    price: number;
    state: string;
    tags: string;
    thumbnail: string;
    title: string;
    timestamp: object;
    zip: number = 9000;
    status: string;

    constructor( form, uploads: string[], thumbnail: string, timestamp ) {
        this.title = form.value.title;
        this.description = form.value.description;
        this.address = form.value.address;
        this.city = form.value.city;
        this.thumbnail = thumbnail;
        this.pictures = uploads;
        this.bathrooms = form.value.bathrooms;
        this.period = form.value.period;
        this.contact = form.value.contact;
        this.bedrooms = form.value.bedrooms;
        this.label = form.value.label;
        this.price = form.value.price;
        this.state = form.value.state;
        this.timestamp = timestamp;
        this.tags = form.value.tags;
        this.status = form.value.status;
    };

}
