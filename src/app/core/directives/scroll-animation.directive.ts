import { Directive, ElementRef, Renderer2, OnInit, OnDestroy, NgZone } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]'
})
export class ScrollAnimationDirective implements OnInit, OnDestroy {
  private hasClassBeenAdded = false;
  private scrollHandler: any; 

  constructor(private el: ElementRef, private renderer: Renderer2, private ngZone: NgZone) {
  }

  ngOnInit() {
    this.scrollHandler = this.checkPosition.bind(this);

    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('load', this.scrollHandler, false);
    });

    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.scrollHandler, false);
    });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollHandler, false);
    window.removeEventListener('load', this.scrollHandler, false);
  }

  private checkPosition() {
    if (this.hasClassBeenAdded) { return; }

    const element = this.el.nativeElement;
    const position = element.getBoundingClientRect();

    if (position.top <= window.innerHeight && position.bottom >= 0) {
      this.ngZone.run(() => {
        this.renderer.addClass(element, 'animate-element'); 
        this.hasClassBeenAdded = true;
      });
    }
  }
}