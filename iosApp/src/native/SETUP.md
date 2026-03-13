# TextRefine React Native Setup Guide

This is a complete React Native conversion of the TextRefine web application.

## Prerequisites

Before you start, ensure you have:
- Node.js 18+ installed
- npm or yarn package manager
- For iOS: Xcode 14+ and CocoaPods
- For Android: Android Studio, JDK 11+, and Android SDK

## Installation

### 1. Navigate to the project directory
```bash
cd iosApp/src/native
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Install Xcode pods (iOS only)
```bash
cd ios
pod install
cd ..
```

## Running the App

### iOS
```bash
npm run ios
# or
npx react-native run-ios
```

### Android
```bash
npm run android
# or
npx react-native run-android
```

### Start Metro Bundler (if running separately)
```bash
npm start
```

## Project Structure

```
src/native/
├── App.tsx                    # Main App component with navigation
├── components/
│   └── TextRefiner.tsx       # Main text refiner component
├── screens/
│   ├── LandingPage.tsx       # Landing/home screen
│   └── AppPage.tsx           # App screen with TextRefiner
├── SETUP.md                  # This file
└── package.json              # Dependencies
```

## Features Implemented

### 1. Text Refinement
- Multiple refinement styles: Professional, Casual, Concise, Friendly
- Support for 10 languages: English, Hindi, Spanish, French, German, Portuguese, Italian, Japanese, Korean, Chinese
- Real-time text preview

### 2. Response Generation
- Chat history management (up to 10 messages)
- Context-aware response suggestions
- Multiple language support for responses
- Message sender differentiation (You / Other Person)

### 3. UI/UX Features
- Bottom tabs for navigation (Refine / Respond)
- Smooth transitions and animations
- Copy to clipboard functionality
- Share functionality
- Alert notifications for user feedback
- Loading indicators during processing

## Customization

### Changing Colors
The app uses fixed colors. To customize, edit the `StyleSheet` values in:
- `screens/LandingPage.tsx` (Hero section colors)
- `components/TextRefiner.tsx` (Card and button colors)

### Adding More Languages
To add a new language:
1. Add language to the `languages` object in `TextRefiner.tsx`
2. Add refinement templates in the `languageTemplates` object
3. Add response templates in the `responseTemplates` object
4. Update the `Language` type

### Integrating with APIs
To connect with backend APIs:
1. Create an `api` folder with service files
2. Replace mock functions (`refineText`, `generateResponse`) with API calls
3. Add loading states and error handling
4. Update the environment variables

Example:
```typescript
const handleRefine = async () => {
  setIsRefining(true);
  try {
    const response = await api.refineText(inputText, selectedStyle, selectedLanguage);
    setRefinedText(response.refined);
  } catch (error) {
    Alert.alert('Error', 'Failed to refine text');
  } finally {
    setIsRefining(false);
  }
};
```

## Required Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.3.1 | React core |
| react-native | ^0.74.0 | React Native framework |
| @react-native-picker/picker | ^2.6.1 | Dropdown/Picker component |
| @react-navigation/native | ^6.1.17 | Navigation library |
| @react-navigation/native-stack | ^6.11.2 | Stack navigator |
| react-native-gesture-handler | ^2.16.1 | Gesture handling |
| react-native-linear-gradient | ^2.8.1 | Linear gradient backgrounds |
| react-native-screens | ^3.31.1 | Native screen optimization |

## Building for Production

### iOS
```bash
cd ios
xcodebuild -configuration Release -scheme TextRefine
```

### Android
```bash
cd android
./gradlew assembleRelease
```

## Troubleshooting

### Metro Bundler issues
```bash
npm start -- --reset-cache
```

### Pod installation issues (iOS)
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

### Android build issues
```bash
cd android
./gradlew clean
./gradlew build
```

## API Integration Ready

Once you integrate with your backend API, update these functions:
- `refineText()` - Call your text refinement API
- `generateResponse()` - Call your response generation API

Replace the mock implementations with actual API calls using `fetch` or `axios`.

## Performance Notes

- The app uses React state management (useState hooks)
- For larger scale, consider using Redux or Zustand
- Messages are limited to 10 to prevent performance issues
- Text inputs are optimized for mobile keyboards

## Support

For issues or questions about React Native, refer to:
- [React Native Documentation](https://reactnative.dev/)
- [React Navigation Documentation](https://reactnavigation.org/)
