import React, { Component } from "react";
import { fromEvent, of } from "rxjs";
import { mergeMap, delay, takeUntil } from "rxjs/operators";

export default class Delay extends Component {
  componentWillUnmount() {}
  componentDidMount() {
    window.scrollTo(0, 0);
    const mouseDown = fromEvent(document, "mousedown");
    const mouseUp = fromEvent(document, "mouseup");
    const box = document.getElementById("message");
    mouseDown
      .pipe(mergeMap((event) => of(event).pipe(delay(700), takeUntil(mouseUp))))
      .subscribe((event) => console.log(event));
  }
  render() {
    return (
      <div class="app">
        <h1 id="message">Hello</h1>
      </div>
    );
  }
}
