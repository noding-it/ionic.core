import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {File} from '@ionic-native/file/ngx';

@Injectable({providedIn: 'root'})
export class PdfMakeService {

    constructor(
        private _plt: Platform,
        private _fileOpener: FileOpener,
        private _file: File,
    ) {
    }

    //
    // Public
    //
    public lineSeparator = {
        portrait: '{"canvas": [{"type": "line","x1": 0,"y1": 5,"x2": 555,"y2": 5,"lineWidth": 0.5}]}',
        landscape: '{"canvas": [{"type": "line","x1": 0,"y1": 5,"x2": 800,"y2": 5,"lineWidth": 0.5}]}'
    };


    public downloadPdf(pdfObj, name) {
        if (this._plt.is('cordova')) {
            pdfObj.getBuffer((buffer) => {
                const blob = new Blob([buffer], {type: 'application/pdf'});

                // Save the PDF to the data Directory of our App
                this._file.writeFile(this._file.dataDirectory, name + '.pdf', blob, {replace: true}).then(fileEntry => {
                    // Open the PDf with the correct OS tools
                    this._fileOpener.open(this._file.dataDirectory + name + '.pdf', 'application/pdf');
                });
            });
        } else {
            // On a browser simply use download!
            pdfObj.download(name);
        }
    }
}
