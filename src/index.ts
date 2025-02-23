import { config } from "dotenv";
import { Octokit } from "@octokit/rest";

import githubQuery from "./githubQuery";
import generateBarChart from "./generateBarChart";
import {
  userInfoQuery,
  createContributedRepoQuery,
  createCommittedDateQuery,
} from "./queries";

config({ path: [".env"] });

interface IRepo {
  name: string;
  owner: string;
}

interface IRepoInfo {
  isFork: boolean;
  name: string;
  owner: {
    login: string;
  };
}

interface IRepoResponse {
  data: {
    user: {
      repositoriesContributedTo: {
        nodes: IRepoInfo[];
      };
    };
  };
}

interface ICommitEdge {
  node: {
    committedDate: string;
  };
}

interface ICommitHistoryResponse {
  data: {
    repository: {
      ref: {
        target: {
          history: {
            edges: ICommitEdge[];
          };
        };
      };
    };
  };
}

(async () => {
  const userResponse = await githubQuery(userInfoQuery).catch((error) => {
    console.error(`Unable to get username and id\n${error}`);
    return null;
  });
  if (!userResponse || !userResponse.data || !userResponse.data.viewer) {
    console.error("Invalid user response");
    return;
  }

  const { login: username, id } = userResponse.data.viewer;
  console.log(`Username: ${username}, ID: ${id}`);
  const contributedRepoQuery = createContributedRepoQuery(username);
  const repoResponse: IRepoResponse = await githubQuery(
    contributedRepoQuery,
  ).catch((error) => {
    console.error(`Unable to get the contributed repo\n${error}`);
    return null;
  });
  if (
    !repoResponse ||
    !repoResponse.data ||
    !repoResponse.data.user ||
    !repoResponse.data.user.repositoriesContributedTo
  ) {
    console.error("Invalid repo response");
    return;
  }

  const repos: IRepo[] = repoResponse.data.user.repositoriesContributedTo.nodes
    .filter((repoInfo: IRepoInfo) => !repoInfo?.isFork)
    .map((repoInfo: IRepoInfo) => ({
      name: repoInfo?.name || "",
      owner: repoInfo?.owner?.login || "",
    }));

  let committedTimeResponseMap: ICommitHistoryResponse[] = [];
  try {
    committedTimeResponseMap = await Promise.all(
      repos.map(({ name, owner }) =>
        githubQuery(createCommittedDateQuery(id, name, owner)),
      ),
    );
  } catch (error) {
    console.error(`Unable to get the commit info\n${error}`);
    return;
  }

  let morning = 0; // 6 - 12
  let daytime = 0; // 12 - 18
  let evening = 0; // 18 - 24
  let night = 0; // 0 - 6

  committedTimeResponseMap.forEach((committedTimeResponse) => {
    committedTimeResponse?.data?.repository?.ref?.target?.history?.edges.forEach(
      (edge: ICommitEdge) => {
        const committedDate = edge?.node?.committedDate;
        const timeString = new Date(committedDate).toLocaleTimeString("en-US", {
          hour12: false,
          timeZone: process.env.TIMEZONE,
        });
        const hour = +timeString.split(":")[0];
        if (hour >= 6 && hour < 12) morning++;
        if (hour >= 12 && hour < 18) daytime++;
        if (hour >= 18 && hour < 24) evening++;
        if (hour >= 0 && hour < 6) night++;
      },
    );
  });

  const sum = morning + daytime + evening + night;
  if (!sum) return;

  const oneDay = [
    { label: "🌞 Morning", commits: morning },
    { label: "🌆 Daytime", commits: daytime },
    { label: "🌃 Evening", commits: evening },
    { label: "🌙 Night", commits: night },
  ];
  const lines = oneDay.reduce<string[]>((prev, cur) => {
    const percent = (cur.commits / sum) * 100;
    const line = [
      `${cur.label}`.padEnd(10),
      `${cur.commits.toString().padStart(5)} commits`.padEnd(14),
      generateBarChart(percent, 21),
      String(percent.toFixed(1)).padStart(5) + "%",
    ];

    return [...prev, line.join(" ")];
  }, []);

  const GH_TOKEN = process.env.GH_TOKEN;
  if (!GH_TOKEN) {
    throw new Error("GH_TOKEN environment variable is not set");
  }
  const GIST_ID = process.env.GIST_ID;
  if (!GIST_ID) {
    throw new Error("GIST_ID environment variable is not set");
  }
  const octokit = new Octokit({ auth: `token ${GH_TOKEN}` });
  console.log(`GIST_ID: ${process.env.GIST_ID}`);
  const gist = await octokit.gists
    .get({
      gist_id: GIST_ID,
    })
    .catch((error: unknown) => {
      console.error(`Unable to update gist\n${error}`);
      return null;
    });

  if (!gist || !gist.data || !gist.data.files) {
    console.error("Invalid gist response");
    return;
  }

  const filenames = Object.keys(gist.data.files);
  if (filenames.length === 0) {
    console.error("No files found in the gist");
    return;
  }
  const filename = filenames[0];

  await octokit.gists.update({
    gist_id: GIST_ID,
    files: {
      [filename]: {
        filename:
          morning + daytime > evening + night
            ? "I'm an early 🐤"
            : "I'm a night 🦉",
        content: lines.join("\n"),
      },
    },
  });
  console.log("✨  Done");
})();
