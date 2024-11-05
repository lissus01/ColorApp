import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorimetriaPage } from './colorimetria.page';

describe('ColorimetriaPage', () => {
  let component: ColorimetriaPage;
  let fixture: ComponentFixture<ColorimetriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorimetriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
