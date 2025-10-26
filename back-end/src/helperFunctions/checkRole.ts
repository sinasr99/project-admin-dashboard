const checkRole = (role: string): boolean => {
    return Boolean(role === "USER" || role === "ADMIN")
}

export default checkRole