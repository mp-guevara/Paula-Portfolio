import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/animations';

declare const anime: any;
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('textReveal', [
      state('hidden', style({
        transform: 'scaleX(0)',
        opacity: 0
      })),
      state('visible', style({
        transform: 'scaleX(1)',
        opacity: 1
      })),
      transition('hidden => visible', animate('3s ease-in-out'))
    ])
  ],
})
export class BannerComponent implements AfterViewInit {
 

  constructor(private elRef: ElementRef) { }


  ngAfterViewInit(): void {
   
    this.animateBannerText();
  }

 

  private animateBannerText() {
    const textWrapper = document.querySelector('.welcome');
    if (textWrapper) {
      const textContent = textWrapper.textContent;
      if (textContent) {

        textWrapper.innerHTML = textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline({ loop: false }).add({
          targets: '.welcome .letter',
          scale: [0.3, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: "easeOutExpo",
          delay: (el: any, i: number) => 100 * i,
          complete: () => {
            this.startTextReveal();
          }
        });
      }
    }
  }

  startTextReveal() {
    const textRevealElement = this.elRef.nativeElement.querySelector('.t-reveal span');
    if (textRevealElement) {
      textRevealElement.style.animationPlayState = 'running';
    }
  }
}

