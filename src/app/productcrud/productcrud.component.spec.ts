import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcrudComponent } from './productcrud.component';

describe('ProductcrudComponent', () => {
  let component: ProductcrudComponent;
  let fixture: ComponentFixture<ProductcrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductcrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductcrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
