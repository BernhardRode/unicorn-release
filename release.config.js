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
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
  ],
};

if (config.branches.some((it) => it === branch || it.name === branch)) {
  const pf = config.branches[0] !== CI_COMMIT_BRANCH ? `-${branch}` : '';
  console.log({ pf, b: config.branches[0], CI_COMMIT_BRANCH });
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
