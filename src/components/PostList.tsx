"use client";

import { useState, useEffect, useMemo } from "react";
import PostCard from "./PostCard";

export interface Post {
  id: number;
  title: string;
  published_at: string;
  small_image: { url: string }[];
}

// Definisikan tipe untuk metadata paginasi dari API
interface Meta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

const PostList = () => {
  // State untuk menyimpan data dari API
  const [posts, setPosts] = useState<Post[]>([]); // Sekarang TypeScript tahu apa itu 'Post'
  const [meta, setMeta] = useState<Meta | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // State untuk filter dan paginasi
  const [sortBy, setSortBy] = useState("newest");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isClient, setIsClient] = useState(false);

  // useEffect untuk memuat state dari localStorage
  useEffect(() => {
    setIsClient(true);
    const savedSortBy = localStorage.getItem("post_sort_by");
    const savedItemsPerPage = localStorage.getItem("post_items_per_page");
    const savedCurrentPage = localStorage.getItem("post_current_page");

    if (savedSortBy) setSortBy(savedSortBy);
    if (savedItemsPerPage) setItemsPerPage(Number(savedItemsPerPage));
    if (savedCurrentPage) setCurrentPage(Number(savedCurrentPage));
  }, []);

  // useEffect untuk mengambil data dari API
  useEffect(() => {
    if (!isClient) return;

    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          size: itemsPerPage.toString(),
          sort: sortBy === "newest" ? "-published_at" : "published_at",
        });

        const response = await fetch(`/api/ideas?${params.toString()}`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const result = await response.json();

        setPosts(result.data);
        setMeta(result.meta);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, itemsPerPage, sortBy, isClient]);

  // useEffect untuk menyimpan state ke localStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("post_sort_by", sortBy);
      localStorage.setItem("post_items_per_page", String(itemsPerPage));
      localStorage.setItem("post_current_page", String(currentPage));
    }
  }, [sortBy, itemsPerPage, currentPage, isClient]);

  // Logika paginasi
  const totalPages = meta?.last_page || 1;
  const paginationRange = useMemo(
    () => generatePagination(currentPage, totalPages),
    [currentPage, totalPages]
  );
  const handlePageChange = (page: number | string) => {
    if (typeof page === "number" && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section id="posts" className="container mx-auto px-6 py-12 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <p className="text-gray-600 text-sm">
          Showing {meta ? (currentPage - 1) * itemsPerPage + 1 : 0} -{" "}
          {meta ? Math.min(currentPage * itemsPerPage, meta.total) : 0} of{" "}
          {meta?.total || 0}
        </p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <label htmlFor="show-per-page" className="text-sm text-gray-600">
              Show per page:
            </label>
            <div className="relative">
              <select
                id="show-per-page"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort-by" className="text-sm text-gray-600">
              Sort by:
            </label>
            <div className="relative">
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-gray-500">Loading ideas...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <div className="flex justify-center items-center mt-12 space-x-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
              &lt;
            </button>
            {paginationRange.map((page, index) => {
              if (page === "...") {
                return (
                  <span key={index} className="px-3 py-1">
                    ...
                  </span>
                );
              }
              return (
                <button
                  key={index}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === page
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </section>
  );
};

// Fungsi generatePagination
const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
  if (currentPage > totalPages - 4)
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};

export default PostList;