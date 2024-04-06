import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, query, where, deleteDoc, doc } from '@angular/fire/firestore';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { Observable } from 'rxjs';
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


  async getUserBoards(): Promise<Board[]> {
    try {
      const user = await this.firebaseService.getCurrentUser(); 
      const boardCollection = collection(this.afs, "boards"); 
      const q = query(boardCollection, where("uid", "==", user.uid));
      console.log(user.uid);
      const boardSnapshot = await getDocs(q); 
      console.log(boardSnapshot);
      const boards = boardSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }) as Board);
      console.log(boards);
      return boards; 
    } catch (error) {
      console.log(error); 
      return []; 
    }
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
