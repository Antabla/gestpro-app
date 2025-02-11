import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../common/guards/auth.guard';
import { ListProjectsComponent } from './pages/projects/list-projects/list-projects.component';
import { SaveProjectComponent } from './pages/projects/save-project/save-project.component';
import { ListTasksComponent } from './pages/tasks/list-tasks/list-tasks.component';
import { SaveTaskComponent } from './pages/tasks/save-task/save-task.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full',
  },
  {
    path: 'projects',
    component: ListProjectsComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'projects/create',
    component: SaveProjectComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'tasks',
    component: ListTasksComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'tasks/create',
    component: SaveTaskComponent,
    canActivate: [authGuard()],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
