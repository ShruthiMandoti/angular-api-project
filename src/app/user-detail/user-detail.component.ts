import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  user: any;
  loading = true; // Add loading flag
  spinnerColor = 'spinner-blue'; // Default spinner color
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Change spinner color randomly
      const colors = ['spinner-blue', 'spinner-red', 'spinner-green', 'spinner-yellow'];
      this.spinnerColor = colors[Math.floor(Math.random() * colors.length)];

      this.userService.getUserById(+id).subscribe(
        (data: any) => {
          // Simulate delay for lazy loading effect
          setTimeout(() => {
            this.user = data;
            this.loading = false;
          }, 1200); // 1.2 seconds delay
        },
        (error: any) => {
          console.error('Error fetching user details:', error);
          this.loading = false;
        }
      );
    }
  }
}

