import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { map, Observable, of, tap } from 'rxjs';
import { User, AuthStatus, LoginResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private _currrenUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //! Al mundo exterior
  public currentUSer = computed(() => this._currrenUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {}

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      tap(({ user, token }) => {
        this._currrenUser.set(user);
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('token', token);

        console.log({ user, token });
      }),

      map(() => true)

      // TODO: errores
    );

    return of(true);
  }
}
