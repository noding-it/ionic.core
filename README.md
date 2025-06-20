# @noding.ionic/core

## Getting Started
Before starting your project you must install the dependencies

`npm i`

prepare project

| command                 | action                                                                |
|:------------------------|:----------------------------------------------------------------------|
| `npm run ng`            | start angular cli                                                     |
| `npm run build`         | build production project                                              |
| `npm run lint`          | lint the code                                                         |
| `npm run core:build`    | build the core library                                                |
| `npm run core:dev`      | build core library in dev mode                                        |
| `npm run core:publish`  | publish the package                                                   |
| `npm run prepare`       | setup git hooks with husky                                            |
| `npm run commit`        | create a commit guided procedure                                      |
| `npm run relase`        | create a newer release based on current and update CHANGELOG.md       |
| `npm run release:patch` | create a newer patch release based on current and update CHANGELOG.md |
| `npm run release:minor` | create a newer minor release based on current and update CHANGELOG.md |
| `npm run release:major` | create a newer major release based on current and update CHANGELOG.md |

## commit standards

commits must have this format

```
feat(new-feature): add a new-feature to our project
```
