import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneProductComponent } from './one-product.component';

describe('OneProductComponent', () => {
  let component: OneProductComponent;
  let fixture: ComponentFixture<OneProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
