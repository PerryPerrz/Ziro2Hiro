import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../../hero';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  heroes$: Observable<Array<Hero>> = EMPTY;

  constructor(private readonly httpClient: HttpClient, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.heroes$ = this.httpClient.get<Array<Hero>>('http://localhost:9000/api/heroes');
  }

  deleteHero($event: number): void {
    this.heroes$ = this.httpClient.delete<Array<Hero>>(`http://localhost:9000/api/delete/${$event}`);
  }

  addHero(): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialogue fermé', result);
    });
  }

  editHero($event: Hero): void {
    this.httpClient.put(`http://localhost:9000/api/heroes/${$event.id}`, $event).subscribe();
  }
}
