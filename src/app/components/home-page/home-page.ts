import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { HeroSection } from "../hero-section/hero-section";
import { FruitService } from '../../services/fruit-service';
import { FruitsModel } from '../../models/fruits-model';

@Component({
  selector: 'app-home-page',
  imports: [HeroSection, ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  
  private fruitService = inject(FruitService)
  private cdr = inject(ChangeDetectorRef)
  fruits : FruitsModel[] = []

  isClicked = signal(false)
  
  ngOnInit(): void {
    this.fruitService.getAllFruits()
    this.fruitService.fruits$.subscribe((data) =>{
        this.fruits = data;
        this.cdr.detectChanges()
      
    })
  }

  openModal(){
    this.isClicked.update(open => !open)
  }
  
}
