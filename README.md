
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
  <h3 align="center">Discord XP System Bot</h3>
  <h4>Please note that i wrote the bot 1 year ago (2020) and its outdated & bad syntax!</h4>

  <p align="center">
    XP System for your own private server
    <br />
    <br />
    <a href="https://github.com/shinxz/xp-system-bot/issues">Report Bug</a>
    ·
    <a href="https://github.com/shinxz/xp-system-bot/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

XP System Bot for private servers / communities, using mysql database with easy installation.
currently the bot using 3 simple commands - reset, setxp, and leaderboard, please feel free to suggest more commands.

### Built With

* Discordjs
* Mysql


<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites
* Create a bot at the discord developer portal (https://discord.com/developers/applications) and save the bot token.
* Create 10 level roles in your server and save their ID's.

### Installation

1. unzip all the files and execute this command to install all the dependencies.
  ```sh
  npm i
  ```
2. Edit the config.json with your prefrences, please note that you must specify the DB details, otherwise the bot wont work.

<!-- USAGE EXAMPLES -->
## Usage

To start the bot with pm2 please use the following command:
```sh
pm2 start index.js --name"xp-system"
```
and if you dont have pm2 installed please use the command:
```sh
node index.js
```

if you want to start the bot with nodemon you can use the command:
```sh
npm run dev
```

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/shinxz/xp-system-bot/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Discord: ShiNxz#0001


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/shinxz/xp-system-bot?style=for-the-badge
[contributors-url]: https://github.com/shinxz/xp-system-bot/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/shinxz/xp-system-bot.svg?style=for-the-badge
[forks-url]: https://github.com/shinxz/xp-system-bot/network/members
[stars-shield]: https://img.shields.io/github/stars/shinxz/xp-system-bot.svg?style=for-the-badge
[stars-url]: https://github.com/shinxz/xp-system-bot/stargazers
[issues-shield]: https://img.shields.io/github/issues/shinxz/xp-system-bot.svg?style=for-the-badge
[issues-url]: https://github.com/shinxz/xp-system-bot/issues
[license-shield]: https://img.shields.io/github/license/shinxz/xp-system-bot?style=for-the-badge
[license-url]: https://github.com/shinxz/xp-system-bot/blob/master/LICENSE.txt
