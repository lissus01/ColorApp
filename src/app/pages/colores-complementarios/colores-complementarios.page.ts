import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-colores-complementarios',
  templateUrl: './colores-complementarios.page.html',
  styleUrls: ['./colores-complementarios.page.scss'],
})
export class ColoresComplementariosPage implements OnInit, OnDestroy {
  imagenesPorTarjeta: string[][] = [
    ['assets/img/rojo_complementario.jpg', 'assets/img/verde_complementario.jpg'],
    ['assets/img/azul_complementario.jpg', 'assets/img/naranja_complementario.jpg'],
    ['assets/img/amarillo_complementario.jpg', 'assets/img/violeta_complementario.jpg'],
    ['assets/img/verdeazulado_complementario.jpg', 'assets/img/rojo_anaranjado.jpg'],
    ['assets/img/azul_violeta.jpg', 'assets/img/amarillo_anaranjado.jpg']
  
  ];

  currentIndex: number[] = [0, 0, 0, 0 , 0]; // Índices de imagen para cada tarjeta
  intervalIds: any[] = []; // Almacena los IDs de los intervalos para cada tarjeta

  constructor() { }

  ngOnInit() {
    // Inicia el carrusel de imágenes para cada tarjeta cuando el componente se carga
    this.iniciarCarruseles();
  }

  iniciarCarruseles() {
    // Configura un intervalo para cada tarjeta
    this.imagenesPorTarjeta.forEach((_, index) => {
      const intervalId = setInterval(() => {
        this.next(index);
      }, 6000); // Cambia la imagen cada 6 segundos (3 segundos de imagen y 3 segundos de pausa)
      this.intervalIds.push(intervalId);
    });
  }

  next(cardIndex: number) {
    // Muestra la imagen actual y espera 3 segundos antes de cambiar
    setTimeout(() => {
      // Actualiza el índice de imagen para la tarjeta específica
      this.currentIndex[cardIndex] = (this.currentIndex[cardIndex] < this.imagenesPorTarjeta[cardIndex].length - 1)
        ? this.currentIndex[cardIndex] + 1
        : 0;
    }, 3000); // Espera 3 segundos antes de cambiar a la siguiente imagen
  }

  ngOnDestroy() {
    // Limpia todos los intervalos cuando el componente se destruye
    this.intervalIds.forEach(intervalId => {
      clearInterval(intervalId);
    });
  }
}

