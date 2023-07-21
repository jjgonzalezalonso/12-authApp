import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor( private fb: FormBuilder, private router:Router, private authService: AuthService) { }
  miFormulario: FormGroup = this.fb.group({
    name:     ['Test 4', [ Validators.required ]],
    email:    ['test4@test.com', [ Validators.required, Validators.email ]],
    password: ['123456', [ Validators.required, Validators.minLength(6) ]],
  });

  registro(){
    // console.log(this.miFormulario.value);
    // console.log(this.miFormulario.valid);

      const { name, email, password } = this.miFormulario.value;
      this.authService.registro( name, email, password )
        .subscribe( ok => {
          if ( ok === true ) {
            this.router.navigateByUrl('/dashboard');
          } else {
            Swal.fire('Error', ok, 'error');
          }
        });
    }
  
  }


