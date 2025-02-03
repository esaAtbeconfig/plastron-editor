import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FixationsComponent } from './fixations.component';

describe('FixationsComponent', () => {
  let component: FixationsComponent;
  let fixture: ComponentFixture<FixationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FixationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
