export type UserType = {
    name: string,
    phone: string,
    email: string,
    password: string,
    role: "ADMIN" | "USER"
}

export type UserRole = "ADMIN" | "USER"