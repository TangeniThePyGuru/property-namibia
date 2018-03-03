export class Broker {
    $key: string;

    constructor(
        public name: string,
        public picture: string,
        public title: string,
        public timestamp: object
    ) {
        this.name = name;
        this.picture = picture;
        this.title = title;
        this.timestamp = timestamp;
    }
}
