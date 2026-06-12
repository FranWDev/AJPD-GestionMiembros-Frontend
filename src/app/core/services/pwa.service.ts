import { Injectable, inject, signal, computed } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ModalConfirmService } from '../../shared/components/modal-confirm/modal-confirm.service';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private readonly swUpdate = inject(SwUpdate);
  private readonly modalConfirm = inject(ModalConfirmService);

  private readonly deferredPrompt = signal<any>(null);
  readonly installable = computed(() => this.deferredPrompt() !== null);

  constructor() {
    this.initInstallPromptListener();
    this.initUpdateListener();
  }

  private initInstallPromptListener(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      this.deferredPrompt.set(e);
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt.set(null);
    });
  }

  private initUpdateListener(): void {
    if (!this.swUpdate.isEnabled) return;

    this.swUpdate.versionUpdates.subscribe((evt) => {
      if (evt.type === 'VERSION_READY') {
        this.modalConfirm.open({
          titulo: 'Actualización disponible',
          mensaje: 'Hay una nueva versión de la aplicación disponible. ¿Deseas recargar la página para actualizar ahora?',
          tipo: 'info',
          labelConfirmar: 'Actualizar',
          labelCancelar: 'Más tarde',
          onConfirmar: () => {
            window.location.reload();
          },
        });
      }
    });
  }

  async install(): Promise<void> {
    const prompt = this.deferredPrompt();
    if (!prompt) return;

    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === 'accepted') {
      this.deferredPrompt.set(null);
    }
  }
}
