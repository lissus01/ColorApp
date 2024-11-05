import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject, map } from 'rxjs';

interface ColorPalette {
  hex: string[];
  rgb: string[];
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
  imgurUrl?: string;
  colorPalette?: ColorPalette;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private PHOTO_STORAGE: string = 'photos';
  private IMGUR_CLIENT_ID = '5598c7db2112a39';
  private RAPIDAPI_KEY = 'e2fabcdb7emsh6e2a66d030e0136p1e2d97jsn15e3a80cce51';
  private MAX_PHOTOS = 4;
  private _photos = new BehaviorSubject<UserPhoto[]>([]);
  public photos$ = this._photos.pipe(
    map(photos => photos.slice(0, this.MAX_PHOTOS))
  );
  private isLoading = false;

  constructor() {
    this.loadSaved().catch(error => console.error('Error loading saved photos:', error));
  }

  public async deletePhoto(filepath: string) {
    try {
      // Obtener las fotos actuales
      const currentPhotos = this._photos.value;
      
      // Eliminar la foto del arreglo
      const updatedPhotos = currentPhotos.filter(photo => photo.filepath !== filepath);
      
      // Actualizar el BehaviorSubject
      this._photos.next(updatedPhotos);
      
      // Actualizar el almacenamiento
      await Preferences.set({
        key: this.PHOTO_STORAGE,
        value: JSON.stringify(updatedPhotos),
      });
      
      // Eliminar el archivo físico
      await Filesystem.deleteFile({
        path: filepath,
        directory: Directory.Data
      });
      
    } catch (error) {
      console.error('Error deleting photo:', error);
      throw error;
    }
  }

  public async loadSaved() {
    try {
      const { value } = await Preferences.get({ key: this.PHOTO_STORAGE });
      let photos = (value ? JSON.parse(value) : []) as UserPhoto[];
      
      // Limitar a las últimas 2 fotos antes de cargarlas
      photos = photos.slice(0, this.MAX_PHOTOS);
      
      for (let photo of photos) {
        try {
          const readFile = await Filesystem.readFile({
            path: photo.filepath,
            directory: Directory.Data,
          });
          photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
        } catch (error) {
          console.error(`Error loading photo ${photo.filepath}:`, error);
          // Si hay error al cargar una foto, la eliminamos
          photos = photos.filter(p => p.filepath !== photo.filepath);
        }
      }
      
      this._photos.next(photos);
      
      // Limpiar fotos antiguas del sistema de archivos
      this.cleanOldPhotos();
    } catch (error) {
      console.error('Error in loadSaved:', error);
      this._photos.next([]);
    }
  }

  public async addNewToGallery() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 60,
        width: 1024,
        height: 1024,
        correctOrientation: true
      });

      const savedImageFile = await this.savePicture(capturedPhoto);
      const currentPhotos = this._photos.value;
      
      // Añadir la nueva foto al principio y mantener solo las últimas 2
      const updatedPhotos = [savedImageFile, ...currentPhotos].slice(0, this.MAX_PHOTOS);
      this._photos.next(updatedPhotos);

      await Preferences.set({
        key: this.PHOTO_STORAGE,
        value: JSON.stringify(updatedPhotos),
      });

      // Limpiar fotos antiguas
      this.cleanOldPhotos();
    } catch (error) {
      console.error('Error in addNewToGallery:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private async getColorPalette(imageUrl: string): Promise<ColorPalette> {
    try {
      const response = await fetch('https://image-to-color-palette.p.rapidapi.com/', {
        method: 'POST',
        headers: {
          'x-rapidapi-key': this.RAPIDAPI_KEY,
          'x-rapidapi-host': 'image-to-color-palette.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: imageUrl })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        hex: data.hex || [],
        rgb: data.rgb || []
      };
    } catch (error) {
      console.error('Error getting color palette:', error);
      return { hex: [], rgb: [] };
    }
  }

  private async savePicture(photo: Photo): Promise<UserPhoto> {
    try {
      const base64Data = await this.readAsBase64(photo);
      const fileName = new Date().getTime() + '.jpeg';
      
      await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data
      });

      const newPhoto: UserPhoto = {
        filepath: fileName,
        webviewPath: photo.webPath!
      };

      // Subir a Imgur y obtener paleta de colores en segundo plano
      this.uploadImageToImgur(base64Data)
        .then(async imgurUrl => {
          const currentPhotos = this._photos.value;
          const photoIndex = currentPhotos.findIndex(p => p.filepath === fileName);
          
          if (photoIndex !== -1) {
            // Obtener la paleta de colores
            const colorPalette = await this.getColorPalette(imgurUrl);
            
            // Actualizar la foto con la URL de Imgur y la paleta de colores
            currentPhotos[photoIndex] = {
              ...currentPhotos[photoIndex],
              imgurUrl,
              colorPalette
            };
            
            this._photos.next(currentPhotos);
            Preferences.set({
              key: this.PHOTO_STORAGE,
              value: JSON.stringify(currentPhotos),
            });
          }
        })
        .catch(error => console.error('Error in upload process:', error));

      return newPhoto;
    } catch (error) {
      console.error('Error in savePicture:', error);
      throw error;
    }
  }

  private async cleanOldPhotos() {
    try {
      const { value } = await Preferences.get({ key: this.PHOTO_STORAGE });
      const allPhotos = (value ? JSON.parse(value) : []) as UserPhoto[];
      
      // Obtener las fotos que debemos eliminar
      const photosToDelete = allPhotos.slice(this.MAX_PHOTOS);
      
      // Eliminar los archivos físicos
      for (const photo of photosToDelete) {
        try {
          await Filesystem.deleteFile({
            path: photo.filepath,
            directory: Directory.Data
          });
        } catch (error) {
          console.error(`Error deleting file ${photo.filepath}:`, error);
        }
      }
    } catch (error) {
      console.error('Error in cleanOldPhotos:', error);
    }
  }

  private async readAsBase64(photo: Photo): Promise<string> {
    try {
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
      return await this.convertBlobToBase64(blob) as string;
    } catch (error) {
      console.error('Error in readAsBase64:', error);
      throw error;
    }
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  private async uploadImageToImgur(base64Image: string): Promise<string> {
    try {
      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          Authorization: `Client-ID ${this.IMGUR_CLIENT_ID}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image: base64Image.split(',')[1]
        })
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error('Imgur upload failed: ' + data.status);
      }
      return data.data.link;
    } catch (error) {
      console.error('Error in uploadImageToImgur:', error);
      throw error;
    }
  }
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
  imgurUrl?: string;
}