import { Component, ViewChild, OnInit, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import WebViewer from '@pdftron/webviewer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('viewer') viewer: ElementRef;
  wvInstance: any;
  @Output() coreControlsEvent:EventEmitter<any> = new EventEmitter(); 

  private documentLoaded$: Subject<void>;

  constructor() {
    this.documentLoaded$ = new Subject<void>();
  }

  ngAfterViewInit(): void {

    WebViewer({
      path: '../lib',
      initialDoc: '../files/webviewer-demo-annotated.pdf'
    }, this.viewer.nativeElement).then(instance => {
      this.wvInstance = instance;

      const { documentViewer } = instance.Core;
      documentViewer.getAnnotationHistoryManager().on('historyChanged', () => {
       console.log('historyChanged');
      });

    });
  }

  ngOnInit() {
  }

  getDocumentLoadedObservable() {
    return this.documentLoaded$.asObservable();
  }

}
