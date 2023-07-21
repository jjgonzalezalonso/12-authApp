import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  private _usuario!: Usuario;
  get usuario() {
    return { ...this._usuario };
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth`;
    const body = { email, password };
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
            // this._usuario = {
            //   name: resp.name!,
            //   uid: resp.uid!,
            // }
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }

  registro(name: string, email: string, password: string ){
    const url  = `${ this.baseUrl }/auth/new`;
    const body = { email, password, name };
    
    return this.http.post<AuthResponse>( url, body )
      .pipe(
        tap( ({ ok, token }) => {
          if ( ok ) {
            localStorage.setItem('token', token! );
          }
        }),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg) )
      );
  }
  validarToken(){
    const url = `${ this.baseUrl }/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
      // || si es nulo entonces manda un string vacio
      return this.http.get<AuthResponse>(url,{headers})
      .pipe (
        map (resp => {
          console.log(resp.token);
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            name: resp.name!,
            uid: resp.uid!,
            email: resp.email!
          }
          return resp.ok;}),
        catchError(err => of(false))
      );
  }

  logout() {
    localStorage.clear(); // Borra todo
   // localStorage.removeItem('token');
  }



}
