import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColoresComplementariosPage } from './colores-complementarios.page';

describe('ColoresComplementariosPage', () => {
  let component: ColoresComplementariosPage;
  let fixture: ComponentFixture<ColoresComplementariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ColoresComplementariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
