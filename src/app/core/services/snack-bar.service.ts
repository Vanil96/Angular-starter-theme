import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}
  open(message: string, type: 'warn' | 'success' | 'info' = 'info'): void {
    this.snackBar.open(message, '', {
      duration: 4500,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      panelClass: [`snackbar-${type}`],
    });
  }
}
