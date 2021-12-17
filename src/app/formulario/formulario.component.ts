import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUserRegister } from './models/form.interface';
import { MustMatch } from './validators/match.validator'; // Validación

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  // Incialización del formulario
  public registerForm: FormGroup;
  // variable submitted a false
  public submitted: boolean = false;
  // Inicializamos FormBuilder en el constructor
  constructor(private formBuilder: FormBuilder) {
    // Nuestro formulario - sin campos por defecto
    // Podemos meter valores por defecto en las comillas
    this.registerForm = this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.maxLength(20),
            Validators.pattern('[a-zA-Z]*'),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{1,}$'),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.maxLength(20),
            Validators.pattern('[a-zA-Z0-9]*'),
          ],
        ],
        repassword: [
          '',
          [
            Validators.required,
            Validators.maxLength(20),
            Validators.pattern('[a-zA-Z0-9]*'),
          ],
        ],
      },
      {
        validator: MustMatch('password', 'repassword'),
      }
    );
  }
  // El OnInit -> Vacío
  ngOnInit() {
    /* Empty */
  }

  //Función accionada al clickar en submit
  public onSubmit(): void {
    // El usuario ha pulsado en submit->cambia a true submitted
    this.submitted = true;
    // Si el formulario es valido
    if (this.registerForm.valid) {
      // Creamos un Usuario y lo emitimos
      const user: IUserRegister = {
        name: this.registerForm.get('name')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        repassword: this.registerForm.get('repassword')?.value,
      };
      console.log('USUARIO', user);
      // Reseteamos todos los campos y el indicador de envío o submitted
      this.registerForm.reset();
      this.submitted = false;
    }
  }
}
