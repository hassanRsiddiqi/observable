import React, { Component } from "react";
import { of, from, timer } from "rxjs";
import { switchMap } from "rxjs/operators";

export default class News extends Component {
  componentWillUnmount() {}
  componentDidMount() {
    this.watchForData();
  }

  watchForData() {
    // Start  new Poll
    const stopPolling$ = document.getElementById("stop");
    return this.startPolling().subscribe((data) => this.updateDom(data));
    // return this.startPolling().pipe(
    //   tap(this.updateDom),
    //   takeUntil(
    //     // stop polling on either button click or change of categories
    //     merge(stopPolling$)
    //   ),
    //   // for demo purposes only
    //   finalize(() => (pollingStatus.innerHTML = "Stopped"))
    // );
  }
  startPolling = () => {
    const url = "https://baconipsum.com/api/?type=meat-and-filler";
    // const url = "https://newsapi.org/v2/everything?q=bitcoin&apiKey=a4aaa536994d4b5db5cd604d5b5c549a";
    return timer(0, 5000).pipe(
      switchMap((_) => this.requestData(url, this.mapMeats))
    );
  };
  requestData(url, mapFunc) {
    const xhr = new XMLHttpRequest();
    return from(
      new Promise((resolve, reject) => {
        // This is generating a random size for a placekitten image
        //   so that we get new cats each request.
        xhr.addEventListener("load", () => {
          resolve(xhr.response);
        });
        xhr.open("GET", url);
        xhr.send();
      })
    ).pipe(
      switchMap((data) => mapFunc(xhr.response))
      // tap((data) => console.log("Request result: ", data))
    );
  }
  mapMeats(response) {
    const parsedData = JSON.parse(response);
    return of(parsedData ? parsedData[0] : "");
  }
  updateDom(result) {
    const newsArea = document.getElementById("newsArea");
    newsArea.innerHTML = result;
  }
  render() {
    return (
      <div className="app">
        <div class="row">
          <h1 class="ribbon ">
            <strong class="ribbon-content">Everybody loves ribbons</strong>
          </h1>
        </div>

        {/* <button id="stop">Stop</button> */}
        <div class="row">
          <p id="newsArea">New Here..</p>
        </div>
      </div>
    );
  }
}
