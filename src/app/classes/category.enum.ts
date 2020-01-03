export enum Category {
    Food = "Food",
    Electricity = 'Electricity',
    Restaurant = 'Restaurant', 
    Vacation = 'Vacation', 
    Sport = 'Sport', 
    Computer = 'Computer'
}

export const CategoryToMapping: Record<Category, string> = {
    [Category.Food]: "Food",
    [Category.Electricity]: "Electricity",
    [Category.Restaurant]: "Restaurant",
    [Category.Vacation]: "Vacation",
    [Category.Sport]: "Sport",
    [Category.Computer]: "Computer",
};