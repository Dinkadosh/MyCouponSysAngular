import { Coupon } from './coupon'

export class User {
    public id: number;
    public fullName: string;
    public email: string;
    public password: string;
    public role: string;
    public active: boolean;
    public token?: string;
    public coupons: [Coupon];
}
