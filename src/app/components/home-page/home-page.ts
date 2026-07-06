import { ChangeDetectorRef, Component, inject, Input, OnInit, signal } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { HeroSection } from "../hero-section/hero-section";
import { FruitService } from '../../services/fruit-service';
import { FruitsModel } from '../../models/fruits-model';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  imports: [HeroSection,FormsModule ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  
  private fruitService = inject(FruitService)
  private cdr = inject(ChangeDetectorRef)
  fruits : FruitsModel[] = []

  isClicked = signal(false)
  el: any = null;
  yourFruit: any
  fruitsByCategory : FruitsModel[] | null = null;
  selectedCategory : string = '';
  allFruit : any

  
  ngOnInit(): void {
    this.fruitService.getAllFruits();
    // subscribe per prendere tutti i dati dei frutti
    this.fruitService.fruits$.subscribe((data) =>{
        this.fruits = data;
        this.cdr.detectChanges()
    });

    // subscribe per prendere i dati dei frutti cercati dalla serachbar
   this.fruitService.filteredFruit.subscribe( fruit =>{
      this.yourFruit = fruit;
      this.cdr.detectChanges()
    });

    // subscrube per prendere u dati dei frutti di ogni singola categoria
    this.fruitService.filteredFruitByCategory.subscribe( data =>{
      this.fruitsByCategory = data;
      this.cdr.detectChanges()

    });

    // subscribe per tracciare quale categoria è cliccata
    this.fruitService.selectedCategory.subscribe(category => {
      this.selectedCategory = category;
      this.cdr.detectChanges()
    })


  }
  

  openModal(index: number){
    this.isClicked.update(open => !open)
    this.el = this.fruits[index]
    this.isClicked.set(true)
  }
  closeModal(){
    this.isClicked.update(close => !close);
    this.el = null
  }


  
  
}
