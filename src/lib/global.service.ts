import { Injectable } from '@angular/core';

const environment = {
    production: false,
    webhost: 'http://localhost:4200',
    host: 'http://localhost:8080',
    apiVersion: 'v2',
    firebase: {
      apiKey: 'AIzaSyABXWjeZPQIuWkQC1xVYiE7nS0c3e0tUwY',
      authDomain: 'ptnw-notification.firebaseapp.com',
      databaseURL: 'https://ptnw-notification.firebaseio.com',
      projectId: 'ptnw-notification',
      storageBucket: 'ptnw-notification.appspot.com',
      messagingSenderId: '806735666567',
      appId: '1:806735666567:web:ce023637055b15155f4722'
    }
  };

@Injectable()
export class GlobalService {

    public webHost: string;
    public apiHost: string;
    public apiVersion: string;
    public apiVersionHost: string;

    public setting: any = {};

    constructor() {
        if (environment.production) {
            this.webHost = environment.webhost;
            this.apiHost = environment.host;
            this.apiVersion = environment.apiVersion;
            this.apiVersionHost = this.apiHost + '/' + this.apiVersion;
        } else {
            this.webHost = environment.webhost;
            this.apiHost = environment.host;
            this.apiVersion = environment.apiVersion;
            this.apiVersionHost = this.apiHost + '/' + this.apiVersion;
        }
    }

    loadGlobalSettingsFromLocalStorage(): void {
        if (localStorage.getItem('access-setting') != null) {
            this.setting = JSON.parse(localStorage.getItem('access-setting'));
        }
    }

}
