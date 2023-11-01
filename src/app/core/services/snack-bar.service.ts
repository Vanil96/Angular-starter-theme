import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar, private translate: TranslateService) { }
  open(message: string, type: 'warn' | 'success' | 'info' = 'info'): void {
    this.snackBar.open(this.translate.instant(message), '', {
      duration: 4500,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      panelClass: [`snackbar-${type}`],
    });
  }

}
