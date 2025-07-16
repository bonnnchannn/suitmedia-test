// utils/image.ts
import { Post } from '@/components/PostList';

export const getImageUrl = (post: Post): string => {
  // Cek apakah small_image ada dan memiliki minimal 1 item
  if (post.small_image && post.small_image.length > 0) {
    const imageUrl = post.small_image[0]?.url;
    
    // Pastikan URL tidak kosong
    if (imageUrl && imageUrl.trim() !== '') {
      return imageUrl;
    }
  }

  // Fallback ke placeholder
  return '/citi.jpg';
};