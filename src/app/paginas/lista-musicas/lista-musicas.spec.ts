import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaMusicas } from './lista-musicas';

describe('ListaMusicas', () => {
  let component: ListaMusicas;
  let fixture: ComponentFixture<ListaMusicas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMusicas],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaMusicas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
