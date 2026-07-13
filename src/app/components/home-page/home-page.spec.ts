import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home-page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create the home-page', async() => {
      const fixture = TestBed.createComponent(HomePage);
        await fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(component).toBeTruthy();

     
  });
});
