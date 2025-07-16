import Image from 'next/image';
import Link from 'next/link';
import type { Post } from './PostList';
import { getImageUrl } from '@/utils/image'; // <-- 1. Impor fungsi getImageUrl

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  // 2. Panggil fungsi untuk mendapatkan URL, logikanya sudah tidak ada di sini lagi.
  const displayUrl = getImageUrl(post);

  return (
    <Link
      href={`/ideas/${post.id}`}
      className="block bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={displayUrl} // Gunakan URL yang sudah diproses
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          unoptimized 
        />
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-2">
          {new Date(post.published_at).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric'
          })}
        </p>
        <h3 className="font-semibold text-base text-gray-800 h-[48px] line-clamp-2">
          {post.title}
        </h3>
      </div>
    </Link>
  );
};

export default PostCard;