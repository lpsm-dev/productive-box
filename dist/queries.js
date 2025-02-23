"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommittedDateQuery = exports.createContributedRepoQuery = exports.userInfoQuery = void 0;
exports.userInfoQuery = `
  query {
    viewer {
      login
      id
    }
  }
`;
const createContributedRepoQuery = (username) => `
  query {
    user(login: "${username}") {
      repositoriesContributedTo(last: 100, includeUserRepositories: true) {
        nodes {
          isFork
          name
          owner {
            login
          }
        }
      }
    }
  }
`;
exports.createContributedRepoQuery = createContributedRepoQuery;
const createCommittedDateQuery = (id, name, owner) => `
  query {
    repository(owner: "${owner}", name: "${name}") {
      ref(qualifiedName: "master") {
        target {
          ... on Commit {
            history(first: 100, author: { id: "${id}" }) {
              edges {
                node {
                  committedDate
                }
              }
            }
          }
        }
      }
    }
  }
`;
exports.createCommittedDateQuery = createCommittedDateQuery;
