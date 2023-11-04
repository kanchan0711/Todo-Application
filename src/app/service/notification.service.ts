import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  clear() {
    throw new Error('Method not implemented.');
  }
  constructor(private toastr: ToastrService) {}

  showInfo(data: any) {
    this.toastr.info(data);
  }

  showSuccess(data: any) {
    this.toastr.success(data);
  }

  showError(data: any) {
    this.toastr.error(data);
  }

  showWarning(data: any) {
    this.toastr.warning(data);
  }
}
