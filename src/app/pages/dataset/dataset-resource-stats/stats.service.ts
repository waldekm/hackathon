import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface Header {
  [name:string]: string;
}

@Injectable({
  providedIn: 'root',
})
export class StatsService {

  private aws: string = 'https://wiri6lr8kl.execute-api.eu-west-1.amazonaws.com/get-logs/fetch';

  constructor(private http: HttpClient) {
  }
  
  /** Set Headers */
  setHeaders(header?: Header) {
    let headers: Header = {
      'Content-Type': 'application/json'
    };

    if (header) {
      headers = {...headers, ...header}
    }

    return {
      headers: new HttpHeaders(headers)
    };
  }
    
  /** Error handler for RESTs */
  handleError(error: HttpErrorResponse) {
    return throwError('REST: Something went wrong!');
  }

  getAwsData(resource: string) {
    let query = `?resource=${resource}`;
    const httpOptions = this.setHeaders();

    return this.http
      .get(`${this.aws}${query}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  } 

  getAwsCount(resource: string) {
    let query = `?resource=${resource}&count=1`;
    const httpOptions = this.setHeaders();

    return this.http
      .get(`${this.aws}${query}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  } 
}
