'use client';

import { useGitHubContributions } from '@/lib/github';
import { profile } from '@/config/profile';

export function Contributions() {
  const username = profile.social.github.split('/').pop() || '';
  const { contributions, isLoading, isError } = useGitHubContributions(username);

  if (isLoading) {
    return (
      <section id="contributions" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">GitHub 贡献</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !contributions) {
    return (
      <section id="contributions" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">GitHub 贡献</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <p className="text-center text-gray-600 dark:text-gray-400">
              无法加载贡献数据，请稍后再试。
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contributions" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">GitHub 贡献</h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">
              {contributions.totalContributions} 次贡献（过去一年）
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <div className="inline-grid grid-cols-53 gap-1">
              {contributions.weeks.map((week: any, weekIndex: number) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.contributionDays.map((day: any, dayIndex: number) => (
                    <div
                      key={dayIndex}
                      className="w-3 h-3 rounded-sm"
                      style={{
                        backgroundColor: day.color || '#ebedf0',
                      }}
                      title={`${day.date}: ${day.contributionCount} 次贡献`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-end gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>少</span>
            <div className="flex gap-1">
              {['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'].map((color, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span>多</span>
          </div>
        </div>
      </div>
    </section>
  );
}