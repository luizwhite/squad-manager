## Table of Contents
**1.** [About](#-about)

**2.** [Features](#-features)

**3.** [Minor Features](#-minor-features---to-add-next)

**4.** [Deploy](#-deploy)

**5.** [**Local Installation**](#-local-installation)

<p align="center">
    <img alt="squadmanager" title="squadmanager" src=".github/squadmanager_mockup_all.png" />
</p>

# Squad Management Tool
## 📖 About
Squad Manager is a fantasy football team management app with a simple dashboard displaying:
- Your created Teams
- Real team top ranking (in this case, with an average team age rank)
- Most/Less picked player (🚧 info displayed under development 🚧)

In the team manager you can create/edit your team customizing:
- Team **name**
- Team **description** 
- Team **website**
- Team **type** (real or fantasy)
- Team **tags** (🚧 under development 🚧)
- Team **formation**
- Team **players** → with **drag-n-drop**!

The API used to populate the app is [Api-Football](https://www.api-football.com/)
(*the league used in this app example is the Brazil A Serie championship*)

## 🔨 Features
→ Team creation/edition

→ Team management

→ Team players management with **drag-n-drop** using [**react-dnd**](https://react-dnd.github.io/react-dnd/about)

→ Real player search using [Api-Football](https://www.api-football.com/)

→ Real player average age rank [Api-Football](https://www.api-football.com/)

→ Mobile Responsiveness - 🚧 under development 🚧

→ Share your team in social media - 🚧 under development 🚧

→ Data persistence with MongoDB - 🚧 under development 🚧

→ OAuth session - 🚧 under development 🚧

→ Theme Toggler - light/dark - 🚧 under development 🚧

## 📐 Minor Features - to add next
→ Drag-n-drop support for mobile devices

→ Mobile Responsiveness

→ Most/Less picked player


## 🚀 Techs & Tools
→ [**ReactJS**](https://reactjs.org/)

→ [**TypeScript**](https://www.typescriptlang.org/)

→ [**Api-Football**](https://www.api-football.com/)

→ [**react-dnd**](https://react-dnd.github.io/react-dnd/about)

-----
## 📃 Repository
GitHub: [`https://github.com/luizwhite/squad-manager`](https://github.com/luizwhite/squad-manager)

## 🎉 Deploy
🚧 under development 🚧

## 💻 Local Installation
```bash
# Open terminal and clone this repository
$ git clone https://github.com/luizwhite/squad-manager.git

# Create a .env.local file and add the requested environment variables
# based on the .env.example file in the project root

# Api-Football need your own key
# Check https://www.api-football.com/documentation-v3#section/Authentication/API-SPORTS-Account

# Install dependencies
$ yarn

# Start the application
$ yarn start
```

