/* eslint-disable @typescript-eslint/naming-convention */
export class Booking {
    constructor(
        public id: string,
        public placeId: string,
        public userId: string,
        public placeTitle: string,
        public placeImage: string,
        public firstName: string,
        public lastName: string,
        public guestNumbers: number,
        public bookedFrom: Date,
        public BookedTo: Date,
    ) { }
}
