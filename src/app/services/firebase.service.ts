import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, User } from "firebase/auth";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    public afs: Firestore,
  ) {}

    // common method to explain how to retrieve collections
  async getCollection() {
    const testCollectionRef = collection(this.afs, 'test');
    const snapshot = await getDocs(testCollectionRef);
    const testList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(testList); // Hier sind alle Dokumente der Sammlung
  }

  async createUserNormal(email: string, password: string) {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage + errorCode);
      });
  }

  async createUserWithGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
          console.log(token);
        } 
        const user = result.user;
        return user;
      }).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });

  }


  async logOutUser(): Promise<void> {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      console.log(error);
    });
  }

  async logInUser(email: string, password: string): Promise<void> {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Signed in 
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  }

  getAuthState(): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      const auth = getAuth();
      // Registrieren eines Observers für Authentifizierungsstatusänderungen
      const unsubscribe = onAuthStateChanged(auth, user => {
        // Benachrichtigen der Subscriber über den aktuellen Authentifizierungsstatus
        // !!user wird true sein, wenn ein User eingeloggt ist, ansonsten false
        subscriber.next(!!user);
      }, error => {
        // Im Fehlerfall wird der Fehler an die Subscriber weitergegeben
        subscriber.error(error);
      });

      return () => unsubscribe();
    })
  }

  async getCurrentUser(): Promise<User> {
    const auth = getAuth();

    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          reject('Kein Benutzer angemeldet.');
        }
      });
    });
  }


}