import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  miFormulario: FormGroup = this.fb.group({
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    //this.authService.validarToken().subscribe(resp => console.log(resp));
    console.log(this.miFormulario.value);
    const { email, password } = this.miFormulario.value;
    this.authService.login(email, password)
      .subscribe(resp => {
        console.log(resp);
        if (resp===true) {
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Titulo-error', resp,'error');
          // TO DO: mostrar mensaje de error.
        }
      });
   }
}

