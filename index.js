const core = require('@actions/core');
const github = require('@actions/github');

async function main() {
    const token = core.getInput('github_token', { required: false}) || process.env.GITHUB_TOKEN;
    const sha = core.getInput('sha', { required: false }) || process.env.GITHUB_SHA;

    const octokit = github.getOctokit(token);
    const context = github.context;
    const result = await octokit.rest.repos.listPullRequestsAssociatedWithCommit({
        owner: context.repo.owner,
        repo: context.repo.repo,
        commit_sha: sha,
    });

    core.info(`Found ${result.data.length} PRs ${JSON.stringify(result.data)}`);

    const prs = result.data;
    const pr = prs[0];

    let labelNames = [];

    if (pr && pr.labels) {
      pr.labels.forEach(e => {
        labelNames.push(e.name);
      });
    }

    core.info(`Found labels ${JSON.stringify(labelNames)}`);
    core.setOutput('labels', JSON.stringify(labelNames));

}

main().catch((err) => core.setFailed(err.message));
