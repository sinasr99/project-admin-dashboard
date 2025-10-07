type dayType = "Sat" | "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri"

function getLastWeeks(): weeksType  {
    const now = new Date()   // Set Now
    const day: dayType = now.toString().slice(0, 3) as dayType // Set Day Type
    const dayNumber = getNumberOfDay(day) // Set Day Number

    const firstDayOfLastWeek = new Date()

    firstDayOfLastWeek.setDate(now.getDate() - (dayNumber + 7))

    return getWeeks(firstDayOfLastWeek)
}

type weeksType = { day: dayType, date: string }[]

function getWeeks(firstDyOfWeek: Date): weeksType {
    const days: weeksType = []
    const startTime = firstDyOfWeek.getTime()
    const dayMs = 24 * 60 * 60 * 1000

    let currentDay: Date = new Date()

    let day = ""
    let month = ""
    let year = ""

    for (let i = 0; i < 7; i++) {
        currentDay = new Date(startTime + i * dayMs)

        day = currentDay.getDate().toString().padStart(2, "0"); // day
        month = (currentDay.getMonth() + 1).toString().padStart(2, "0");
        year = currentDay.getFullYear().toString()
       days.push({
           date: `${day}/${month}/${year}`,
           day: currentDay.toString().slice(0, 3) as dayType
       })
    }
    return days
}

function getNumberOfDay(day: dayType): number {
    switch (day) {
        case "Sat":
            return 0
        case "Sun":
            return 1
        case "Mon":
            return 2
        case "Tue":
            return 3
        case "Wed":
            return 4
        case "Thu":
            return 5
        case "Fri":
            return 6
    }
}

export default getLastWeeks