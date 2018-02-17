import {Upload} from "./upload";

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
    pictures: Upload[];
    price: number;
    state: string;
    tags: string;
    thumbnail: Upload;
    title: string;
    // timeStamp: number;
    zip: number = 9000;

}
