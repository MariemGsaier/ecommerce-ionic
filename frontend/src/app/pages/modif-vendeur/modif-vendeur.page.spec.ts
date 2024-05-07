import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifVendeurPage } from './modif-vendeur.page';

describe('ModifVendeurPage', () => {
  let component: ModifVendeurPage;
  let fixture: ComponentFixture<ModifVendeurPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModifVendeurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
