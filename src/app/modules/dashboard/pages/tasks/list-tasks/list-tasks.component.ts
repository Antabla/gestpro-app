import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRequest } from '../../../../../common/interfaces/request.interface';
import { ApiService } from '../../../../../common/services/api.service';
import { ITask } from '../../../data/task.interface';
import { IProject } from '../../../data/project.interface';
import { EStatusTask } from '../../../data/status-task.enum';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit {
  tasks: ITask[] = [];
  apiService = inject(ApiService);
  router = inject(Router);
  projectId: IProject['id'];

  constructor() {
    const currentNav = this.router.getCurrentNavigation();
    this.projectId = currentNav?.extras?.state?.['projectId'];
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    const request: IRequest = {
      method: 'GET',
      path: '/projects/tasks/' + this.projectId,
    };

    this.apiService.call<ITask[]>(request).then((response) => {
      if (response.status == 200) {
        this.tasks = response.data!;
      } else {
        console.log(response.message);
      }
    });
  }

  addTask() {
    this.router.navigateByUrl('/dashboard/tasks/create', {
      state: { projectId: this.projectId },
    });
  }

  goBack() {
    this.router.navigate(['/dashboard/projects']);
  }

  deleteTask(id: string) {
    const request: IRequest = {
      method: 'DELETE',
      path: '/projects/tasks/' + id,
    };

    this.apiService.call(request).then((response) => {
      if (response.status == 200) {
        this.loadTasks();
      } else {
        console.error(response.message);
      }
    });
  }

  editTask(task: ITask) {
    this.router.navigateByUrl('/dashboard/tasks/create', {
      state: { ...task, projectId: this.projectId },
    });
  }

  getStatusDescription(status: EStatusTask) {
    switch (status) {
      case EStatusTask.TODO:
        return '<b class="text-dark">To Do</b>';
      case EStatusTask.DOING:
        return '<b class="text-info">Doing</b>';
      case EStatusTask.DONE:
        return '<b class="text-success">Done</b>';
    }
  }
}
