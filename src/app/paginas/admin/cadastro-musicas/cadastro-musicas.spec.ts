import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroMusicas } from './cadastro-musicas';

describe('CadastroMusicas', () => {
  let component: CadastroMusicas;
  let fixture: ComponentFixture<CadastroMusicas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroMusicas],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroMusicas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
