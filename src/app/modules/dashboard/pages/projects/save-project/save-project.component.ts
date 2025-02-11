import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRequest } from '../../../../../common/interfaces/request.interface';
import { IResponse } from '../../../../../common/interfaces/response.interface';
import { ApiService } from '../../../../../common/services/api.service';
import { IProject } from '../../../data/project.interface';

@Component({
  selector: 'app-save-project',
  templateUrl: './save-project.component.html',
  styleUrls: ['./save-project.component.scss'],
})
export class SaveProjectComponent {
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
      name: [state?.['name'] ?? '', Validators.required],
      description: [state?.['description'] ?? '', Validators.required],
    });
    this.loading = false;
  }

  save() {
    if (this.form.invalid) return;
    this.loading = true;

    const data: IProject = this.form.getRawValue();

    const request: IRequest = {
      method: 'POST',
      path: '/projects',
      body: { project: data },
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
    this.router.navigate(['/dashboard/projects']);
  }
}
