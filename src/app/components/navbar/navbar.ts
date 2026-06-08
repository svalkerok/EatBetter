import { Component, inject } from '@angular/core';
import { FruitService } from '../../services/fruit-service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  private service = inject(FruitService);

 testoDigitato: string = '';

  //method to take the searchBar text
  searchFruit(){
   this.service.getAllFruits()
       console.log(this.testoDigitato)
  }


  findYourFruit(){
    if(this.testoDigitato !== ''){
      this.service.getYourFruit(this.testoDigitato)
      console.log('testo digitato:', this.testoDigitato)
      
    }else{
      this.service.getAllFruits();
      this.service.filteredFruit.next(null)
    }
  }


}
