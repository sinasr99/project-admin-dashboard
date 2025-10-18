type DepartmentType = "Technical" | "Sales"

export type TicketType = {
    title: string
    department: DepartmentType,
    body: string,
    creatorName: string,
    ticketStatus: "CLOSE" | "OPEN"
}