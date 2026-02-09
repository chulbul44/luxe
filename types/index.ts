export interface Product {
    _id: string;
    name: string;
    title?: string; // Some parts of the app use name, some use title
    price: number;
    originalPrice?: number;
    discount?: string;
    image: string;
    tag?: string;
    category: string;
    description?: string;
    rating?: number;
    reviews?: number;
    countInStock?: number;
    _id: string; // Ensure _id is consistently defined
}
