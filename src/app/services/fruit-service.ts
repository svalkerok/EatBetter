import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FruitsModel } from '../models/fruits-model';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FruitService {
  private http = inject(HttpClient);
  private baseUrl : string = '/api/fruit/all'

  
  fruits$ = new BehaviorSubject<FruitsModel[]> ([])
  
  // api url per prendere tutti i frutti /api/fruit/all


  // chiamata per prendere tutti i frutti

  // getAllFruits(){
  //  return  this.http.get(this.baseUrl).subscribe({
  //     next: (response: any) =>{
  //       // this.fruits$ = response.body;
  //       this.fruits$.next(response)
  //       console.log('Dati dalla chiamata api',response)
  //     },
  //     error: (err: any) => console.error('Errore nella chiamata', err)
  //   })
  // }

  getAllFruits(){
    return this.http.get(this.baseUrl)
  }
  // todo: da rivedere 
}
