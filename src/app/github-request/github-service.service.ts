import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './../user';
import { environment } from './../../environments/environment';
import { Repository } from '../repository';




@Injectable({
  providedIn: 'root'
})
export class GithubServiceService {
  user: User;
  repos: Repository;


  constructor(private http: HttpClient) {
    this.user = new User(0, '', '', 0, 0, '');
    this.repos = new Repository();
  }

  personalDetailsRequest() {
    const apiUrl = `${environment.apiUrl}LennyDennis${environment.apiKey}`;

    interface ApiResponse {
      id: number;
      login: string;
      avatar_url: string;
      followers: number;
      following: number;
      html_url: string;
    }

    const detailsPromise = new Promise((resolve, reject) => {
      this.http.get<ApiResponse>(apiUrl).toPromise().then(
      response => {
        this.user.id = response.id;
        this.user.username = response.login;
        this.user.avatarUrl = response.avatar_url;
        this.user.followers = response.followers;
        this.user.following = response.following;
        this.user.githubUrl = response.html_url;

        resolve();
      },
      error => {
        // HANDLE BETTER
        console.log('error');

        reject(error);
      });
    });
    return detailsPromise;
  }

  getUsersProfiles(user) {
    const userApiUrl = `${environment.apiUrl}${user}${environment.apiKey}`;

    interface ApiResponse {
      id: number;
      login: string;
      avatar_url: string;
      followers: number;
      following: number;
      html_url: string;
    }

    const usersPromise = new Promise((resolve, reject) => {
      this.http.get<ApiResponse>(userApiUrl).toPromise().then(
      response => {
        this.user.id = response.id;
        this.user.username = response.login;
        this.user.avatarUrl = response.avatar_url;
        this.user.followers = response.followers;
        this.user.following = response.following;
        this.user.githubUrl = response.html_url;

        resolve();
      },
      error => {

        console.log('error');

        reject(error);
      });
    });
    return usersPromise;
    

  }
}


