import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesdeniedComponent } from './accesdenied.component';

describe('AccesdeniedComponent', () => {
  let component: AccesdeniedComponent;
  let fixture: ComponentFixture<AccesdeniedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccesdeniedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccesdeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
