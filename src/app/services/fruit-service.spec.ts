import { TestBed } from '@angular/core/testing';

import { FruitService } from './fruit-service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('FruitService', () => {
  let service: FruitService;
  let controller :  HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
       providers:[
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(FruitService);
    controller = TestBed.inject(HttpTestingController);  

  });
 

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // controlla la principale chiamata api per i dati di tutti i frutti
  it('should be return a datas of fruits', () =>{
        const mockFruit = [
          {name : 'Banana', family: 'Bananose'},
          {name : 'Apple', family: 'Melanose'}
        ];

        service.getAllFruits();


  // intercettare chiamata api
  const resp = controller.expectOne('/api/fruit/all');
  resp.flush(mockFruit);


    // verificare che ci siano i dati
    service.fruits$.subscribe( fruits =>{
      expect(fruits).toEqual(mockFruit);
    })
  })
  

  // controlla ricerca del singolo frutto
  it('should be return a datas of the fruit you search', () =>{

    // copre la ricerca del frutto singolo

    const mockYourFruit = [
      {name: 'Grape', family: 'Semi-acid', carbs: 3, fat: 2, proteins: 1.5},
      {name: 'Melon', family: 'Melons',  carbs: 2, fat: 2, proteins: 3},
      {name: 'Cranberry', family: 'Acid',  carbs: 1, fat: 2, proteins: 1}

    ];

    const name = 'Grape'
    service.getYourFruit(name);

    // intercettata chiamata api
     const resp = controller.expectOne(`/api/fruit/${name}`);
     resp.flush(mockYourFruit);


     service.filteredFruit.subscribe(yourFruit =>{
       expect(yourFruit).toEqual(mockYourFruit)
     })
  });



  it('should return an error when you searching a fruit', () =>{
    
    // copre la ricerca del frutto singolo

    const mockYourFruit = [
      {name: 'Grape', family: 'Semi-acid', carbs: 3, fat: 2, proteins: 1.5},
      {name: 'Melon', family: 'Melons',  carbs: 2, fat: 2, proteins: 3},
      {name: 'Cranberry', family: 'Acid',  carbs: 1, fat: 2, proteins: 1}

    ];

    const name = 'Melon'
    service.getYourFruit(name);
     const spy =  vi.spyOn(console, 'error')


    // intercettata chiamata api
     const resp = controller.expectOne(`/api/fruit/${name}`);  

    //  resp.flush(mockYourFruit);
    resp.error(new ProgressEvent('error'), {status: 404, statusText: 'Frutto non trovato!'} )

      expect(spy).toHaveBeenCalled()
     

  });



  it('should return a catogry of fruit', ()=>{

  });


  it ('should handle an error when you searching a category of fruit', () =>{

  })


});


