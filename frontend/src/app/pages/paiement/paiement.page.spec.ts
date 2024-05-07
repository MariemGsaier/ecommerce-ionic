import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaiementPage } from './paiement.page';

describe('PaiementPage', () => {
  let component: PaiementPage;
  let fixture: ComponentFixture<PaiementPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaiementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
