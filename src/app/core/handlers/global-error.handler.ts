import { ErrorHandler, Injectable, inject, NgZone } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly modalService = inject(ModalService);
  private readonly zone = inject(NgZone);

  handleError(error: any): void {
    console.error('Error global capturado:', error);

    const message = error instanceof Error ? error.message : String(error);

    this.zone.run(() => {
      this.modalService.showError(
        'Se ha producido un error inusual',
        message || 'Ocurrió un error inesperado en la aplicación.'
      );
    });
  }
}
