import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifierMdpPage } from './modifier-mdp.page';

describe('ModifierMdpPage', () => {
  let component: ModifierMdpPage;
  let fixture: ComponentFixture<ModifierMdpPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModifierMdpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
