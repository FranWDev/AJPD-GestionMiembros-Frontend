import { Injectable, signal, computed } from '@angular/core';

export interface ConfirmConfig {
  titulo: string;
  mensaje: string;
  tipo?: 'danger' | 'warning' | 'info';
  labelConfirmar?: string;
  labelCancelar?: string;
  onConfirmar: () => void;
}

@Injectable({ providedIn: 'root' })
export class ModalConfirmService {
  private readonly _config = signal<ConfirmConfig | null>(null);
  private readonly _open = signal(false);
  private readonly _isClosing = signal(false);

  readonly config = this._config.asReadonly();
  readonly isOpen = this._open.asReadonly();
  readonly isClosing = this._isClosing.asReadonly();

  open(config: ConfirmConfig): void {
    this._config.set(config);
    this._open.set(true);
  }

  confirmar(): void {
    this._config()?.onConfirmar();
    this.cerrar();
  }

  cerrar(): void {
    this._isClosing.set(true);
    setTimeout(() => {
      this._open.set(false);
      this._config.set(null);
      this._isClosing.set(false);
    }, 200);
  }
}
