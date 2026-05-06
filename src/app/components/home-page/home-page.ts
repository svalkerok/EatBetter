import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
  
  ngOnInit(): void {
    this.fruitService.getAllFruits().subscribe({
      next: (response: any) =>{
        this.fruits = response
        console.log(response)
      }
    })
    this.cdr.detectChanges()
  }
  
}
