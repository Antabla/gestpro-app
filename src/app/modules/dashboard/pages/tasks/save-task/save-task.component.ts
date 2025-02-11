import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRequest } from '../../../../../common/interfaces/request.interface';
import { IResponse } from '../../../../../common/interfaces/response.interface';
import { ApiService } from '../../../../../common/services/api.service';

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.scss'],
})
export class SaveTaskComponent {
  form: FormGroup;
  loading: boolean;

  formBuilder = inject(FormBuilder);
  apiService = inject(ApiService);
  router = inject(Router);

  constructor() {
    const currentNav = this.router.getCurrentNavigation();
    const state = currentNav?.extras?.state;

    this.form = this.formBuilder.group({
      id: [state?.['id'] ?? ''],
      description: [state?.['description'] ?? '', Validators.required],
      status: [state?.['status'] ?? 0, Validators.required],
      projectId: [state?.['projectId'], Validators.required],
    });
    this.loading = false;
  }

  save() {
    if (this.form.invalid) return;
    this.loading = true;

    const data: any = this.form.getRawValue();
    data.status = parseInt(data.status);

    const request: IRequest = {
      method: 'POST',
      path: '/projects/tasks',
      body: { task: data },
    };

    this.apiService.call(request).then((response: IResponse<any>) => {
      this.loading = false;
      if (response.status == 200) {
        this.goBack();
      } else {
        console.error(response.message);
      }
    });
  }

  goBack() {
    this.router.navigateByUrl('/dashboard/tasks', {
      state: { projectId: this.form.controls['projectId'].value },
    });
  }
}
