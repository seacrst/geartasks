import { IsEnum } from "class-validator";
import { TaskStatus } from "../task.model";

export class UpdateTaskStatusSto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}