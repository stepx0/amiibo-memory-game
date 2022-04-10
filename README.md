# amiibo-memory-game

Steps:
1: React app working with static images;
2: React app working with REST api (axios);
3: React app working with GraphQL client (apollo-client);

Notes:
Apollo client failed to install in React 18, but I found this workaroud that fortunately solved the issue:
" Until Apollo updates the peer dependencies in its package.json file, you can ignore all peerDependencies when installing @apollo/client library, like that:
npm i --legacy-peer-deps @apollo/client ".
Because of this, now I have to always run "npm i" followed by "--force" whenever I need to install dependencies.
