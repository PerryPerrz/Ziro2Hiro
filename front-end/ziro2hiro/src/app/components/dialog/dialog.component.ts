import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../../hero';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  name!: string;
  nemesis!: string;
  team!: string;
  date!: Date;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, private readonly httpClient: HttpClient) { }

  onSubmit() {
    let hero: Hero = {
      id: -1,
      team: this.team,
      parution: this.date,
      name: this.name,
      nemesis: this.nemesis,
      image: "-"
    }

    // Ici, vous pouvez gérer l'ajout du héros et de son némésis
    this.httpClient.post<Array<Hero>>("http://localhost:9000/api/add", hero).subscribe(rep => {
      console.log(rep);
    });
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
