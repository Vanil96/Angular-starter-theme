import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = this.fb.group({
    username: [''],
    password: ['']
  })

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit(): void { }

  login() { this.auth.login(this.form.value) }
}
