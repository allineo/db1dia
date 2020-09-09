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
    if (this.currentFeedback["id"] == null) {
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
    } else {
      this.updateFeedback(this.currentFeedback);
    }
  }


  async listFeedback() {
    return new Promise(resolve => {
      this.firestore.collection("feedback", ref => ref.orderBy('datetime', 'desc'))
        .valueChanges({ idField: 'id' })
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  async getFeedback(id) {
    return new Promise(resolve => {
      this.firestore.collection("feedback").doc(id).valueChanges()
        .subscribe(data => {
          this.currentFeedback = data;
          this.currentFeedback["id"] = id;
          resolve(data);
        });
    });
  }

  async updateFeedback(data) {
    data["datetime"] = new Date();
    await this.firestore.collection('feedback').doc(data.id).update(data)
      .then(function (result) {
        // console.log(result);
      }).catch(function (error) {
        console.error(error);
      });
  }

  async deleteFeedback(data) {
    await this.firestore.collection('feedback').doc(data.id).delete()
      .then(function (result) {
        // console.log(result);
      }).catch(function (error) {
        console.error(error);
      });
  }
}
