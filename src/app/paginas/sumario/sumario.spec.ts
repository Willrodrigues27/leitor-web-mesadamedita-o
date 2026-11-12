import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sumario } from './sumario';

describe('Sumario', () => {
  let component: Sumario;
  let fixture: ComponentFixture<Sumario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sumario],
    }).compileComponents();

    fixture = TestBed.createComponent(Sumario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
