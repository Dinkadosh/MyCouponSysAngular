import { Category } from './category.enum'

export class Coupon {
    public id: number;
    public companyId: number;
    public companyName: string;
    public category: Category;
    public title: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public amount: number;
    public price: number;
    public image: string;
}
