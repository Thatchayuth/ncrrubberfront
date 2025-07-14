// รูปแบบ Thumbnail ขนาดต่าง ๆ (small, medium, large, thumbnail)
export interface ThumbnailFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

// รูปภาพหลักของบทความ
export interface Thumbnail {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: ThumbnailFormat;
    small?: ThumbnailFormat;
    medium?: ThumbnailFormat;
    large?: ThumbnailFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// โครงสร้างเนื้อหาบทความแบบ Rich Text (จาก Editor เช่น Slate.js)
export interface ContentBlock {
  type: string;
  children: {
    type: string;
    text: string;
  }[];
}

// บทความเดี่ยว
export interface Article {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  slug: string;
  content: ContentBlock[];
  publishedDate: string;
  isPinned: boolean | null;
  ExpDate: string;
  thumbnail: Thumbnail | null;
  attachments: any;
  category: any;
  tags: any[];
}

// โครงสร้าง response จาก Strapi
export interface ArticleResponse {
  data: Article[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
