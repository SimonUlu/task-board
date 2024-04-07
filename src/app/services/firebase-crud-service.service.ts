import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, query, where, deleteDoc, doc } from '@angular/fire/firestore';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { Observable, from, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs';
import { Board } from '../kanban/board.model';
import { FirebaseService } from './firebase.service';


@Injectable({
  providedIn: 'root'
})
export class FirebaseCrudServiceService {

  constructor(public afs: Firestore, public firebaseService: FirebaseService) { }

  async createBoard(data: Board) {
    try {
      const user = await this.firebaseService.getCurrentUser();

      const boardCollection = collection(this.afs, 'boards');

      const docRef = await addDoc(boardCollection, {
        ...data,
        userId: user.uid, // Hier nehmen wir an, dass Sie die User-ID mit den Daten speichern möchten
        createdAt: new Date() // Optional: Fügt ein Erstellungsdatum hinzu
      });
    } catch (error) {
      console.log("Fehler beim hinzufügen des Dokuments");
    }
  }


  getUserBoards(): Observable<Board[]> {
    return from(this.firebaseService.getCurrentUser()).pipe(
      switchMap(user => {
        if (!user) {
          // Wenn kein Benutzer gefunden wurde, geben Sie ein leeres Array zurück.
          // Dies verhindert, dass der folgende Code ausgeführt wird und Fehler verursacht.
          return of([]);
        }
        
        const boardCollection = collection(this.afs, "boards");
        const q = query(boardCollection, where("uid", "==", user.uid));
        
        // Da getDocs ein Promise zurückgibt, verwenden wir from() um es in ein Observable umzuwandeln.
        return from(getDocs(q)).pipe(
          map(boardSnapshot => 
            boardSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }) as Board)
          )
        );
      }),
      catchError(error => {
        console.log(error);
        return of([]); // Verwenden Sie of([]) um ein leeres Array als Observable zurückzugeben.
      })
    );
  }

  async deleteBoard(boardId: string) {
    const boardCollection = doc(this.afs, "boards", boardId);
    try {
      await deleteDoc(boardCollection)
    } catch (error) {
      console.log(error);
    }
  }





}
