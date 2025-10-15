export type ProductType = {
    title: string,
    price: number,
    count: number,
    cpu?: string,
    category: Category,
    brand: string,
    ram: number,
    storage: number
}

export type Category = "Laptop" | "Computer" | "Mobile" | "Tablet" | "Monitor"