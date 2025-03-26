# Electron Development Template 2

Template to develop GUI applications based on Electron.

# Releases

You can find the latest releases [here](https://github.com/CFIS-UFRO/electron-development-template/releases).

## Important note for Mac users

If you are using macOS, you may encounter a security warning when opening the application for the first time. This warning is due to the application being from an unidentified developer. To bypass this warning, you need to open the terminal and run the following command:

```bash
xattr -d com.apple.quarantine /path/to/your/application.app
```

where `/path/to/your/application.app` is the path to the application on your system.

Alternatively, you can  write `xattr -d com.apple.quarantine ` and drag the application into the terminal window, this will automatically fill the path.

# Origin of this Template

At our laboratory (CFIS), we often need to develop graphical applications for hardware control or data analysis. Many of these applications share common elements, so we decided to create a reusable template to streamline development. Until now, we have used Python with QT. However, as explained in the next section, Electron offers several advantages for our needs, which led us to develop this template based on Electron.

# What is Electron?

Electron is a framework that allows you to build cross-platform desktop applications using web technologies: HTML, CSS, and JavaScript. Essentially, it embeds a Chromium browser (the engine behind Google Chrome) and Node.js into a single runtime, enabling you to create desktop apps that work on Windows, macOS, and Linux.

## Why Electron over Python?

While Python offers a relatively gentle learning curve and is excellent for data processing and scripting, and QT enables the creation of robust desktop interfaces, we've encountered some limitations:

* Performance: Python can exhibit some performance constraints, especially when dealing with computationally intensive tasks or real-time data visualization.
* Visualization: While libraries like QT are capable, they often fall short when compared to the performance and rich graphical element ecosystem available in modern web development frameworks.
* Distribution: Distributing Python applications can present some challenges, often involving guiding end-users through Python installation and dependency management, which can be a barrier for non-technical users.

Electron addresses these challenges by leveraging the strengths of web technologies:

* Visual Capabilities: HTML, CSS, and JavaScript have evolved to excel at visual presentation, making them ideal for complex data visualization, real-time graphs, and interactive interfaces – common requirements in scientific environments.
* Ease of Distribution: Electron applications can be packaged into self-contained executables, simplifying distribution and installation for end-users. No need to worry about Python installations or dependency conflicts.
* Cross-Platform Compatibility: Electron's cross-platform nature allows you to build applications that run seamlessly on multiple operating systems from a single codebase.

# Repository Structure

```
/
├── src/                     # Application source code
│   ├── main/                # Main process (Electron backend)
│   ├── preload/             # Preload scripts (communication bridge)
│   └── renderer/            # Renderer process (Svelte frontend)
│       ├── src/             # Frontend application code
│       ├── assets/          # Frontend static assets
│       ├── components/      # Reusable UI components
│       ├── App.svelte       # Main Svelte component
│       ├── main.js          # Frontend entry point
│       └── index.html       # HTML template
├── resources/               # Application resources and assets
├── electron.vite.config.mjs # Electron-Vite configuration
├── svelte.config.mjs        # Svelte configuration
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

# Getting Started

1. Make sure you have Node.js and git installed.
2. Generate a new repository from this template through GitHub: Use this template -> Create a new repository.
3. Clone your repository.
4. Copy your icon file in `.png` format to the `resources` folder and name it `icon.png`.
5. Modify the following fields in `package.json`:

```json
{
  "name": "your-app-name",              // Use kebab-case for the package name
  "appName": "Your Application Name",   // User-friendly name
  "description": "Brief description of your application",
  "author": "Jane Doe <jane@example.com>, John Smith <john@example.com>", // Authors
  "port": 3000,                          // Port for the API server
  "repository": "https://github.com/yourusername/your-repo",  // Your code repository
}
```
6. Modify the following fields in `electron-builder.yml`:

```yaml
addId: com.example.yourappname     # Change to your domain and app name
productName: Your Application Name # User-friendly name
win:
   executableName: yourappname     # Change to your app name in kebab-case (for macOS and Linux it is automatically generated)
```
7. If you will use the `publish` script (see next section), and the repository is private, remove `ubuntu-24.04-arm` from the file `.github/workflows/release.yml`, it is not supported by GitHub Actions for private repositories.
8. Install dependencies: `npm install`
9. Start the application: `npm run start`

# Building and Publishing

## Build Options

You have the following commands to build the app:

```bash
npm run build:mac     # Build the app for macOS
npm run build:win     # Build the app for Windows
npm run build:linux   # Build the app for Linux
```

Although you can build the app for any specific platform, better results are obtained if you compile for your own platform. 

## Publishing a Github Release

The template uses GitHub Actions to automate the build and release process. When you push a new tag starting by `v` to the repository, the workflow will automatically build the application for all platforms and publish the release assets in Github Releases.

The `publish` script automates the process with the following steps:

1. Increments the version number in `package.json` using the format `YYYY.MM.DD.X` 
   (where X is the release number for the current day, starting at 0)
2. Generates a GitHub tag for the new version
3. Pushes the changes to the repository

To run it, use the following command:

```bash
npm run publish
```

This will trigger the GitHub Actions workflow to build and publish the release with executables for all platforms.