import { Injectable, signal } from '@angular/core';

export type ModalType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private readonly _isOpen = signal(false);
  private readonly _isClosing = signal(false);

  readonly isOpen = this._isOpen.asReadonly();
  readonly isClosing = this._isClosing.asReadonly();
  readonly type = signal<ModalType>('info');
  readonly title = signal('');
  readonly message = signal('');

  show(type: ModalType, title: string, message: string): void {
    this.type.set(type);
    this.title.set(title);
    this.message.set(message);
    this._isOpen.set(true);
  }

  showError(title: string, message: string): void {
    this.show('error', title, message);
  }

  showSuccess(title: string, message: string): void {
    this.show('success', title, message);
  }

  showWarning(title: string, message: string): void {
    this.show('warning', title, message);
  }

  close(): void {
    this._isClosing.set(true);
    setTimeout(() => {
      this._isOpen.set(false);
      this._isClosing.set(false);
    }, 200);
  }
}
