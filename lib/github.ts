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
  // Return static data for static export
  const staticData = {
    totalContributions: 1250,
    weeks: generateStaticWeeks(),
  };

  return {
    contributions: staticData,
    isLoading: false,
    isError: null,
  };
}

function generateStaticWeeks() {
  const weeks = [];
  const now = new Date();
  
  for (let i = 0; i < 52; i++) {
    const week = {
      contributionDays: [] as any[],
    };
    
    for (let j = 0; j < 7; j++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (51 - i) * 7 - (6 - j));
      
      const contributionCount = Math.floor(Math.random() * 10);
      let color = '#ebedf0';
      
      if (contributionCount > 0) {
        if (contributionCount <= 3) color = '#9be9a8';
        else if (contributionCount <= 6) color = '#40c463';
        else if (contributionCount <= 8) color = '#30a14e';
        else color = '#216e39';
      }
      
      week.contributionDays.push({
        contributionCount,
        date: date.toISOString().split('T')[0],
        color,
      });
    }
    
    weeks.push(week);
  }
  
  return weeks;
}
