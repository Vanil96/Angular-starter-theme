import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]'
})
export class ScrollAnimationDirective {
  private hasClassBeenAdded = false;
  @Input() animationClass: string = 'animate-element';

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.checkPosition();
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    this.checkPosition();
  }

  private checkPosition() {
    if (this.hasClassBeenAdded) { return; }

    const element = this.el.nativeElement;
    const position = element.getBoundingClientRect();

    if (position.top <= window.innerHeight && position.bottom >= 0) {
      this.renderer.addClass(element, this.animationClass);
      this.hasClassBeenAdded = true;
    }
  }

}