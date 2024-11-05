import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {
   
  mdl_usuario : string = '';
  mdl_contrasena : string = '';
  mdl_correo : string = '';

  constructor( private db : DbService , private router : Router) { }

  ngOnInit() {
  }
   
  AlmacenarUsuario(){
    this.db.AlmacenarUsuario(
    this.mdl_usuario,
    this.mdl_contrasena,
    this.mdl_correo,
  );

  this.router.navigate(['login']);
  }
  
}
