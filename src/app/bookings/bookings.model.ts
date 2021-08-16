/* eslint-disable @typescript-eslint/naming-convention */
export class bookings {
    constructor(
        public id: string,
        public placeId: string,
        public userId: string,
        public placeTitle: string,
        public guests: number
    ) { }
}
