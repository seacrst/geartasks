import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from "uuid";
import { Task, TaskStatus } from "./task.model";


@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {  
    return this.tasks;
  }

  getFilteredTasks(filterDto: GetTasksFilterDto): Task[] {
    const { search, status } = filterDto;

    let tasks = this.getAllTasks();
    
    if (status) {
      tasks = tasks.filter(tasks => tasks.status === status);

      return tasks;
    }

    if (search) {
      tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(task => task.id === id);

    if (!task) {
      throw new NotFoundException();
    }
    
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const {title, description} = createTaskDto;
    
    const task: Task = {
      id: v4(),
      title,
      description,
      status: TaskStatus.OPEN
    }

    this.tasks.push(task);

    return task;
  }

  updateTask(id: string, status: TaskStatus): void {
    this.getTaskById(id).status = status;
  }

  deleteTask(id: string): void {
    this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== id); 
  }

  exist(id: string): boolean {
    return this.tasks.findIndex(task => task.id === id) !== -1
  }
}
