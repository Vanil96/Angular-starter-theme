import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]'
})
export class ScrollAnimationDirective implements OnInit {
  private hasClassBeenAdded = false;
  @Input() animationClass: string = 'animate-element';

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    window.addEventListener('load', () => {
      this.checkPosition();
    })
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
