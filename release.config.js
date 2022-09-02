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

if (config.branches.some((it) => it === branch || it.name === branch)) {
  const pf = config.branches[0] === branch ? '' : `-${branch}`;

  config.plugins.push('@semantic-release/changelog', [
    '@semantic-release/git',
    {
      assets: [`CHANGELOG${pf}.md`],
      message:
        'chore(release): ${nextRelease.version} \n\n${nextRelease.notes}',
    },
  ]);
}

config.plugins.push([
  '@semantic-release/git',
  {
    message:
      'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
  },
]);
config.plugins.push([
  '@semantic-release/github',
  {
    addReleases: 'bottom',
  },
]);

module.exports = config;
