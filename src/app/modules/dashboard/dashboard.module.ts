import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ListProjectsComponent } from './pages/projects/list-projects/list-projects.component';
import { SaveProjectComponent } from './pages/projects/save-project/save-project.component';
import { ListTasksComponent } from './pages/tasks/list-tasks/list-tasks.component';
import { SaveTaskComponent } from './pages/tasks/save-task/save-task.component';

@NgModule({
  declarations: [
    ListProjectsComponent,
    ListTasksComponent,
    SaveProjectComponent,
    SaveTaskComponent,
  ],
  imports: [
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
})
export class DashboardModule {}
