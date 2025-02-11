import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IResponse } from '../../../../common/interfaces/response.interface';
import { AuthService } from '../../../../common/services/auth.service';
import { IUserWithToken } from '../../data/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  loading: boolean;
  error: boolean;

  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  constructor() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.loading = false;
    this.error = false;
  }

  login() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = false;

    const data = this.form.getRawValue();

    this.authService
      .login(data.username, data.password)
      .then((response: IResponse<IUserWithToken>) => {
        this.loading = false;
        if (response.status != 200) {
          //error
          this.error = true;
        } else {
          this.router.navigate(['/dashboard/projects']);
        }
      });
  }
}
