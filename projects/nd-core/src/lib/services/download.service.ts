import * as FileSaver from "file-saver";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  /**
   * Download file sfruttando il Content-Disposition che arriva dalla risposta Server
   * @param data
   */
  public downloadFileWithContentDisposition(data: any): void {
    let fileName = '';
    const contentDisposition = data.headers.get('Content-Disposition');
    if (contentDisposition) {
      const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = fileNameRegex.exec(contentDisposition);
      if (matches != null && matches[1]) {
        fileName = matches[1].replace(/['"]/g, '');
      }
    }
    FileSaver.saveAs(data.body, fileName);
  }

  /**
   * Download file da URL assoluto con aggiustamento per Dropbox
   * @param url
   * @param filename
   */
  public downloadFileFromLink(url: string, filename: string): void {
    const a = document.createElement('a');
    a.href = url.indexOf('dropbox.com') > -1 ? `${url}&dl=1` : url;
    a.setAttribute('download', filename);
    a.click();
  }

  /**
   * Download file creando un BLOB
   * Source: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
   * @param content
   * @param filename
   * @param contentType
   */
  public downloadFileAsBlob(content: any, filename: string, contentType: string): void {
    // Create a blob
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);

    // Create a link to download it
    const pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', filename);
    pom.click();
  }

}
