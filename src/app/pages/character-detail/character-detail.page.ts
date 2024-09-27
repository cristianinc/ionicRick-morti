import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonAvatar,
  IonItem,
  IonIcon,
  IonLabel,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner
} from '@ionic/angular/standalone';
import { videocamOutline, chevronDown, locationOutline } from 'ionicons/icons'
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonAvatar,
    IonItem,
    IonIcon,
    IonLabel,
    IonCard,
    IonCardContent,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonSpinner,
    CommonModule,
    FormsModule,
    SharedModule,
  ],
})
export class CharacterDetailPage implements OnInit {
  characterId: string = '';
  character: any = null;
  episodes: any[] = [];

  constructor(
    private activedRoute: ActivatedRoute,
    private rickAndMortyService: RickAndMortyService
  ) {

    addIcons({locationOutline,videocamOutline,chevronDown});


    this.characterId = this.activedRoute.snapshot.paramMap.get('id') as string;
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.getCharacter();
  }

  getCharacter() {
    this.rickAndMortyService.getCharacterById(this.characterId).subscribe({
      next: (res: any) => {
        this.character = res;
        this.getEpisodes()
      },
      error: (error: any) => {},
    });
  }


  getEpisodes() {


    for( let url of this.character.episode){
      this.rickAndMortyService.getByUrl(url).subscribe({
        next: (res: any) => {
          this.episodes.push(res);
        },
        error: (error: any) => {},
      });
    }


  }

}
