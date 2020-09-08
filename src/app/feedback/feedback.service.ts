import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  public currentFeedback = {};

  async saveFeedback() {
    var id = await this.firestore.collection('feedback').add({
      contact: this.currentFeedback["contact"],
      message: this.currentFeedback["message"],
      datetime: new Date()
    })
      .then(function (result) {
        console.log(result.id);
        return result.id;
      })
      .catch(function (error) {
        console.error(error);
      });
    this.currentFeedback["id"] = id;
  }


  async listFeedback() {
    return new Promise(resolve => {
      this.firestore.collection("feedback", ref => ref.orderBy('datetime', 'desc')) //, ref => ref.where('cpf', '==', cpf))
        .valueChanges({ idField: 'id' })
        .subscribe(data => {
          // console.log(data);
          resolve(data);
        });
    });
  }

}
