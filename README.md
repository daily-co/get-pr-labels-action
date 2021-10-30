# Intro

This GitHub Action inspects a commit, finds its associated pull request, and
outputs a JSON array of the labels associated with the pull request.

We use this because we only merge PRs onto our default branch, and we want to
take actions (like deployments) based on labels that are applied to those PRs.

This only searches for closed PRs, and for our usage, there will be only one
PR per commit.

# Inputs

## `sha`

The SHA of the commit to check.  Defaults to `${GITHUB_SHA}`

# Outputs

## `labels`

A JSON array containing the labels attached to the PR that is found.
