const getClassByEmailTimer = (timer: number): string => {
    switch (true) {
        case timer > 60 :
            return "text-green-500"
        case timer > 30 :
            return "text-yellow-500"
        default:
            return "text-red-500"
    }
}

export default getClassByEmailTimer