import { Component, OnInit } from '@angular/core';
import { FeedbackService } from './feedback.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  messageField: null;
  contactField: null;
  feedbackList = [];

  constructor(
    private feedbackService: FeedbackService,
  ) { 
    this.listFeedback();
  }

  ngOnInit() {
  }

  sendForm() {
    this.feedbackService.currentFeedback["message"] = this.messageField;
    this.feedbackService.currentFeedback["contact"] = this.contactField;
    this.feedbackService.saveFeedback();
    this.listFeedback();
  }

  async listFeedback() {
    var list = await this.feedbackService.listFeedback();
    this.feedbackList = Object.keys(list).map(key => list[key]);
  }

  async editFeedback(id) {
    var feedback = await this.feedbackService.getFeedback(id);
    this.messageField = feedback["message"];
    this.contactField = feedback["contact"];
  }

}
