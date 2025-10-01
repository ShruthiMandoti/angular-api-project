import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,
     RouterLink,MatPaginatorModule,
     MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule,
    MatTabsModule,
    MatIconModule,
    FormsModule],
     changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  providers: [provideNativeDateAdapter()]
})
export class UserListComponent implements OnInit {
 value!: Date;

  users: any[] = [];
  private userService = inject(UserService);

   @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Example: track pagination changes
  onPageChange(event: any) {
    console.log(event); 
    // event gives {pageIndex, pageSize, length}
  }

  // Carousel properties
  carouselImages = [
    { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', alt: 'Nature 1' },
    { src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', alt: 'Nature 2' },
    { src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', alt: 'Nature 3' },
    { src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80', alt: 'Nature 4' }
  ];
  carouselIndex = 0;

  prevImage() {
    this.carouselIndex = (this.carouselIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
  }
  nextImage() {
    this.carouselIndex = (this.carouselIndex + 1) % this.carouselImages.length;
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
