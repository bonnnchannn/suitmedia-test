import Image from 'next/image';
import Link from 'next/link';
import type { Post } from './PostList';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const imageUrl = post.small_image?.[0]?.url || 'https://via.placeholder.com/400x300'; // fallback jika gambar tidak tersedia
  const publishedDate = new Date(post.published_at);

  return (
    <Link
      href={`/ideas/${post.id}`}
      className="block bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={imageUrl}
          alt={post.title || 'Post Image'}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority // Menambahkan properti priority untuk gambar utama
          unoptimized // Menggunakan unoptimized untuk gambar besar jika diperlukan
        />
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-500 mb-2">
          {/* Memastikan format tanggal yang lebih aman */}
          {post.published_at ? publishedDate.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }) : 'Tanggal tidak tersedia'}
        </p>
        <h3 className="font-semibold text-base text-gray-800 h-[48px] line-clamp-2">
          {post.title}
        </h3>
      </div>
    </Link>
  );
};

export default PostCard;
