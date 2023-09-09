import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  @Input() totalItems: number;
  @Input() itemsPerPage: number = 20;
  @Input() currentPage: number = 1;
  @Output() changePage = new EventEmitter<number>();
  
  totalPages: number;
  pages: number[] = [];
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalItems'] || changes['itemsPerPage']) {
      this.calculateTotalPages();
    }
  }
  
  private calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.generatePageNumbers();
  }

  private generatePageNumbers() {
    this.pages = [];
    let start = Math.max(this.currentPage - 2, 1);
    let end = Math.min(this.currentPage + 2, this.totalPages);

    if (this.currentPage === 1) {
      start = 1;
      end = Math.min(3, this.totalPages);
    } else if (this.currentPage === this.totalPages) {
      start = Math.max(this.totalPages - 2, 1);
      end = this.totalPages;
    }

    for (let i = start; i <= end; i++) {
      this.pages.push(i);
    }
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.changePage.emit(this.currentPage);
    this.generatePageNumbers();
  }

}
