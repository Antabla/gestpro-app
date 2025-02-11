import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../../../common/services/api.service';
import { IProject } from '../../../data/project.interface';
import { IRequest } from '../../../../../common/interfaces/request.interface';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss'],
})
export class ListProjectsComponent implements OnInit {
  projects: IProject[] = [];
  apiService = inject(ApiService);

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    const request: IRequest = {
      method: 'GET',
      path: '/projects',
    };

    this.apiService.call<IProject[]>(request).then((response) => {
      if (response.status == 200) {
        this.projects = response.data!;
      } else {
        console.log(response.message);
      }
    });
  }
}
