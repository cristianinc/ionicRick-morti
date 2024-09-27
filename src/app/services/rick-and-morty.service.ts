import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  constructor( private httpClient: HttpClient ) { }


  getCharacters(params: any){
    return this.httpClient.get( environment.baseUrl + environment.character, { params } );
  }


  getCharacterById(id: string){
    return this.httpClient.get( environment.baseUrl + environment.character + id );
  }

  getByUrl( url: string ){
    return this.httpClient.get(url);
  }

}
