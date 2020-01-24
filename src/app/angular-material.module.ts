import { NgModule } from '@angular/core';
import {
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatToolbarModule,
    MatSlideToggleModule
} from '@angular/material';

const MaterialComponents = [
    MatDialogModule, 
    MatFormFieldModule, 
    MatCardModule, 
    MatButtonModule,
    MatInputModule, 
    MatPaginatorModule, 
    MatProgressSpinnerModule, 
    MatSortModule,
    MatTableModule, 
    MatIconModule, 
    MatToolbarModule, 
    MatSlideToggleModule
]

@NgModule({
    imports: [
        MaterialComponents],
    exports: [
        MaterialComponents]
})

export class AngularMaterialModule { }