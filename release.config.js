const { CI_COMMIT_BRANCH, NODE_ENV } = process.env;

const branch = CI_COMMIT_BRANCH;

const config = {
  debug: NODE_ENV !== 'production',
  branches: [
    'main',
    {
      name: 'next',
      prerelease: true,
    },
    {
      name: 'develop',
      prerelease: true,
    },
  ],
  plugins: [],
};

let pf = '';
if (config.branches.some((it) => it === branch || it.name === branch)) {
  pf = config.branches[0] === branch ? '' : `-${branch}`;
}
const changelogFile = `CHANGELOG${pf}.md`;
console.log({ changelogFile });

config.plugins.push('@semantic-release/commit-analyzer');
config.plugins.push([
  '@semantic-release/release-notes-generator',
  {
    preset: 'conventionalcommits',
    presetConfig: {
      types: [
        { type: 'breaking', section: '❗ Breaking ❗', hidden: false },
        { type: 'feat', section: '✨ Feature ✨', hidden: false },
        { type: 'fix', section: '🐛 Bugfix 🐛', hidden: false },
        { type: 'hotfix', section: '🔥 Hotfix 🔥', hidden: false },
        // !  The following are capitalized to grab attention
        { type: 'BREAKING', section: '❗ Breaking ❗', hidden: false },
        { type: 'HOTFIX', section: '🔥 Hotfix 🔥', hidden: false },
      ],
    },
  },
]);

config.plugins.push([
  '@semantic-release/changelog',
  {
    changelogFile,
  },
]);

config.plugins.push([
  '@semantic-release/git',
  {
    assets: [changelogFile],
  },
]);

config.plugins.push([
  '@semantic-release/github',
  {
    addReleases: 'bottom',
  },
]);

module.exports = config;
