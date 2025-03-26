# Electron Development Template 2

Template to develop GUI applications based on Electron.

# Releases

You can find the latest releases [here](https://github.com/CFIS-UFRO/electron-development-template/releases).

## Mac Security Warning

When first opening the app on macOS, you may see a security warning. To resolve this:

1. Open Terminal
2. Run: `xattr -d com.apple.quarantine /path/to/app.app`
   - Or type `xattr -d com.apple.quarantine ` and drag the app into Terminal

This removes the quarantine flag that blocks unidentified developer apps.

# Origin of this Template

This template was created to streamline development of scientific applications for hardware control and data analysis. While we previously used Python with QT, we've transitioned to Electron for its improved performance, visualization capabilities, and easier distribution.

# What is Electron?

Electron is a framework for building cross-platform desktop applications with web technologies (HTML, CSS, JavaScript). It combines Chromium for rendering and Node.js for backend capabilities, enabling native desktop apps that run on Windows, macOS, and Linux. This makes it ideal for creating powerful applications with modern web interfaces and native system access.

## Why Electron over Python?

While Python with QT is popular for desktop apps, it has significant drawbacks:

* Performance bottlenecks with intensive computations and real-time visualization
* Limited modern UI capabilities compared to web technologies 
* Complex distribution requiring Python installation and dependency management
* Cross-platform inconsistencies in UI rendering and behavior

Electron solves these issues by:

* Utilizing powerful web technologies (HTML/CSS/JavaScript) for better visualization
* Providing self-contained executables that don't need runtime installation
* Ensuring consistent behavior across Windows, macOS, and Linux
* Offering superior performance for UI-heavy applications such as data visualization

The combination of Chromium and Node.js in Electron delivers a more robust solution for modern desktop applications compared to Python-based alternatives.

# Repository Structure

Key repository directories:

```
/
├── src/                     # Application source code
│   ├── main/                # Main process (Electron backend)
│   ├── preload/             # Preload scripts (communication bridge)
│   └── renderer/            # Renderer process (Svelte frontend)
├── resources/               # Application resources
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

# Getting Started

1. Make sure you have [Node.js](https://nodejs.org/) (v18+) and [Git](https://git-scm.com/) installed.
2. Generate a new repository from this template through GitHub:
   - Click "Use this template" -> "Create a new repository"
   - Or manually clone/download the template
3. Clone your new repository locally
4. Set up your application icon:
   - Place a PNG image file in the `resources` folder
   - Name it `icon.png` (must be PNG format)
5. Configure application details in `package.json`:

```json
{
   "name": "your-app-name",               // Lowercase with hyphens only
   "appName": "Your Application Name",    // Display name
   "description": "Brief description",    // What your app does
   "author": "Name <email@domain.com>",   // Your contact info (multiple authors can be added separated by comma)
   "version": "YYYY.MM.DD.0",             // Version of the app, auto-updated by the publish script
   "port": 3000,                          // Port for the app API
   "repository": "https://github.com/username/repo",         // Your code repository
   "versions_repository": "https://github.com/username/repo" // For updates checking, can be the same as repository
}
```

6. Update application identifiers in `electron-builder.yml`:

```yaml
appId: com.yourdomain.appname      # Unique app identifier, example: com.github.myusername.myapp
```

7. For private repositories:
   - Open `.github/workflows/release.yml`
   - Remove `ubuntu-24.04-arm` from the build matrix (not supported for private repos)

8. Set up development environment:
   ```bash
   npm install    # Install dependencies
   npm run dev    # Start in development mode with hot reload
   ```

9. For production testing:
   ```bash
   npm run start # Start the app in production mode
   ```

10. Optional: If using a versions repository:
    - Create a `.env` file in the project root
    - Add a GitHub token with read and write access to the versions repository:
      ```bash
      GITHUB_TOKEN=your_github_personal_access_token
      ```

# Building and Publishing

## Build Process

Build the application for different platforms using these commands:

```bash
npm run build:mac     # macOS build
npm run build:win     # Windows build  
npm run build:linux   # Linux build
```

For best results, build for your own platform. 

## GitHub Release Publishing

The template includes automated releases via GitHub Actions.

When you push a tag starting with `v`, GitHub Actions automatically:
1. Builds the app for all platforms
2. Creates a GitHub release
3. Uploads build artifacts

### Using the Publish Script

Run the automated publish process with:

```bash
npm run publish
```

This script:
1. Updates version in `package.json` (format: `YYYY.MM.DD.X`)
2. Creates a Git tag
3. Pushes to GitHub
4. Updates the versions repository
5. Triggers the build workflow

### Publishing Requirements

1. GitHub-hosted repository
2. Configured `repository` field in `package.json`
3. Optional: Set `versions_repository` for version tracking
4. If version tracking is enabled add a GitHub token with read and write access to the versions repository:
   ```
   GITHUB_TOKEN=your_github_personal_access_token
   ```

# Template Features

## Application icon

To set your application icon:

1. Place a PNG file named `icon.png` in the `resources` folder
2. The icon will be used when building the application
3. During development, the default Electron icon will be shown

**Note:** The icon must be in PNG format.

## Update Checking

The template includes an automatic update checking system that works as follows:

1. When the application starts, it connects to the versions repository specified in `package.json` (if not null)
2. It checks if a newer version is available by comparing the current version with the latest release
3. If an update is available, a popup notification appears informing the user
4. The popup provides a link that redirects the user to the GitHub releases page

**Note:** The update system currently provides notification-only functionality. When a new version is detected, users will be notified and directed to manually download and install from the releases page. Automatic background updates are not supported.

To disable update checking, set the `versions_repository` or `repository` field in `package.json` to `null`.