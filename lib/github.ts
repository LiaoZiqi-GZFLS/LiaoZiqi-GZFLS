import useSWR from 'swr';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useGitHubRepos(username: string) {
  const { data, error, isLoading } = useSWR<GitHubRepo[]>(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 3600000, // 1 hour
    }
  );

  return {
    repos: data || [],
    isLoading,
    isError: error,
  };
}

export function useGitHubContributions(username: string) {
  const { data, error, isLoading } = useSWR(
    `/api/github/contributions?username=${username}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 3600000,
    }
  );

  return {
    contributions: data,
    isLoading,
    isError: error,
  };
}