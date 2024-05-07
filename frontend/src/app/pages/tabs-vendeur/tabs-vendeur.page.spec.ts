import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsVendeurPage } from './tabs-vendeur.page';

describe('TabsVendeurPage', () => {
  let component: TabsVendeurPage;
  let fixture: ComponentFixture<TabsVendeurPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TabsVendeurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
