import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FruitsModel } from '../models/fruits-model';
import {FRUITS_ACID, FRUITS_MELONS, FRUITS_OLEAGINOUS_DRY, FRUITS_SEMIACID, FRUITS_SWEET} from '../models/classificationFruits'

import { BehaviorSubject } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class FruitService {
  private http = inject(HttpClient);
  private baseUrl : string = '/api/fruit/all';
  private listsFruit = [FRUITS_SWEET, FRUITS_ACID, FRUITS_SEMIACID, FRUITS_MELONS, FRUITS_OLEAGINOUS_DRY]


  
  fruits$ = new BehaviorSubject<FruitsModel[]> ([]);
  filteredFruit = new BehaviorSubject<FruitsModel | null>(null);
  selectedCategory = new BehaviorSubject<string>('');
  filteredFruitByCategory= new  BehaviorSubject<FruitsModel[] | null>(null);
  
  



  // chiamata per prendere tutti i frutti

  getAllFruits(){
   return this.http.get(this.baseUrl, ).subscribe({
      next: (response: any) =>{
        this.fruits$.next(response);
                  console.log('Dati dalla chiamata api 1:',response)

          this.filteredFruitByCategory.next(response)

          console.log('Dati dalla chiamata api 2:',response)
      },
       error: (err: any) => console.error('Errore nella chiamata', err)
    })
  }


  // metodo per prendere il nome dei frutti
    getYourFruit(name: string){
      this.http.get(`/api/fruit/${name}`).subscribe({
        next: (response: any) =>{
          this.filteredFruit.next(response);
          // console.log('Frutti filtrati:', this.filteredFruit)
        },
        error: (error: any) => console.error('errore nel filtraggio frutti:', error)
      })
    }


  //metodo per prendere le liste dei frutti filtrati
  categoryFruit(category: string){
    let categoryList : string[] = [''];


    if(category === 'Sweet'){
      categoryList = this.listsFruit[0];
       console.log('Frutto dolce', categoryList)
    } else if(category === 'Acid'){
      categoryList = this.listsFruit[1];
             console.log('Frutto acido', categoryList)
    } else if(category === 'Semi-Acid'){
      categoryList = this.listsFruit[2];
             console.log('Frutto semi-acido', categoryList)
    } else if(category === 'Melon'){
      categoryList = this.listsFruit[3];
             console.log('Frutto melone', categoryList)
    } else if(category === 'Oleaginous/Dry'){
      categoryList = this.listsFruit[4];
        console.log('Frutto oleoso/secco', categoryList)
    }else if(category === 'All'){       // ! FORSE CE UN PROBLEMA: RICEVO I DATI DALLA API CALL TWO TIMES
      this.getAllFruits();
      this.filteredFruitByCategory.next(this.fruits$.getValue())
      console.log('Risposta da all:', this.getAllFruits())
   } else {
       console.log('Frutto non trovato')
    }

    this.selectedCategory.next(category); 


    let resultCategoryFruits = this.fruits$.getValue().filter((frutto: any) =>{
        return categoryList.includes(frutto.name)
    })

    this.filteredFruitByCategory.next(resultCategoryFruits);
    console.log('Dati da resultFilteredFruits:' , this.filteredFruit)
  }




}
