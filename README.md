# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Serveur local de données utilisateurs

Les comptes utilisateurs (`src/data/users.json`) sont gérés par un petit serveur Express local (`server/index.js`), car une app Expo ne peut pas écrire directement dans son propre code source. `npm start` lance ce serveur en même temps que Metro grâce à `concurrently`.

- Le serveur écoute sur `http://0.0.0.0:4000` et lit/écrit directement `src/data/users.json`.
- Le client (`src/service/apiConfig.ts`) retrouve automatiquement l'adresse IP de la machine de dev via `Constants.expoConfig.hostUri`, donc ça fonctionne aussi depuis un téléphone physique sur le même réseau Wi-Fi, sans configuration manuelle.
- Pour lancer uniquement le serveur : `npm run server`. Pour lancer uniquement Expo : `npm run start:app`.
- Vérifier que le serveur répond : `http://<IP-de-la-machine>:4000/api/health`.

