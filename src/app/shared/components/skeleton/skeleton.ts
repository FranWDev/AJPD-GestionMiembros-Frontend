import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.css',
})
export class SkeletonComponent {
  @Input() rows = 5;
  @Input() cols = 4;
  @Input() colWidths: number[] = [];
  @Input() headers: string[] = [];
  @Input() variant: 'table' | 'maestro' | 'timeline' = 'table';

  get rowsArray(): number[] {
    return Array.from({ length: this.rows }, (_, i) => i);
  }

  get colsArray(): number[] {
    return Array.from({ length: this.cols }, (_, i) => i);
  }

  colWidth(i: number): string {
    return this.colWidths[i] != null ? `${this.colWidths[i]}%` : 'auto';
  }

  headerLabel(i: number): string {
    return this.headers[i] ?? '';
  }

  get hasHeaders(): boolean {
    return this.headers.length > 0;
  }
}
