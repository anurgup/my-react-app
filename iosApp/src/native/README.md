# TextRefine - React Native

A complete React Native port of TextRefine, an app that helps you polish your messages before sending them and generate smart responses based on conversation context.

## Features

### 🎨 Text Refinement
Transform casual messages into different styles:
- **Professional** - For formal work communications
- **Casual** - For relaxed everyday chats
- **Concise** - Short and to the point
- **Friendly** - Warm and approachable

### 🌐 Multilingual Support
Supports 10 languages:
- English 🇬🇧
- Hindi 🇮🇳
- Spanish 🇪🇸
- French 🇫🇷
- German 🇩🇪
- Portuguese 🇵🇹
- Italian 🇮🇹
- Japanese 🇯🇵
- Korean 🇰🇷
- Chinese 🇨🇳

### 💬 Smart Response Generation
Generate contextual responses based on:
- Chat history (up to 10 messages)
- Message type detection (questions, greetings, thanks, etc.)
- Language preference
- Conversation context

### 📱 Mobile-First Design
- Native React Native components
- Smooth animations and transitions
- Gesture support with React Native Gesture Handler
- Dark mode ready

## Quick Start

See [SETUP.md](./SETUP.md) for detailed installation and setup instructions.

### Basic Setup

```bash
npm install
npm run ios        # For iOS
npm run android    # For Android
```

## Project Structure

```
├── App.tsx                          # Main app with navigation
├── components/
│   └── TextRefiner.tsx              # Core component with all features
├── screens/
│   ├── LandingPage.tsx              # Welcome/home screen
│   └── AppPage.tsx                  # App screen
└── SETUP.md                         # Setup guide
```

## Component Overview

### App.tsx
- Sets up React Navigation with NativeStack navigator
- Manages navigation between Landing and App screens
- Handles gesture handling setup

### LandingPage.tsx
- Hero section with app introduction
- Features showcase
- Use cases and benefits
- Call-to-action buttons

### TextRefiner.tsx (Main Component)
- Text input and refinement with multiple styles
- Language selection
- Response generation from chat history
- Chat message management
- Copy/Share functionality

## API Integration

The app is currently using mock implementations. To integrate with your API:

1. **Text Refinement API**
   ```typescript
   POST /api/refine
   Body: {
     text: string
     style: 'professional' | 'casual' | 'concise' | 'friendly'
     language: Language
   }
   Response: { refined: string }
   ```

2. **Response Generation API**
   ```typescript
   POST /api/generate-response
   Body: {
     messages: ChatMessage[]
     language: Language
   }
   Response: { response: string }
   ```

## Customization Guide

### Change App Theme
Edit colors in the component StyleSheets:
```typescript
// LandingPage.tsx
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0fdf4', // Change primary bg color
  },
  // ...
});
```

### Add New Language
1. Add to `languages` object:
```typescript
const languages = {
  // ...
  korean: { name: '한국어 (Korean)', flag: '🇰🇷' },
};
```

2. Add templates in `languageTemplates` and `responseTemplates`

### Integrate With Backend
Replace mock functions in TextRefiner.tsx:
```typescript
const handleRefine = async () => {
  setIsRefining(true);
  try {
    const result = await fetch('/api/refine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: inputText,
        style: selectedStyle,
        language: selectedLanguage,
      }),
    });
    const data = await result.json();
    setRefinedText(data.refined);
  } catch (error) {
    Alert.alert('Error', 'Failed to refine text');
  } finally {
    setIsRefining(false);
  }
};
```

## Dependencies

### Core
- **react-native** - React Native framework
- **react** - React library

### Navigation
- **@react-navigation/native** - Navigation library
- **@react-navigation/native-stack** - Stack navigation
- **react-native-screens** - Native screen support
- **react-native-gesture-handler** - Gesture handling

### UI
- **@react-native-picker/picker** - Dropdown component
- **react-native-linear-gradient** - Gradient backgrounds

## Build for Production

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

### Issue: Metro bundler crashes
**Solution:**
```bash
npm start -- --reset-cache
```

### Issue: Module not found errors
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Pod installation fails (iOS)
**Solution:**
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

## Performance Tips

- Keep chat history limited to 10 messages to avoid memory issues
- Use React.memo for component optimization if needed
- Consider implementing pagination for larger chat histories
- Implement lazy loading for language packs if adding more languages

## Security Notes

- Don't hardcode API keys in the code
- Use environment variables for sensitive data
- Validate user input before sending to API
- Consider encryption for stored chat history

## Contributing

When adding new features:
1. Follow the existing code style
2. Update both web and native versions if needed
3. Add proper error handling
4. Test on both iOS and Android
5. Update documentation

## License

Same as parent project

## Support

For detailed setup instructions, see [SETUP.md](./SETUP.md)

For React Native documentation, visit: https://reactnative.dev/
