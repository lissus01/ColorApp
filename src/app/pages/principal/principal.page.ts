import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { PhotoService } from '../../services/photo.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit, OnDestroy { // Implementa OnDestroy

  usuario: string = '';
  contrasena: string = '';
  contrasena2: string = '';

  // Define un array de URLs de las imágenes que deseas mostrar
  imagenes: string[] = [
    'assets/img/creo_en_mi.jpg',
    'assets/img/hablate_bonito.jpg',
    'assets/img/soy_magnetica.jpg',
  ];

  currentIndex: number = 0;
  intervalId: any; // Almacena el ID del intervalo

  constructor(private router: Router, private db: DbService, public photoService: PhotoService) { }

  ngOnInit() {
    let extras = this.router.getCurrentNavigation();

    if (extras?.extras.state) {
      this.usuario = extras?.extras.state['usuario'];
      this.contrasena = extras?.extras.state['contrasena'];
    }

    if (this.usuario == '') {
      this.db.ObtenerSesion().then(data => {
        this.usuario = data.usuario;
        this.contrasena = data.contrasena;
        this.InfoUsuario();
      });
    } else {
      this.InfoUsuario();
    }

    // Inicia el carrusel de imágenes cuando el componente se carga
    this.iniciarCarrusel();

    // Carga las fotos guardadas
    this.photoService.loadSaved(); // Cargar fotos al iniciar
  }

  InfoUsuario() {
    this.db.InfoUsuario(this.usuario, this.contrasena)
      .then(data => {
        this.usuario = data.usuario;
        this.contrasena2 = data.contrasena;
      });
  }

  navegarCambiarContrasena() {
    let extras: NavigationExtras = {
      state: {
        usuario: this.usuario,
        contrasena: this.contrasena
      },
      replaceUrl: true
    };
    this.router.navigate(['cambiar-contrasena'], extras);
  }

  CerrarSesion() {
    this.db.EliminarSesion();
    let extras: NavigationExtras = {
      replaceUrl: true
    };
    this.router.navigate(['login'], extras);
  }

  // Método para iniciar el carrusel de imágenes
  iniciarCarrusel() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 3000); // Cambia la imagen cada 3 segundos
  }

  // Método para pasar a la siguiente imagen
  next() {
    this.currentIndex = (this.currentIndex < this.imagenes.length - 1) ? this.currentIndex + 1 : 0;
  }

  // Método para tomar una nueva foto
  takePhoto() {
    this.photoService.addNewToGallery().then(() => {
      // Aquí puedes manejar cualquier acción adicional después de tomar la foto
    });
  }

  // Limpia el intervalo cuando el componente se destruye
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
