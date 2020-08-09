#!/bin/bash

# Reference: https://github.com/Xuanwo/xuanwo.github.io/blob/blog/.github/actions/hugo/entrypoint.sh

set -e

mkdir /root/.ssh
ssh-keyscan -t rsa github.com > /root/.ssh/known_hosts && \
echo "${GIT_DEPLOY_KEY}" > /root/.ssh/id_rsa && \
chmod 400 /root/.ssh/id_rsa

export REMOTE_REPO="git@github.com:${GIT_REPO}.git"
export REMOTE_BRANCH="${GIT_BRANCH}"

git config --global user.name "${GITHUB_ACTOR}"
git config --global user.email "${GITHUB_ACTOR}@users.noreply.github.com"

hugo --gc --minify --cleanDestinationDir

pushd public \
&& git init \
&& git remote add origin $REMOTE_REPO \
&& git add -A \
&& git checkout -b $REMOTE_BRANCH \
&& git commit -m "Automated deployment @ $(date '+%Y-%m-%d %H:%M:%S')" \
&& git push -f origin $REMOTE_BRANCH \
&& popd

rm -rf /root/.ssh
