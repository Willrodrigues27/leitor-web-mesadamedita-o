import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GerenciarLeitores } from './gerenciar-leitores';

describe('GerenciarLeitores', () => {
  let component: GerenciarLeitores;
  let fixture: ComponentFixture<GerenciarLeitores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarLeitores],
    }).compileComponents();

    fixture = TestBed.createComponent(GerenciarLeitores);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
