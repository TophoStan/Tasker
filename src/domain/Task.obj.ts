export interface Task {

    id: number;

    title: string;

    createdAt: Date;
    updatedAt: Date;

    // Is the task completed?
    isCompleted: boolean;

    // The date and time the task is to be completed by, end of day Amsterdam time.
    DateTimeToBeCompletedBy: Date;

    // Is the to be repeated every day?
    isDaily: boolean;

    // Is the task past the DateTimeToBeCompletedBy?
    isOverdue: boolean;
}