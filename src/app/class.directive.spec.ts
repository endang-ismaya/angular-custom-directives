import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ClassDirective } from './class.directive';

@Component({
  standalone: true,
  imports: [ClassDirective],
  template: `<div [appClass]="{ active: true, disabled: false }">test</div>`
})
class TestHostComponent {
  classes = { active: true, disabled: false };
}

describe('ClassDirective', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();
  });

  it('should add active class', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('div');
    expect(element.classList.contains('active')).toBe(true);
  });

  it('should not add disabled class', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('div');
    expect(element.classList.contains('disabled')).toBe(false);
  });
});