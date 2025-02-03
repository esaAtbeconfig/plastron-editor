import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlastronEditorComponent } from './plastron-editor.component';

describe('PlastronEditorComponent', () => {
  let component: PlastronEditorComponent;
  let fixture: ComponentFixture<PlastronEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlastronEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlastronEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
