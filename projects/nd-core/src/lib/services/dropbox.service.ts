import {Inject, Injectable} from '@angular/core';
import {GlobalService} from './global.service';
import {Observable} from 'rxjs';
import {Sweetalert2Service} from './sweetalert2.service';
import {ModalService} from './modal.service';
import {IGatewayResponse} from '../interfaces/gateway-response';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ModalPreviewComponent} from '../modal/modal-preview.component';
import {EnvironmentConfig} from '../interfaces/environment-config';

@Injectable({
  providedIn: 'root',
})
export class DropboxService {

  constructor(
    @Inject('CORE_ENVIRONMENT') private _viewConfig: EnvironmentConfig,
    private _http: HttpClient,
    private _gs: GlobalService,
    private _sweetAlert: Sweetalert2Service,
    private _modalService: ModalService,
  ) {
  }

  public imageExtensions: Array<string> = ['.jpg', '.jpeg', '.jpe', '.jif', '.jfif', '.jfi', '.png', '.bmp', '.tif', '.tiff', '.gif', '.webp', '.heif', '.heic', '.dib', '.svg', '.svgz', '.eps'];
  public supportedExtensionPreview: Array<string> = ['.pdf', ...this.imageExtensions];

  public mimeToExt(mime: string): string {
    const allMimes = JSON.parse('{"png":["image\/png","image\/x-png"],"bmp":["image\/bmp","image\/x-bmp","image\/x-bitmap","image\/x-xbitmap","image\/x-win-bitmap","image\/x-windows-bmp","image\/ms-bmp","image\/x-ms-bmp","application\/bmp","application\/x-bmp","application\/x-win-bitmap"],"gif":["image\/gif"],"jpeg":["image\/jpeg","image\/pjpeg"],"xspf":["application\/xspf+xml"],"vlc":["application\/videolan"],"wmv":["video\/x-ms-wmv","video\/x-ms-asf"],"au":["audio\/x-au"],"ac3":["audio\/ac3"],"flac":["audio\/x-flac"],"ogg":["audio\/ogg","video\/ogg","application\/ogg"],"kmz":["application\/vnd.google-earth.kmz"],"kml":["application\/vnd.google-earth.kml+xml"],"rtx":["text\/richtext"],"rtf":["text\/rtf"],"jar":["application\/java-archive","application\/x-java-application","application\/x-jar"],"zip":["application\/x-zip","application\/zip","application\/x-zip-compressed","application\/s-compressed","multipart\/x-zip"],"7zip":["application\/x-compressed"],"xml":["application\/xml","text\/xml"],"svg":["image\/svg+xml"],"3g2":["video\/3gpp2"],"3gp":["video\/3gp","video\/3gpp"],"mp4":["video\/mp4"],"m4a":["audio\/x-m4a"],"f4v":["video\/x-f4v"],"flv":["video\/x-flv"],"webm":["video\/webm"],"aac":["audio\/x-acc"],"m4u":["application\/vnd.mpegurl"],"pdf":["application\/pdf","application\/octet-stream"],"pptx":["application\/vnd.openxmlformats-officedocument.presentationml.presentation"],"ppt":["application\/powerpoint","application\/vnd.ms-powerpoint","application\/vnd.ms-office","application\/msword"],"docx":["application\/vnd.openxmlformats-officedocument.wordprocessingml.document"],"xlsx":["application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application\/vnd.ms-excel"],"xl":["application\/excel"],"xls":["application\/msexcel","application\/x-msexcel","application\/x-ms-excel","application\/x-excel","application\/x-dos_ms_excel","application\/xls","application\/x-xls"],"xsl":["text\/xsl"],"mpeg":["video\/mpeg"],"mov":["video\/quicktime"],"avi":["video\/x-msvideo","video\/msvideo","video\/avi","application\/x-troff-msvideo"],"movie":["video\/x-sgi-movie"],"log":["text\/x-log"],"txt":["text\/plain"],"css":["text\/css"],"html":["text\/html"],"wav":["audio\/x-wav","audio\/wave","audio\/wav"],"xhtml":["application\/xhtml+xml"],"tar":["application\/x-tar"],"tgz":["application\/x-gzip-compressed"],"psd":["application\/x-photoshop","image\/vnd.adobe.photoshop"],"exe":["application\/x-msdownload"],"js":["application\/x-javascript"],"mp3":["audio\/mpeg","audio\/mpg","audio\/mpeg3","audio\/mp3"],"rar":["application\/x-rar","application\/rar","application\/x-rar-compressed"],"gzip":["application\/x-gzip"],"hqx":["application\/mac-binhex40","application\/mac-binhex","application\/x-binhex40","application\/x-mac-binhex40"],"cpt":["application\/mac-compactpro"],"bin":["application\/macbinary","application\/mac-binary","application\/x-binary","application\/x-macbinary"],"oda":["application\/oda"],"ai":["application\/postscript"],"smil":["application\/smil"],"mif":["application\/vnd.mif"],"wbxml":["application\/wbxml"],"wmlc":["application\/wmlc"],"dcr":["application\/x-director"],"dvi":["application\/x-dvi"],"gtar":["application\/x-gtar"],"php":["application\/x-httpd-php","application\/php","application\/x-php","text\/php","text\/x-php","application\/x-httpd-php-source"],"swf":["application\/x-shockwave-flash"],"sit":["application\/x-stuffit"],"z":["application\/x-compress"],"mid":["audio\/midi"],"aif":["audio\/x-aiff","audio\/aiff"],"ram":["audio\/x-pn-realaudio"],"rpm":["audio\/x-pn-realaudio-plugin"],"ra":["audio\/x-realaudio"],"rv":["video\/vnd.rn-realvideo"],"jp2":["image\/jp2","video\/mj2","image\/jpx","image\/jpm"],"tiff":["image\/tiff"],"eml":["message\/rfc822"],"pem":["application\/x-x509-user-cert","application\/x-pem-file"],"p10":["application\/x-pkcs10","application\/pkcs10"],"p12":["application\/x-pkcs12"],"p7a":["application\/x-pkcs7-signature"],"p7c":["application\/pkcs7-mime","application\/x-pkcs7-mime"],"p7r":["application\/x-pkcs7-certreqresp"],"p7s":["application\/pkcs7-signature"],"crt":["application\/x-x509-ca-cert","application\/pkix-cert"],"crl":["application\/pkix-crl","application\/pkcs-crl"],"pgp":["application\/pgp"],"gpg":["application\/gpg-keys"],"rsa":["application\/x-pkcs7"],"ics":["text\/calendar"],"zsh":["text\/x-scriptzsh"],"cdr":["application\/cdr","application\/coreldraw","application\/x-cdr","application\/x-coreldraw","image\/cdr","image\/x-cdr","zz-application\/zz-winassoc-cdr"],"wma":["audio\/x-ms-wma"],"vcf":["text\/x-vcard"],"srt":["text\/srt"],"vtt":["text\/vtt"],"ico":["image\/x-icon","image\/x-ico","image\/vnd.microsoft.icon"],"csv":["text\/x-comma-separated-values","text\/comma-separated-values","application\/vnd.msexcel"],"json":["application\/json","text\/json"]}');
    for (const ext in allMimes) {
      if (allMimes[ext].indexOf(mime) > -1) {
        return '.' + ext;
      }
    }
    return '';
  }

  public get(object): Observable<any> {
    if (object?.path) {
      return this._http.get<IGatewayResponse>(
        `${this._viewConfig.environment.apiGateway}/storage/get/${object.path}`,
        {
          headers: new HttpHeaders()
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('authorization', `UpThere ${localStorage.getItem('token')}`)
            .set('showLoader', 'false'),
        });
    }
  }

  public share(path): Observable<any> {
    return this._http.get<IGatewayResponse>(
      `${this._viewConfig.environment.apiGateway}/storage/share/${path}`,
      {
        headers: new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded').set('authorization', `UpThere ${localStorage.getItem('token')}`),
      });
  }

  public list(id: string, path: string): Observable<any> {
    return this._gs.callGateway('lyjjh7KJB9lUnI2tlvW1VVxwO9ZkjBnoZYIdAFbQnNotWy0tSVYtWy3W45P8ggwc7UHj7/gQVvhJt0T/z6gmEivixTGZqdDIcA@@', `${id},'${path}'`, false);
  }

  /*public download(id: string): Observable<any> {
   // window.open(`${environment.apiDropbox}?gest=3&id=${id}`, '_blank');
   return this._gs.callDownload(id);
   }*/

  /*public thumbnail(object): Observable<any> {
   return this._gs.callDropbox(object, false);
   }*/

  public delete(object: { path: string, ext_id: number | string, ext_table: string }): Observable<any> {
    return this._http.delete<IGatewayResponse>(
      `${this._viewConfig.environment.apiGateway}/storage/delete/${object.path}/${object.ext_id}/${object.ext_table}`,
      {
        headers: new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded').set('authorization', `UpThere ${localStorage.getItem('token')}`)
      });
  }

  public openPreview(storageID: string, fileName: string, fullSize = true): void {
    const fileExtension = '.' + fileName.split('.').reverse()[0];
    if (this.supportedExtensionPreview.includes(fileExtension.toLowerCase())) {
      this.get({mode: 4, path: storageID}).subscribe(image => {
        const modalFolder = this._modalService.present(ModalPreviewComponent, {
            name: fileName,
            link: image.link,
            type: this.imageExtensions.includes(fileExtension) ? 'image' : 'pdf',
          }, (fullSize) ? 'sc-ion-archivio-full-screen-mobile' : 'sc-ion-archivio-middle-width',
        ); // (fileExtension === 'pdf') ? 'sc-ion-modal-full-width' : 'sc-ion-modal-middle-width'
      }, error => this._sweetAlert.error(error.message));
    }
  }

  public openPreviewFromLink(link: string, fileName = '', fullSize = true): void {
    let fileExtension = '';
    if (fileName === '') {
      fileExtension = link.split('?')[0].split('.').reverse()[0]; // esempio link dropbox => https://www.dropbox.com/s/rl1isbolbf8rsqr/kraken.png?dl=0&raw=1
      fileName = `${link.split(fileExtension)[0].split('/').reverse()[0]}${fileExtension}`;
    } else {
      fileExtension = fileName.split('.').reverse()[0];
    }
    if (this.supportedExtensionPreview.includes('.' + fileExtension.toLowerCase())) {
      const modalFolder = this._modalService.present(ModalPreviewComponent, {
          name: fileName,
          link: this.imageExtensions.includes('.' + fileExtension) ? link : `${this._viewConfig.environment.apiMedia}?url=${link}`, // FD_MediaCorsGateway
          type: this.imageExtensions.includes('.' + fileExtension) ? 'image' : 'pdf',
        }, (fullSize) ? 'sc-ion-archivio-full-screen-mobile' : 'sc-ion-archivio-middle-width',
      );
    }
  }

}
