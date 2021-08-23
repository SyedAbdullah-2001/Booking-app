// eslint-disable-next-line @typescript-eslint/naming-convention
export class Place {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public imageUrl: string,
    public price: number,
    public availabelFrom?: Date,
    public availabelTo?: Date,
    public userId?: string,
  ) { }
}
