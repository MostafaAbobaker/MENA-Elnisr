import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  // email:string = 'elmestawrd.mena.elnisr@gmail.com'
  email:string = ''
year= new Date();

}
