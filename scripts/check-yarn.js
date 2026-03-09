const ua = process.env.npm_config_user_agent || process.env.npm_execpath || '';
if (!/yarn/i.test(ua)) {
  console.error('Install aborted: this project requires Yarn. Run `yarn install`.');
  process.exit(1);
}
console.log('Using Yarn — continuing install.');
