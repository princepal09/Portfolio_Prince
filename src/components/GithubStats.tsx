"use client";

import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Calendar, GitBranch, GitCommit, Star } from "lucide-react";
import { motion } from "framer-motion";
import { profile, siteLinks } from "@/constants";
import { getCurrentStreak } from "@/lib/github-streak";
import type { GithubStats as Stats } from "@/lib/github-types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@/lib/utils";

const GithubStats = () => {
  const [stats, setStats] = useState<(Stats & { currentStreak: number }) | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const request = new AbortController();

    async function loadStats() {
      try {
        const response = await fetch(siteLinks.githubActivity, { signal: request.signal });
        if (!response.ok) {
          const message = response.status === 503
            ? "Live GitHub activity will appear once it is connected."
            : "GitHub activity is temporarily unavailable.";
          throw new Error(message);
        }
        const data: Stats = await response.json();
        setStats({
          ...data,
          currentStreak: getCurrentStreak(data.contributions, new Date()),
        });
      } catch (error) {
        if (!request.signal.aborted) {
          setError(error instanceof Error ? error.message : "GitHub activity is temporarily unavailable.");
        }
      }
    }

    void loadStats();
    return () => request.abort();
  }, []);

  if (error) {
    return (
      <Card className="gap-2 p-6">
        <p className="text-muted-foreground">{error}</p>
        <a className="w-fit text-sm text-primary hover:underline" href={profile.githubUrl} target="_blank" rel="noreferrer">
          View my GitHub profile
        </a>
      </Card>
    );
  }
  if (!stats) {
    return (
      <Card className="p-4 sm:p-6 bg-card border-border/5">
        <div className="motion-safe:animate-pulse space-y-4" role="status" aria-label="Loading GitHub activity">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-8 bg-muted rounded" />
          <div className="h-32 bg-muted rounded" />
        </div>
      </Card>
    );
  }

  const maxContributions = Math.max(0, ...stats.contributions.map((day) => day.count));
  const getContributionLevel = (count: number) => {
    if (count == 0) return "bg-muted";
    const percentage = (count / maxContributions) * 100;
    if (percentage <= 25) return "bg-primary/30";
    if (percentage <= 50) return "bg-primary/50";
    if (percentage <= 75) return "bg-primary/70";

    return "bg-primary";
  };

  return (
    <Card className="p-4  sm:p-6 lg:p-8 bg-card border-border/5 backdrop-blur-sm overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 sm:space-y-8"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <GitCommit className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>

          <h3 className="text-lg sm:text-xl font-semibold">
            Contribution Activity
          </h3>
        </div>

        <div className="grid-cols-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="p-4 rounded-b-lg bg-secondary/50 backdrop-blur-sm"
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Current Streak</p>
            <p className="text-xl sm:text-2xl font-bold text-primary">
              {stats.currentStreak} {stats.currentStreak === 1 ? "day" : "days"}
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="p-4 rounded-b-lg bg-secondary/50 backdrop-blur-sm"
          >
            <GitBranch className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Total Contributions</p>
            <p className="text-xl sm:text-2xl font-bold text-primary">
              {stats.totalContributions.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="p-4 rounded-b-lg bg-secondary/50 backdrop-blur-sm"
          >
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Best Day</p>
            <p className="text-xl sm:text-2xl font-bold text-primary">
              {maxContributions} contributions
            </p>
          </motion.div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">
            Last 30 days
          </h4>
          <div className="overflow-x-auto pb-4">
            <div className="grid grid-rows-1 grid-flow-col gap-1 w-max">
              <TooltipProvider>
                {stats.contributions.slice(-30).map((day, index) => (
                  <motion.div
                    key={day.date}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          tabIndex={0}
                          aria-label={`${day.count} contributions on ${day.date}`}
                          className={cn(
                            "h-6 w-6 sm:h-8 sm:w-8 rounded-sm",
                            getContributionLevel(day.count),
                            "transition-all duration-200 hover:scale-110",
                          )}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs font-semibold text-black">
                          {day.count} contributions on{" "}
                          {new Date(day.date).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric", timeZone: "UTC",
                          })}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </motion.div>
                ))}
              </TooltipProvider>
            </div>
          </div>
        </div>
      </motion.div>
    </Card>
  );
};

export default GithubStats;

