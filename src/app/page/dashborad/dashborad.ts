import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Articles } from '../../../services/article';
import { CommonModule } from '@angular/common';
import { Article } from '../../../models/article.model';

@Component({
  selector: 'app-dashborad',
  imports: [RouterModule, CommonModule ],
  templateUrl: './dashborad.html',
  styleUrl: './dashborad.scss'
})
export class Dashborad implements OnInit , OnDestroy {
  articles;
   baseUrl = 'http://localhost:1337';
  constructor(private Article : Articles) { }

  ngOnInit(): void {
    this.Article.getArticles().subscribe({
      next: (res) => {
        this.articles = res;
        console.log('Articles fetched successfully:', this.articles);
      },
      error: (err) => console.error('Error fetching articles:', err),
    });
  }

  getPlainText(content: any[]): string {
    return content?.map(block =>
      block.children.map((child: any) => child.text).join('')
    ).join('\n') ?? '';
  }

  getImageUrl(article: Article): string {
    if (!article.thumbnail) return 'assets/images/default.jpg';

    // เลือกรูป small ถ้ามี ไม่มีก็ใช้ default url
    const url = article.thumbnail.formats?.small?.url || article.thumbnail.url;
    return this.baseUrl + url;
  }
  
  ngOnDestroy(): void {
    // Clean up if necessary
  }
}
