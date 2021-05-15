import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractDataMainComponent } from './abstract-data-main.component';

describe('AbstractDataMainComponent', () => {
  let component: AbstractDataMainComponent;
  let fixture: ComponentFixture<AbstractDataMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbstractDataMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractDataMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
