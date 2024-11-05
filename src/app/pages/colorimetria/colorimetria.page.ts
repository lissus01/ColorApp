import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { Observable } from 'rxjs';
import { UserPhoto } from '../../services/photo.service';

@Component({
  selector: 'app-colorimetria',
  templateUrl: './colorimetria.page.html',
  styleUrls: ['./colorimetria.page.scss'],
})
export class ColorimetriaPage implements OnInit {
  photos$: Observable<UserPhoto[]>;

  constructor(private photoService: PhotoService) {
    this.photos$ = this.photoService.photos$;
  }

  ngOnInit() {}

  async takePhoto() {
    try {
      await this.photoService.addNewToGallery();
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }
  async deletePhoto(filepath: string) {
    try {
      await this.photoService.deletePhoto(filepath);
    } catch (error) {
      console.error('Error deleting photo:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  }

}