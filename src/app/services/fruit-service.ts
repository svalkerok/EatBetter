import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FruitsModel } from '../models/fruits-model';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FruitService {
  private http = inject(HttpClient);
  private baseUrl : string = '/api/fruit/all'


  
  fruits$ = new BehaviorSubject<FruitsModel[]> ([]);
  filteredFruit = new BehaviorSubject<string>('')
  



  // chiamata per prendere tutti i frutti

  getAllFruits(){
   return this.http.get(this.baseUrl, ).subscribe({
      next: (response: any) =>{
        this.fruits$.next(response);
        // console.log('Dati dalla chiamata api',response)
      },
       error: (err: any) => console.error('Errore nella chiamata', err)
    })
  }


  // metodo per prendere il nome dei frutti
    getYourFruit(name: string){
      this.http.get(`/api/fruit/${name}`).subscribe({
        next: (response: any) =>{
          this.filteredFruit.next(response)
          console.log('Frutti filtrati:', this.filteredFruit)
        },
        error: (error: any) => console.error('errore nel filtraggio frutti:', error)
      })
    }


 




}
