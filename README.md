<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/probaku1234/System-Monitor">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">System Monitor</h3>

  <p align="center">
    System Monitor App
    <br />
    <a href="https://github.com/probaku1234/System-Monitor"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/probaku1234/System-Monitor">View Demo</a>
    ·
    <a href="https://github.com/probaku1234/System-Monitor/issues">Report Bug</a>
    ·
    <a href="https://github.com/probaku1234/System-Monitor/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
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
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

![Product Name Screen Shot][product-screenshot]

Simple System Monitor Desktop app built with Rust, Tauri.
For frontend, used React and Vite.

It uses sysinfo crate to fetch system infos.

***Limitation: Only works on Window***

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

<!-- * [![Next][Next.js]][Next-url] -->
* [![React][React.js]][React-url]
<!-- * [![Vue][Vue.js]][Vue-url]
* [![Angular][Angular.io]][Angular-url]
* [![Svelte][Svelte.dev]][Svelte-url]
* [![Laravel][Laravel.com]][Laravel-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![JQuery][JQuery.com]][JQuery-url] -->
* [![Rust]][Rust-url]
* [![Tauri]][Tauri-url]
* [![Vite]][Vite-url]
* [![Vitest]][Vitest-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started



### Prerequisites

You need npm and rust installed.
* npm
  ```sh
  npm install npm@latest -g
  ```
* rust

  Check how to install rust.
  https://www.rust-lang.org/tools/install

### Installation

1. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### How to Run
   ```sh
   npm run tauri dev
   ```
This app shows the names of hardwares that installed on the PC and real-time info of them.

1. System Spec
   * CPU
   * GPU
   * Motherboard
   * Drive
2. Monitoring
   * CPU load, Temp
   * GPU load, temp
   * Ram Usage
   * Disk Usage
   * Top Process List

![Product Name Screen Shot1][product-screenshot]
![Product Name Screen Shot2][product-screenshot2]
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
<!-- ## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/probaku1234/System-Monitor/issues) for a full list of proposed features (and known issues). -->

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - fhzotxldj@gmail.com

Project Link: [https://github.com/probaku1234/System-Monitor](https://github.com/probaku1234/System-Monitor)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [sysinfo](https://docs.rs/sysinfo/latest/sysinfo/index.html)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/probaku1234/System-Monitor.svg?style=for-the-badge
[contributors-url]: https://github.com/probaku1234/System-Monitor/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/probaku1234/System-Monitor.svg?style=for-the-badge
[forks-url]: https://github.com/probaku1234/System-Monitor/network/members
[stars-shield]: https://img.shields.io/github/stars/probaku1234/System-Monitor.svg?style=for-the-badge
[stars-url]: https://github.com/probaku1234/System-Monitor/stargazers
[issues-shield]: https://img.shields.io/github/issues/probaku1234/System-Monitor.svg?style=for-the-badge
[issues-url]: https://github.com/probaku1234/System-Monitor/issues
[license-shield]: https://img.shields.io/github/license/probaku1234/System-Monitor.svg?style=for-the-badge
[license-url]: https://github.com/probaku1234/System-Monitor/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/Yunseoblee
[product-screenshot]: images/screenshot.png
[product-screenshot2]: images/screenshot2.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[Rust]: https://img.shields.io/badge/Rust-4A4A55?style=for-the-badge&logo=Rust&logoColor=black
[Rust-url]: https://www.rust-lang.org/
[Tauri]: https://img.shields.io/badge/Tauri-24C8DB?style=for-the-badge&logo=Tauri&logoColor=white
[Tauri-url]: https://tauri.app/
[Vite]: https://img.shields.io/badge/Vite-D87F63?style=for-the-badge&logo=Vite&logoColor=yellow
[Vite-url]: https://vitejs.dev/
[Vitest]: https://img.shields.io/badge/Vitest-0769AD?style=for-the-badge&logo=Vitest&logoColor=green
[Vitest-url]: https://vitest.dev/