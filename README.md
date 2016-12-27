# Streams | Mobile Application

Streams is a mobile application that allows groups of friends to capture "streams" of memory over a duration of time. Users can send photos, videos or chat messages amongst group members and view their posts by location (via Google Maps API) and time. Posts are synced across all devices instantaneously and automatically, remaining available when offline as well.

## Technology Used
- [Angular](https://angularjs.org/)
- [Ionic](https://ionicframework.com/)
- [Cordova](https://cordova.apache.org/)
- [Xcode](https://developer.apple.com/xcode/)
- [Google Firebase](https://firebase.google.com/)

## Features
- User and Account Management (login / signup)
- Customizable User Settings + Profile Photo
- Camera and Video Uploads
- Chat Message Logs and Timestamps
- Group Creation and Customization
- Hybrid Application (iOS + Android)
- Google Maps API Integration for Post Location Viewing
- Real-time Data Syncing & Offline Viewing

## Usage Instructions

```bash
$ npm install -g ionic
```

For starting Browser View
```bash
$ ionic serve
```

For starting Browser View with iOS and Android
```bash
$ ionic serve --lab
```

For starting iOS View
```bash
$ ionic emulate ios
```

For starting Android View
```bash
$ ionic emulate android
```

Deployment on iPhone:

```bash
$ ionic build ios
$ cordova prepare
```

1. Login / Sign Up with Apple Developer and link xcode with developer profile.
2. Navigate to folder platforms/ios.
3. Open xcode file in xcode.
4. Connect your device.
5. Click on Cordova Project and rename bundle Identifier (for testing)

For debugging:

1. Run iOS Emulator (must be connected).
2. Open Safari Preferences / Check box (Show Developer Menu).
3. Open Developer at top.
