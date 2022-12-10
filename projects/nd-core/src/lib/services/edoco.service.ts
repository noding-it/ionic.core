import {Injectable} from '@angular/core';
import {GlobalService} from './global.service';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as moment from 'moment';

const API_URL = 'https://api.ivaservizi.it/';

@Injectable({
    providedIn: 'root'
})
export class EdocoService {

    constructor(
        private _http: HttpClient,
        private _globalService: GlobalService,
    ) {
    }

    private _key: string = '';

    setKey(key: string) {
      this._key = key;
    }

    casherDocumentBilling(scontrino: any, payments: any[], purchasedItems: any[]): Observable<any> {
        return this._http.post<any>(
            `${API_URL}shop/woocommerce/document/billing`,
            {
                cashierId: null,   // this._globalService.App.user?.cod_u
                // sourceCode: null,  // scontrino.id
                date: moment().format('YYYY-MM-DDTHH:MM:ss.SSS') + 'Z',
                discount: (scontrino.scontoTotale || 0).toString(),
                isGift: false,
                lotteryCode: scontrino.lotteryCode,
                payments: payments.map(p => {
                    return {
                        amount: p.importo,
                        numberOfTickets: null,
                        type: p.sigla
                    };
                }),
                purchasedItems: purchasedItems.map(p => {
                   return {
                       description: p.descrizione,
                       discount: (p.sconto || 0).toString(),
                       isFree: false,
                       itemCode: p.id_prodotto,
                       priceEach: p.prezzo_vendita,
                       quantity: p.quantita,
                       sourceItemCode: p.id_prodotto.toString(),
                       type: 'Product',
                       vatType: p.aliquota.toString()
                   };
                }),
                referenceDocumentCode: scontrino.id,
                taxDeductibleAmount: '0'
            },
            {
                headers: new HttpHeaders().set('content-type', 'application/json').set('API-Key', this._globalService.getImpostazione(15) as string) // AppSettingsEnum.EDOCO_API_KEY
            }
        );
    }

    // storno
    casherDocumentCancellation(documentID: string): Observable<any> {
        return this._http.post<any>(
            `${API_URL}shop/woocommerce/document/cancellation`,
            {
                cashierId: this._globalService.App.user?.cod_u,
                sourceCode: null,
                date: moment().format('YYYY-MM-DDTHH:MM:SS.sss') + 'Z',
                referenceDocumentCode: documentID
            },
            {
                headers: new HttpHeaders().set('content-type', 'application/json').set('API-Key', this._globalService.getImpostazione(15) as string)
            }
        );
    }

    // reso
    casherDocumentReturn(documentID: string, returnedItems: {index: number, returnedQuantity: number}[]): Observable<any> {
        return this._http.post<any>(
            `${API_URL}shop/woocommerce/document/return`,
            {
                cashierId: this._globalService.App.user?.cod_u,
                sourceCode: null,
                date: moment().format('YYYY-MM-DDTHH:MM:SS.sss') + 'Z',
                referenceDocumentCode: documentID,
                returnedItems /*[{
                                    index: 0,
                                    returnedQuantity: "0.25"
                                }]*/
            },
            {
                headers: new HttpHeaders().set('content-type', 'application/json').set('API-Key', this._globalService.getImpostazione(15) as string)
            }
        );
    }

    // `${API_URL}shop/woocommerce/document/link/${documentID}`,
    casherDocumentLink(documentID: string): Observable<any> {
        return this._http.get<any>(
            `${API_URL}shop/woocommerce/document/link/${documentID}`,
            {
                headers: new HttpHeaders().set('content-type', 'application/json').set('API-Key', this._globalService.getImpostazione(15) as string)
            }
        );
    }

    casherDocumentPDF(documentID: string, format: string = 'A4'): Observable<any> {
        return this._http.get<any>(
            `${API_URL}shop/woocommerce/document/pdf/${documentID}?format=${format}`,
            {
                headers: new HttpHeaders().set('content-type', 'application/json').set('API-Key', this._globalService.getImpostazione(15) as string)
            }
        );
    }

    casherDocumentEmail(documentID: string, to: string): Observable<any> {
        return this._http.post<any>(
            `${API_URL}shop/woocommerce/document/email/${documentID}`,
            {to},
            {
                headers: new HttpHeaders().set('content-type', 'application/json').set('API-Key', this._globalService.getImpostazione(15) as string)
            }
        );
    }

    casherDocumentWhatsapp(phone: string, link: string): void {
        const message = `Ecco il tuo documento commerciale ${encodeURIComponent(link)}`;
        window.open(`https://api.whatsapp.com/send/?phone=${phone}&text=${message}&app_absent=0`, '_blank');
    }

    casherDocumentTelegram(text: string, url: string): void {
        window.open(`https://t.me/share?text=${text}&url=${encodeURIComponent(url)}`, '_blank');
    }

}
