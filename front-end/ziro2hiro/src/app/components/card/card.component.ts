import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../../hero';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() hero!: Hero;
  @Output() deleteHero = new EventEmitter<number>();
  @Output() editHero = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  edit(id: number): void {
    this.editHero.emit(id);
  }

  delete(id: number): void {
    this.deleteHero.emit(id);
  }
}
