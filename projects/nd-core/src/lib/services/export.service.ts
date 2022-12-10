import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  /**
   * Conversione di un Array di primitive in CSV
   * @param data
   */
  public exportArrayToCSV(data: any[], columnDelimiter: string = ',', lineDelimiter: string = '\n'): string {
    return data.map(row => row
        .map(String)
        .map((v: any) => v.replaceAll('"', '""'))  // escape
        .map((v: any) => `"${v}"`)
        .join(columnDelimiter)
    ).join(lineDelimiter);
  }

  /**
   * Conversione di un Array di oggetti in CSV
   * @param args
   */
  public exportArrayOfObjectsToCSV(data: any[], columnDelimiter: string = ',', lineDelimiter: string = '\n'): string | null {
    if (data == null || !data.length) {
      return null;
    }

    const keys: string[] = Object.keys(data[0]);

    let result: string = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach((item) => {
      keys.forEach((key: string, index: number) => {
        if (index > 0) result += columnDelimiter;
        result += item[key];
      });
      result += lineDelimiter;
    });

    return result;
  }

}
