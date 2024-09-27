import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCol,
  IonRow,
  IonGrid,
  IonAvatar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSearchbar
} from '@ionic/angular/standalone';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
    IonAvatar,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonSearchbar,
    CommonModule,
    FormsModule,
    SharedModule,
  ],
})
export class HomePage implements OnInit {
  characters: any[] = [];
  params = {} as any;

  constructor(private rickAndMortyService: RickAndMortyService) {}

  ngOnInit() {
    this.params.page = 0;
    this.getCharacters();
  }

  getCharacters(event?: any) {
    this.params.page += 1;

    this.rickAndMortyService.getCharacters(this.params).subscribe({
      next: (res: any) => {
        this.characters.push(...res.results);
        console.log(this.characters);

        if(event) event.target.complete();
        

      },
      error: (error: any) => {
        if(event) event.target.complete();

      },
    });
  }


  searchCharacters() {
    this.params.page = 1;

    this.rickAndMortyService.getCharacters(this.params).subscribe({
      next: (res: any) => {
        this.characters = res.results;
      },
      error: (error: any) => {


      },
    });
  }


}
