import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { UpdateTaskStatusSto } from "./dto/update-task-status.dto";
import { Task, TaskStatus } from "./task.model";
import { TasksService } from './tasks.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    return Object.keys(filterDto).length ?
      this.taskService.getFilteredTasks(filterDto) :
      this.taskService.getAllTasks();
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch("/:id/status")
  updateTask(@Param("id") id: string, @Body() statusDto: UpdateTaskStatusSto): Task {
    const { status } = statusDto;
    this.taskService.updateTask(id, status);

    return this.taskService.getTaskById(id);
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: string): {deleted: boolean} {
    this.taskService.deleteTask(id);
    return {
      deleted: !this.taskService.exist(id)
    }
  }
}
