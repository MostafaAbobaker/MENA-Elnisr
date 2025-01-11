import { Component, Input } from '@angular/core';
import { ICategry } from 'src/app/Interfaces/icategry';

@Component({
  selector: 'app-categorie-item',
  templateUrl: './categorie-item.component.html',
  styleUrls: ['./categorie-item.component.scss']
})
export class CategorieItemComponent {
  @Input() category!: ICategry;

}
