import { Component, inject, signal } from '@angular/core';
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
 categories = [ 'All', 'Sweet', 'Acid', 'Semi-Acid', 'Melon', 'Oleaginous/Dry',]
 isToggleBtnClicked = signal(false)

  //method to take the searchBar text
  searchFruit(){
   this.service.getAllFruits()
  }


  findYourFruit(){
    if(this.testoDigitato !== ''){
      this.service.getYourFruit(this.testoDigitato)
      
    }else{
      this.service.getAllFruits();
      this.service.filteredFruit.next(null)
    }
  }

  findFruits(category : string){
    this.service.categoryFruit(category)
  }


  showButton(){
    this.isToggleBtnClicked.update(open => !open)
    this.isToggleBtnClicked.set(true)
  }
}
