import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FruitsModel } from '../models/fruits-model';
import {FRUITS_ACID, FRUITS_MELONS, FRUITS_OLEAGINOUS_DRY, FRUITS_SEMIACID, FRUITS_SWEET} from '../models/classificationFruits'

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FruitService {
  private http = inject(HttpClient);
  private baseUrl : string = 'https://corsproxy.io/?https://www.fruityvice.com/api/fruit/all';
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
        console.log(this.getAllFruits())
      },
       error: (err: any) => console.error('Errore nella chiamata', err)
    })
  }


  // metodo per prendere il nome dei frutti
    getYourFruit(name: string){
      this.http.get(`https://corsproxy.io/?https://www.fruityvice.com/api/fruit/${name}`).subscribe({
        next: (response: any) =>{
          this.filteredFruit.next(response);
        },
        error: (error: any) => console.error('errore nel filtraggio frutti:', error)
      })
    }


  //metodo per prendere le liste dei frutti filtrati
  categoryFruit(category: string){
    let categoryList : string[] = [''];


    if(category === 'Sweet'){
      categoryList = this.listsFruit[0];
    } else if(category === 'Acid'){
      categoryList = this.listsFruit[1];
    } else if(category === 'Semi-Acid'){
      categoryList = this.listsFruit[2];
    } else if(category === 'Melon'){
      categoryList = this.listsFruit[3];
    } else if(category === 'Oleaginous/Dry'){
      categoryList = this.listsFruit[4];
    }else if(category === 'All'){     
      this.getAllFruits();
      this.filteredFruitByCategory.next(null)
   } else {
       alert('Frutto non trovato')
    }

    this.selectedCategory.next(category); 


    let resultCategoryFruits = this.fruits$.getValue().filter((frutto: any) =>{
        return categoryList.includes(frutto.name)
    })

    this.filteredFruitByCategory.next(resultCategoryFruits);
  }




}
