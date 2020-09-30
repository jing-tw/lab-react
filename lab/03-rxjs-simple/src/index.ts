import {Subject, Observable} from 'rxjs';

var observable = Observable.create(function (observer:any) {
    console.log('Hello');
    observer.next(42);
    observer.next(100); // "return" another value
    observer.next(200); // "return" yet another
  });

observable.subscribe(function (x:any) {
  console.log('subscribe: ' + x);
});