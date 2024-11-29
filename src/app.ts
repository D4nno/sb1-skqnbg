import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { MainStack } from './components/MainStack';
import { initializeFirebase } from './services/firebase';

// Initialize Firebase
initializeFirebase();

// Controls react-nativescript log verbosity.
Object.defineProperty(global, '__DEV__', { value: false });

ReactNativeScript.start(React.createElement(MainStack, {}, null));