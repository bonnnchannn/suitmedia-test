// Tipe data Post sesuaikan dengan struktur data dari API Anda
export type Post = {
  id: number;
  title: string;
  featured_image?: string | null; // Bisa undefined atau null
  published_at: string;
};

/**
 * Fungsi untuk mendapatkan URL gambar post
 * @param post - Data post yang mungkin memiliki featured_image
 * @returns URL gambar valid atau fallback image
 */
export const getImageUrl = (post: Post): string => {
  const fallbackUrl = '/favicon.png'; // Pastikan file ini ada di public/images/

  if (!post.featured_image) {
    return fallbackUrl;
  }

  // Jika URL sudah lengkap (contoh: https://example.com/image.jpg )
  if (post.featured_image.startsWith('http')) {
    return post.featured_image;
  }

  // Jika path relatif, gabungkan dengan base URL atau domain
  // Contoh: /uploads/image.jpg
  return post.featured_image;
};