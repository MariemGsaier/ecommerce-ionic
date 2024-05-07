import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjoutVendeurPage } from './ajout-vendeur.page';

describe('AjoutVendeurPage', () => {
  let component: AjoutVendeurPage;
  let fixture: ComponentFixture<AjoutVendeurPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AjoutVendeurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
