'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, Users, BookOpen, Layers } from 'lucide-react';

interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string;
}

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  forks_count: number;
}

interface GitHubData {
  profile: GitHubProfile;
  repos: Repository[];
  stats: {
    totalStars: number;
    languages: Record<string, number>;
    totalContributions: number;
  };
}

// Generate realistic commit counts for contribution grid (7 rows * 28 cols = 196 cells)
const MOCK_COMMITS_DENSITY = Array.from({ length: 196 }, () => {
  const r = Math.random();
  if (r > 0.8) return 4; // High activity (dark teal)
  if (r > 0.6) return 3; // Med-high activity
  if (r > 0.4) return 2; // Medium activity
  if (r > 0.15) return 1; // Low activity (light teal)
  return 0; // No activity
});

const DENSITY_CLASSES = [
  'bg-bg-secondary border-transparent', // 0
  'bg-accent-teal/20 border-accent-teal/10', // 1
  'bg-accent-teal/40 border-accent-teal/20', // 2
  'bg-accent-teal/70 border-accent-teal/40', // 3
  'bg-accent-teal border-accent-teal/60', // 4
];

export default function GithubSection() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/github')
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
      })
      .catch((err) => console.log('GitHub fetch failed:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-bg-secondary border-t border-b border-border-color/60">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-12 h-12 border-4 border-accent-teal border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary text-sm">Syncing with GitHub API...</p>
        </div>
      </section>
    );
  }

  const profile = data?.profile;
  const repos = data?.repos || [];
  const stats = data?.stats;

  return (
    <section className="py-20 bg-bg-secondary border-t border-b border-border-color/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 flex items-center justify-center gap-3">
            <svg className="w-8 h-8 text-accent-teal fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub Open Source Activity
          </h2>
          <div className="w-16 h-1 bg-accent-teal mx-auto rounded-full mb-6" />
          <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base">
            Exploring code metrics, active commit heatmaps, and repository indexing synced with GitHub username{' '}
            <a
              href="https://github.com/mustajaab1"
              target="_blank"
              rel="noreferrer"
              className="text-accent-teal font-semibold hover:underline"
            >
              @mustajaab1
            </a>.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Profile overview card (Col 4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {profile && (
              <div className="p-6 rounded-2xl bg-bg-primary border border-border-color shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-4 mb-4">
                  {/* Avatar */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    className="w-16 h-16 rounded-2xl border-2 border-accent-teal/30 shadow-md"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-text-primary">{profile.name}</h3>
                    <p className="text-xs text-text-tertiary">@{profile.login}</p>
                    <a
                      href={profile.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-accent-teal hover:text-accent-cyan mt-1 block"
                    >
                      View GitHub Profile
                    </a>
                  </div>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed mb-6">
                  {profile.bio || 'AI Engineer specializing in LangChain, RAG Systems, and Full Stack Development.'}
                </p>

                {/* Follower Stats Grid */}
                <div className="grid grid-cols-3 gap-3 text-center border-t border-border-color/60 pt-4">
                  <div className="p-2.5 rounded-xl bg-bg-secondary/40 border border-border-color/40">
                    <span className="block text-sm font-bold text-text-primary">{profile.public_repos}</span>
                    <span className="text-[10px] uppercase text-text-tertiary">Repos</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-bg-secondary/40 border border-border-color/40">
                    <span className="block text-sm font-bold text-text-primary">{profile.followers}</span>
                    <span className="text-[10px] uppercase text-text-tertiary">Followers</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-bg-secondary/40 border border-border-color/40">
                    <span className="block text-sm font-bold text-text-primary">{stats?.totalStars || 0}</span>
                    <span className="text-[10px] uppercase text-text-tertiary">Stars</span>
                  </div>
                </div>
              </div>
            )}

            {/* Language percentages */}
            {stats && (
              <div className="p-6 rounded-2xl bg-bg-primary border border-border-color shadow-sm">
                <h4 className="font-bold text-xs uppercase text-text-tertiary tracking-wider mb-4 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-accent-teal" />
                  Top Languages Used
                </h4>
                <div className="flex flex-col gap-3">
                  {Object.entries(stats.languages).map(([lang, percentage]) => (
                    <div key={lang}>
                      <div className="flex justify-between items-center text-xs font-medium text-text-secondary mb-1">
                        <span>{lang}</span>
                        <span>{percentage}%</span>
                      </div>
                      <div className="h-2 w-full bg-bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent-teal rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Activity grid & Repository Listing (Col 8) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Contribution Calendar Graph */}
            <div className="p-6 rounded-2xl bg-bg-primary border border-border-color shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-xs uppercase text-text-tertiary tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-accent-teal" />
                  Activity Contribution Graph
                </h4>
                <span className="text-[10px] text-text-tertiary">{stats?.totalContributions || 350} Commits past year</span>
              </div>

              {/* Grid block */}
              <div className="overflow-x-auto pb-2 no-scrollbar">
                <div className="grid grid-flow-col grid-rows-7 gap-1 w-max">
                  {MOCK_COMMITS_DENSITY.map((commits, idx) => (
                    <div
                      key={idx}
                      className={`w-3.5 h-3.5 rounded border ${DENSITY_CLASSES[commits]} hover:border-accent-teal transition-all duration-150 cursor-pointer`}
                      title={`${commits === 0 ? 'No' : commits * 3} contributions`}
                    />
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex justify-end gap-1.5 items-center mt-3 text-[10px] text-text-tertiary font-semibold">
                <span>Less</span>
                <div className="w-2.5 h-2.5 rounded bg-bg-secondary" />
                <div className="w-2.5 h-2.5 rounded bg-accent-teal/20" />
                <div className="w-2.5 h-2.5 rounded bg-accent-teal/40" />
                <div className="w-2.5 h-2.5 rounded bg-accent-teal/70" />
                <div className="w-2.5 h-2.5 rounded bg-accent-teal" />
                <span>More</span>
              </div>
            </div>

            {/* Repos Listing */}
            <div>
              <h4 className="font-bold text-sm uppercase text-text-primary mb-4">Recent Repositories</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {repos.map((repo) => (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -2 }}
                    className="p-5 rounded-2xl bg-bg-primary border border-border-color hover:border-accent-teal/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <h5 className="font-bold text-base text-text-primary mb-1.5 hover:text-accent-teal transition-colors">
                        {repo.name}
                      </h5>
                      <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed mb-4">
                        {repo.description || 'No description provided.'}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-xs text-text-tertiary pt-3 border-t border-border-color/60 mt-auto font-medium">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-accent-teal" />
                        {repo.language}
                      </span>
                      <div className="flex gap-4">
                        <span className="flex items-center gap-0.5">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <GitFork className="w-3.5 h-3.5 text-accent-cyan" />
                          {repo.forks_count}
                        </span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
