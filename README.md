# amiibo-memory-game

Development steps:
1: React app working with static images;
2: React app working with REST api (axios);
3: React app working with GraphQL client (apollo-client);
4: Test implementations and docker pipeline.


Notes:
- Apollo Client Implementation has been challenging because gave dependency issues with React 18.
  Had to downgrade React to version 17.0.0 to get everything to work.

- Docker image works in Docker Hub, but doesn't work when piped on GitHub.
  Docker Hub link: https://hub.docker.com/repository/docker/stepiasentin/amiibo-memory-game


Future implementations:
1. Due to time limits I haven't checked all the accessibility part, would've been nice to:
- Do a chromatic check for color blindness;
- Label every graphic item to make it compatible with TalkBack technology;

2. Because this was my first ever app with React, I did it as basic as possible, to learn how it works and familiarize with how Components interact between them, but could have added a state management pattern (like Redux) and could've implemented MVC as architectural pattern.

3. Some additional graphic animations and better UX details, such as cool pop-ups instead of alerts and a "Are you sure you want to restart the game?" option.