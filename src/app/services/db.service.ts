import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private sqlite : SQLite) { 
    this.crearTablas();
  }
   crearTablas(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })

    .then((db: SQLiteObject) => {

      db.executeSql('create table if not exists persona (usuario varchar(30) , contrasena varchar(30) , correo varchar(30))',[])
        .then(() => console.log('FRS : TABLA PERSONA CREADA CORRECTAMENTE'))
        .catch(e => console.log( 'FRS : ERROR AL CREAR LA TABLA PERSONA'+ JSON.stringify(e)));
    })
    .catch(e => console.log('FRS : ERROR AL ABRIR BD O CREAR BD'));


    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })

    .then((db: SQLiteObject) => {

      db.executeSql('create table if not exists sesion(usuario varchar(30) , contrasena varchar(30))',[])
        .then(() => console.log('FRS : TABLA SESION CREADA CORRECTAMENTE'))
        .catch(e => console.log( 'FRS : ERROR AL CREAR LA TABLA SESION'+ JSON.stringify(e)));
    })
    .catch(e => console.log('FRS : ERROR AL ABRIR BD O CREAR BD'));
   }


   AlmacenarSesion(usuario : string , contrasena : string ){
    
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })

    .then((db: SQLiteObject) => {

      db.executeSql('insert into sesion values(?,?)',[usuario ,  contrasena])
        .then(() => console.log('FRS : SESION ALMACENADA CORRECTAMENTE'))
        .catch(e => console.log( 'FRS : ERROR AL ALMACENAR SESION'+ JSON.stringify(e)));
    })
    .catch(e => console.log('FRS : ERROR AL ABRIR BD O CREAR BD'));

   }


   EliminarSesion(){
    
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })

    .then((db: SQLiteObject) => {

      db.executeSql('delete from sesion',[])
        .then(() => console.log('FRS : SESION ELIMINADA CORRECTAMENTE'))
        .catch(e => console.log( 'FRS : ERROR AL ELIMINAR SESION'+ JSON.stringify(e)));
    })
    .catch(e => console.log('FRS : ERROR AL ABRIR BD O CREAR BD'));

   }



   ValidarSesion(){
    return this.sqlite.create({
    name: 'data.db',
    location: 'default'
  })

  .then((db: SQLiteObject) => {

    return db.executeSql('select count(usuario) as cantidad from sesion',[])
      .then((data) => {
       return data.rows.item(0).cantidad;
      })
      .catch(e => console.log( 'FRS : ERROR AL REALIZAR VALIDAR SESION'+ JSON.stringify(e)));
  })
  .catch(e => console.log('FRS : ERROR AL OBTENER INFORMACION'));

 }

    ObtenerSesion(){
      return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })

    .then((db: SQLiteObject) => {

      return db.executeSql('select usuario , contrasena from sesion',[])
        .then((data) => {
          let objeto: any = {};
          objeto.usuario = data.rows.item(0).usuario;
          objeto.contrasena = data.rows.item(0).contrasena;
        return objeto;
        })
        .catch(e => console.log( 'FRS : ERROR AL OBTENER SESION'+ JSON.stringify(e)));
    })
    .catch(e => console.log('FRS : ERROR AL OBTENER INFORMACION'));

    }




   AlmacenarUsuario(usuario : string , contrasena : string ,correo : string ){
    
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })

    .then((db: SQLiteObject) => {

      db.executeSql('insert into persona values(?,?,?)',[usuario ,  contrasena ,correo ])
        .then(() => console.log('FRS : PERSONA ALMACENADA CORRECTAMENTE'))
        .catch(e => console.log( 'FRS : ERROR AL ALMACENAR PERSONA'+ JSON.stringify(e)));
    })
    .catch(e => console.log('FRS : ERROR AL ABRIR BD O CREAR BD'));

   }

    LoginUsuario(usuario : string , contrasena : string){
      return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })

    .then((db: SQLiteObject) => {

      return db.executeSql('select count(usuario) as cantidad from persona where usuario = ? and contrasena = ?',[usuario , contrasena])
        .then((data) => {
         return data.rows.item(0).cantidad;
        })
        .catch(e => console.log( 'FRS : ERROR AL REALIZAR LOGIN'+ JSON.stringify(e)));
    })
    .catch(e => console.log('FRS : ERROR AL OBTENER INFORMACION'));

   }
    
   InfoUsuario(usuario : string , contrasena : string){
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })

    .then((db: SQLiteObject) => {

      return db.executeSql('select usuario,contrasena from persona where usuario = ? and contrasena = ?',[usuario , contrasena])
        .then((data) => {
          let objeto: any = {};
          objeto.usuario = data.rows.item(0).usuario;
          objeto.contrasena = data.rows.item(0).contrasena;
          return objeto;
        })
        .catch(e => console.log( 'FRS : ERROR AL OBTENER INFO DE PERSONA'+ JSON.stringify(e)));
    })
    .catch(e => console.log('FRS : ERROR AL ABRIR BD O CREAR BD'));

   }

   CambiarContrasena( usuario : string , contrasenaActual : string , contrasenaNueva : string){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })

    .then((db: SQLiteObject) => {

      db.executeSql('update persona set contrasena = ? where usuario = ? and contrasena = ?',[contrasenaNueva , usuario , contrasenaActual])
        .then(() => console.log('FRS : TABLA PERSONA MODIFICADA CORRECTAMENTE'))
        .catch(e => console.log( 'FRS : ERROR AL MODIFICAR LA TABLA PERSONA'+ JSON.stringify(e)));
    })
    .catch(e => console.log('FRS : ERROR AL ABRIR BD O CREAR BD'));
   }
  }