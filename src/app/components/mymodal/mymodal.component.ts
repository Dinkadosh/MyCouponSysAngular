import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-mymodal',
  templateUrl: './mymodal.component.html',
  styleUrls: ['./mymodal.component.css']
})
export class MymodalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MymodalComponent>, 
    @Inject(MAT_DIALOG_DATA) public message: string) 
  { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
