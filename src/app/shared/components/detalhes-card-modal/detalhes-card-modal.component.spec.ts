import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesCardModalComponent } from './detalhes-card-modal.component';

describe('DetalhesCardModalComponent', () => {
  let component: DetalhesCardModalComponent;
  let fixture: ComponentFixture<DetalhesCardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesCardModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
