import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiAbstractService<T> {
  protected abstract uri():string;
  constructor(private __http:HttpClient) { }

  all():Observable<T>{
    return this.__http.get<T>(environment.localhost+`${this.uri()}`).pipe(
      tap(reponse=>console.log(reponse)
      ),
      catchError(this.handleError)
  )
 }

 insert(formJson:T):Observable<T>{
  return this.__http.post<T>(environment.localhost+`${this.uri()}`,formJson).pipe(
    tap(response=>console.log(response)),
    catchError(this.handleError)
  );
 }

 pagination(page?:number):Observable<T>{
  return this.__http.get<T>(environment.localhost+`${this.uri()}?page=${page}`).pipe(
    tap(reponse=>console.log(reponse)),
    catchError(this.handleError)
  );
 }

 delete(id:number):Observable<T>{
  return this.__http.delete<T>(environment.localhost+`${this.uri()}/${id}`)
}





    private handleError(error: HttpErrorResponse) {
      if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
      }
      // Return an observable with a user-facing error message.
      return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}
