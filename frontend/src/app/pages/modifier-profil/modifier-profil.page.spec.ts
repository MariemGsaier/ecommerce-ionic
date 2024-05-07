import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifierProfilPage } from './modifier-profil.page';

describe('ModifierProfilPage', () => {
  let component: ModifierProfilPage;
  let fixture: ComponentFixture<ModifierProfilPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModifierProfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
