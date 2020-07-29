import React, { Component } from "react";
import { concat, empty } from "rxjs";
import { delay, startWith } from "rxjs/operators";

export default class Waiting extends Component {
  componentWillUnmount() {}
  componentDidMount() {
    window.scrollTo(0, 0);
    const userMessage = document.getElementById("message");
    concat(
      this.delayedMessage("Get Ready!"),
      this.delayedMessage(3),
      this.delayedMessage(2),
      this.delayedMessage(1),
      this.delayedMessage(3),
      this.delayedMessage(2),
      this.delayedMessage(1),
      this.delayedMessage("Go!"),
      this.delayedMessage("", 2000)
    ).subscribe((message) => (userMessage.innerHTML = message));
  }

  delayedMessage(message, delayedTime = 1000) {
    return empty().pipe(startWith(message), delay(delayedTime));
  }
  render() {
    return (
      <div class="app">
        <h1 id="message"></h1>
      </div>
    );
  }
}
