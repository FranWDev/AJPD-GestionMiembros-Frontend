import { Injectable, signal, computed } from '@angular/core';
import { MiembroResponse } from '../../../core/models/miembro.model';

@Injectable({ providedIn: 'root' })
export class ModalDetailService {
  private readonly _miembro = signal<MiembroResponse | null>(null);
  private readonly _open = signal(false);
  private readonly _isClosing = signal(false);

  readonly miembro = this._miembro.asReadonly();
  readonly isOpen = this._open.asReadonly();
  readonly isClosing = this._isClosing.asReadonly();

  open(miembro: MiembroResponse): void {
    this._miembro.set(miembro);
    this._open.set(true);
  }

  cerrar(): void {
    this._isClosing.set(true);
    setTimeout(() => {
      this._open.set(false);
      this._miembro.set(null);
      this._isClosing.set(false);
    }, 200);
  }
}
