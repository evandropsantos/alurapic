import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { AuthService } from './../../core/auth.service'
@Component({
  templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {

  loginForm!: FormGroup | any
  @ViewChild('userNameInput') userNameInput!: ElementRef<HTMLInputElement>

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    const userName = this.loginForm.get('userName').value
    const password = this.loginForm.get('password').value

    this.authService
      .authenticate(userName, password)
      .subscribe(
        () => this.router.navigate(['user', userName]),
        error => {
          alert(`Acesso negado -> ${error.message}`)

          this.userNameInput.nativeElement.focus()
          this.loginForm.reset()
        }
      )
  }
}
