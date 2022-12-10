import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class PdfMakeService {

  constructor() {
  }

  //
  // Public
  //
  public lineSeparator = {
    portrait: '{"canvas": [{"type": "line","x1": 0,"y1": 5,"x2": 555,"y2": 5,"lineWidth": 0.5}]}',
    landscape: '{"canvas": [{"type": "line","x1": 0,"y1": 5,"x2": 800,"y2": 5,"lineWidth": 0.5}]}'
  };


  public downloadPdf(pdfObj: any, name: string) {
    pdfObj.download(name);
  }
}
