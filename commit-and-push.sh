#!/bin/bash
cd "$(dirname "$0")"
git add -A
git commit -m "Refactor site to emphasize regex-first approach: remove AI claims, add regex benefits, optional AI layer, AWS comparison, privacy emphasis, product differentiation, comprehensive FAQ updates, remove GitHubBadge references"
git push origin master

