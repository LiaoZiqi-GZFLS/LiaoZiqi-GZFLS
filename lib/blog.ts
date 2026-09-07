import useSWR from 'swr';

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  categories: string[];
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useBlogPosts(blogUrl: string, count = 4) {
  const { data, error, isLoading } = useSWR<BlogPost[]>(
    `/api/blog/posts?url=${encodeURIComponent(blogUrl)}&count=${count}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 3600000,
    }
  );

  return {
    posts: data || [],
    isLoading,
    isError: error,
  };
}