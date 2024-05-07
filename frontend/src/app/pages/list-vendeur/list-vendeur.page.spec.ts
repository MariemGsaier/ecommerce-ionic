import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListVendeurPage } from './list-vendeur.page';

describe('ListVendeurPage', () => {
  let component: ListVendeurPage;
  let fixture: ComponentFixture<ListVendeurPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListVendeurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
