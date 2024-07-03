import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateryComponent } from './catery.component';

describe('CateryComponent', () => {
  let component: CateryComponent;
  let fixture: ComponentFixture<CateryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CateryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CateryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
