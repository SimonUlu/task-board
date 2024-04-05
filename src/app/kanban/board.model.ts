import { Task } from "./task.model";

export interface Board {
    id?: string, 
    priority?: number,
    tasks: Task[],
    title?: string,
}