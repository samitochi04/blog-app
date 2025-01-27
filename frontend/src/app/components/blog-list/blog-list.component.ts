import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class BlogListComponent implements OnInit {
  blogs: any[] = [];
  isAdmin: boolean = false;

  constructor(
    private blogService: BlogService,
    private authService: AuthService,
    private router: Router
  ) {
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.blogService.getAllBlogs().subscribe({
      next: (blogs) => {
        this.blogs = blogs;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des blogs:', error);
      }
    });
  }

  editBlog(id: string) {
    this.router.navigate(['/blogs/edit', id]);
  }

  deleteBlog(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      this.blogService.deleteBlog(id).subscribe({
        next: () => {
          this.loadBlogs();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      });
    }
  }
}
