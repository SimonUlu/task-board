import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';

const firebaseConfig = {
  apiKey: "AIzaSyBzdcYOmp9o5cyo3hsusKcuzUKbVa71Eag",
  authDomain: "angular-kanban-7f690.firebaseapp.com",
  projectId: "angular-kanban-7f690",
  storageBucket: "angular-kanban-7f690.appspot.com",
  messagingSenderId: "872224471299",
  appId: "1:872224471299:web:ac70f515d63b262e695136",
  measurementId: "G-VLKJLWCDDB"
};

// export const appConfig: ApplicationConfig = {
//   providers: [
//       provideRouter(routes), 
//       provideAnimationsAsync(), 
//       importProvidersFrom(
//         provideFirebaseApp(() => initializeApp(firebaseConfig)),
//         provideFirestore(() => getFirestore()),
//         provideAuth(() => getAuth()),
//         provideDatabase(() => getDatabase()),
//       )
//   ]
// };


export const appConfig: ApplicationConfig = {
  providers: [
      provideRouter(routes), 
      provideAnimationsAsync(), 
      importProvidersFrom(
        provideFirebaseApp(() => initializeApp(
          {"projectId":"angular-kanban-7f690","appId":"1:872224471299:web:ac70f515d63b262e695136","storageBucket":"angular-kanban-7f690.appspot.com","apiKey":"AIzaSyBzdcYOmp9o5cyo3hsusKcuzUKbVa71Eag","authDomain":"angular-kanban-7f690.firebaseapp.com","messagingSenderId":"872224471299","measurementId":"G-VLKJLWCDDB"}))), 
          importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideDatabase(() => getDatabase())), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"angular-kanban-7f690","appId":"1:872224471299:web:ac70f515d63b262e695136","storageBucket":"angular-kanban-7f690.appspot.com","apiKey":"AIzaSyBzdcYOmp9o5cyo3hsusKcuzUKbVa71Eag","authDomain":"angular-kanban-7f690.firebaseapp.com","messagingSenderId":"872224471299","measurementId":"G-VLKJLWCDDB"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideDatabase(() => getDatabase())), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"angular-kanban-7f690","appId":"1:872224471299:web:ac70f515d63b262e695136","storageBucket":"angular-kanban-7f690.appspot.com","apiKey":"AIzaSyBzdcYOmp9o5cyo3hsusKcuzUKbVa71Eag","authDomain":"angular-kanban-7f690.firebaseapp.com","messagingSenderId":"872224471299","measurementId":"G-VLKJLWCDDB"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideDatabase(() => getDatabase())), importProvidersFrom(provideFunctions(() => getFunctions())), importProvidersFrom(provideMessaging(() => getMessaging())), importProvidersFrom(providePerformance(() => getPerformance())), importProvidersFrom(provideStorage(() => getStorage())), importProvidersFrom(provideRemoteConfig(() => getRemoteConfig()))]
};
