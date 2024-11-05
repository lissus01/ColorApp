import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CuidadoPielPage } from './cuidado-piel.page';

describe('CuidadoPielPage', () => {
  let component: CuidadoPielPage;
  let fixture: ComponentFixture<CuidadoPielPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CuidadoPielPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
