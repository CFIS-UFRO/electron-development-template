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