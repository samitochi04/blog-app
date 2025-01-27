import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class BlogFormComponent implements OnInit {
  blog: any = {
    title: '',
    content: ''
  };
  isEditing: boolean = false;
  error: string = '';

  constructor(
    private blogService: BlogService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log('État utilisateur:', this.authService.currentUserValue);
    console.log('Est admin?', this.authService.isAdmin());
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditing = true;
      this.blogService.getBlogById(id).subscribe({
        next: (blog) => {
          this.blog = blog;
        },
        error: (error) => {
          this.error = 'Erreur lors du chargement du blog';
          console.error(error);
        }
      });
    }
  }

  onSubmit() {
    console.log('Token actuel:', this.authService.currentUserValue?.token);
    console.log('Blog à créer:', this.blog);

    const operation = this.isEditing
      ? this.blogService.updateBlog(this.route.snapshot.params['id'], this.blog)
      : this.blogService.createBlog(this.blog);

    operation.subscribe({
      next: (response) => {
        console.log('Réponse succès:', response);
        this.router.navigate(['/blogs']);
      },
      error: (error) => {
        console.error('Erreur détaillée:', error);
        this.error = error.error?.message || 'Erreur lors de l\'opération sur le blog';
      }
    });
  }

  cancel() {
    this.router.navigate(['/blogs']);
  }
} 