/* eslint-disable no-undef */
const ua = process.env.npm_config_user_agent || process.env.npm_execpath || '';
if (!/yarn/i.test(ua)) {
  process.stderr.write('Install aborted: this project requires Yarn. Run `yarn install`.\n');
  process.exit(1);
}
process.stdout.write('Using Yarn - continuing install.\n');
