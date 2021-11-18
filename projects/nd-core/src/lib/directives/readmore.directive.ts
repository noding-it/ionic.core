import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
    selector: '[read-more]'
})
export class ReadMoreDirective implements OnInit {

    @Input('read-more') text: string;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
    }

    ngOnInit() {
        if (this.text && this.text.length > 30) {
            let text = this.renderer.createText(this.text.substring(0, 30));
            this.renderer.appendChild(this.elementRef.nativeElement, text);

            const link = this.renderer.createElement('a');
            link.href = 'link to long';
            link.innerHTML = 'Read More';

            this.renderer.appendChild(this.elementRef.nativeElement, link);
            return;
        }
        this.elementRef.nativeElement.innerText = this.text;
    }
}
