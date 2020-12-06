import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private messages_url: string = '/message';

  constructor(
    private http: HttpClient,
  ) { }

  sendMessage(msg: string) {
    const http_options: { headers; observe; } = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      observe: 'response'
    };

    let body = new HttpParams();
    body = body.set('message', msg);

    return this.http.post(
      this.messages_url,
      body,
      http_options
    );
  }
}
