import "server-only";
import { profile, siteLinks } from "@/constants";
import type { GithubStats } from "@/lib/github-types";

type Calendar = {
  totalContributions: number;
  weeks: { contributionDays: { contributionCount: number; date: string }[] }[];
};

type GraphQLResponse = {
  data?: {
    user?: { contributionsCollection: { contributionCalendar: Calendar } };
  };
  errors?: unknown[];
};

const query = `
  query ($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN?.trim();
  if (!token) {
    return Response.json(
      { error: "Live GitHub activity will appear once it is connected." },
      {
        status: 503,
      },
    );
  }

  try {
    const response = await fetch(siteLinks.githubGraphql, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username: profile.githubUsername } }),
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) throw new Error("GitHub request failed");

    const payload: GraphQLResponse = await response.json();
    const calendar =
      payload.data?.user?.contributionsCollection.contributionCalendar;
    if (payload.errors?.length || !calendar)
      throw new Error("GitHub calendar unavailable");

    const stats: GithubStats = {
      totalContributions: calendar.totalContributions,
      contributions: calendar.weeks.flatMap(({ contributionDays }) =>
        contributionDays.map(({ date, contributionCount }) => ({
          date,
          count: contributionCount,
        })),
      ),
    };

    return Response.json(stats, {
      headers: {
        "Cache-Control":
          "public, max-age=300, s-maxage=1800, stale-while-revalidate=300",
      },
    });
  } catch {
    return Response.json(
      { error: "GitHub activity is temporarily unavailable." },
      { status: 502 },
    );
  }
}
