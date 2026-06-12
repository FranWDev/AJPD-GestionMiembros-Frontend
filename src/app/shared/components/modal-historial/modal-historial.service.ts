import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

export interface ModalHistorialData {
  id: number;
  miembroId: number;
  miembroNombre: string;
  miembroNif?: string;
  fechaInicio: string;
  fechaFin?: string | null;
  cargoId: number;
  isGlobal: boolean;
}

@Injectable({ providedIn: 'root' })
export class ModalHistorialService {
  private readonly _data = signal<ModalHistorialData | null>(null);
  private readonly _open = signal(false);
  private readonly _isClosing = signal(false);

  readonly data = this._data.asReadonly();
  readonly isOpen = this._open.asReadonly();
  readonly isClosing = this._isClosing.asReadonly();
  readonly guardado$ = new Subject<void>();

  open(data: ModalHistorialData): void {
    this._data.set(data);
    this._open.set(true);
  }

  cerrar(): void {
    this._isClosing.set(true);
    setTimeout(() => {
      this._open.set(false);
      this._data.set(null);
      this._isClosing.set(false);
    }, 200);
  }
}
