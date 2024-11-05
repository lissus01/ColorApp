import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage implements OnInit {
  
  usuario : string = '';
  contrasena : string = '';

  mdl_contrasenaactual : string = '';
  mdl_contrasenanueva : string = '';
  mdl_confirmarcontrasena : string = '';

  v_visible = false;
  v_mensaje = '';
  
  constructor(private router : Router , private db: DbService) { }

  ngOnInit() {
    let extras = this.router.getCurrentNavigation();

     if(extras?.extras.state){
     this.usuario = extras?.extras.state['usuario'];
     this.contrasena = extras?.extras.state['contrasena'];
     }
  }
  
  CambiarContrasena(){
     this.db.LoginUsuario(this.usuario , this.mdl_contrasenaactual)
      .then(data => {
        if(data == 0) {
          this.v_visible=true;
          this.v_mensaje='La contraseña actual no es correcta';
        } else {
          if (this.mdl_contrasenanueva != this.mdl_confirmarcontrasena){
            this.v_visible = true;
            this.v_mensaje = 'Las contraseñas ingresadas no coinciden';
          } else {
            this.db.CambiarContrasena(this.usuario, this.contrasena, this.mdl_contrasenanueva);
            
            let extras: NavigationExtras = {
              replaceUrl: true
           }
           this.router.navigate(['login'],extras);
        }
      }
    })
  }
}

