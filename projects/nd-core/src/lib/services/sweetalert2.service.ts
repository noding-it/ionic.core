import {Injectable} from '@angular/core';
import Swal, {SweetAlertIcon, SweetAlertInput, SweetAlertOptions, SweetAlertResult} from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
// https://sweetalert2.github.io/
export class Sweetalert2Service {

  public confirmTemplate = {
    icon: 'question',
    showCancelButton: true,
    cancelButtonText: 'No',
    confirmButtonText: 'Si',
    reverseButtons: true,
    showClass: {
      popup: 'animate__animated animate__bounceInUp',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp',
    },
  } as Partial<SweetAlertOptions>;

  public confirmThreeButtonsTemplate = {
    icon: 'question',
    showDenyButton: true,
    showCancelButton: true,
    reverseButtons: true,
    showClass: {
      popup: 'animate__animated animate__bounceInUp',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp',
    },
  } as Partial<SweetAlertOptions>;

  /**
   *
   * @param text
   * @param title
   */
  error(text: string, title?: string): void {
    Swal.fire({
      title,
      text,
      icon: 'error',
      customClass: 'mvl-swal-default',
      showClass: {
        popup: 'animate__animated animate__bounceInUp',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    }).then(_ => {
    });
  }

  /**
   *
   * @param text
   * @param title
   * @param imageUrl
   * @param timer
   */
  success(text: string, title?: string, imageUrl?: string, timer?: number): void {
    Swal.fire({
      title,
      text,
      icon: 'success',
      customClass: 'mvl-swal-default',
      showClass: {
        popup: 'animate__animated animate__bounceInUp',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      imageUrl,
      timer,
      showConfirmButton: (!timer),
    }).then(_ => {
    });
  }

  /**
   *
   * @p aram text
   * @param title
   */
  warning(text: string, title?: string): void {
    Swal.fire({
      title,
      text,
      icon: 'warning',
      customClass: 'mvl-swal-default',
      showClass: {
        popup: 'animate__animated animate__bounceInUp',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    }).then(_ => {
    });
  }

  /**
   *
   * @param text
   * @param title
   * @param buttonConfirm
   */
  info(text: string, title?: string, buttonConfirm?: string): Promise<SweetAlertResult<Awaited<any>>> {
    return Swal.fire({
      title,
      text,
      icon: 'info',
      customClass: 'mvl-swal-default',
      confirmButtonText: buttonConfirm || 'Ok',
      showClass: {
        popup: 'animate__animated animate__bounceInUp',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
  }

  /**
   *
   * @param text
   * @param title
   * @param buttonConfirm
   * @param buttonCancel
   * @param icon SweetAlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question'
   */
  confirm(text: string, title?: string, buttonConfirm?: string, buttonCancel?: string, icon?: SweetAlertIcon): Promise<SweetAlertResult<Awaited<any>>> {
    return Swal.fire({
      title,
      text,
      icon: icon || 'question',
      customClass: 'mvl-swal-default',
      showCancelButton: true,
      cancelButtonText: buttonCancel || 'No',
      confirmButtonText: buttonConfirm || 'Si',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true,
      showClass: {
        popup: 'animate__animated animate__bounceInUp',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
  }

  /**
   *
   * @param text
   * @param title
   * @param buttonConfirm
   * @param buttonCancel
   * @param buttonDeny
   */
  confirmThreeButtons(text: string, title?: string, buttonConfirm?: string, buttonCancel?: string, buttonDeny?: string): Promise<SweetAlertResult<Awaited<any>>> {
    return Swal.fire({
      title,
      text,
      icon: 'question',
      customClass: 'mvl-swal-default',
      showDenyButton: true,
      showCancelButton: true,
      cancelButtonText: buttonCancel || 'Esci',
      confirmButtonText: buttonConfirm || 'Si',
      denyButtonText: buttonDeny || 'Non',
      confirmButtonColor: '#3085d6',
      reverseButtons: true,
      showClass: {
        popup: 'animate__animated animate__bounceInUp',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
  }

  /**
   *
   * @param title
   * @param input Input field type, can be `'text'`, `'email'`, `'password'`, `'number'`, `'tel'`, `'range'`, `'textarea'`,`'select'`, `'radio'`, `'checkbox'`, `'file'` and `'url'`.
   * @param placeholder
   * @param okText
   * @param koText
   * @param preConfirm
   */
  confirmWithInput(title: string, input: SweetAlertInput, placeholder: string, okText: string, koText: string, preConfirm?: (params: any) => void): Promise<SweetAlertResult<Awaited<any>>> {
    return Swal.fire({
      title,
      input: input || 'text',
      customClass: 'mvl-swal-default',
      inputPlaceholder: placeholder,
      inputAttributes: {
        autocapitalize: 'off',
      },
      cancelButtonText: koText,
      showCancelButton: true,
      confirmButtonText: okText,
      showLoaderOnConfirm: (!!(preConfirm)),
      preConfirm,
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  /**
   *
   * @param options
   */
  advanced(options: SweetAlertOptions): Promise<SweetAlertResult<Awaited<any>>> {
    return Swal.fire(options);
  }

  /* wizard(): typeof Swal {
   return Swal.mixin({
   confirmButtonText: 'Avanti &rarr;',
   cancelButtonText: 'Più tardi',
   showCancelButton: true,
   progressSteps: ['1', '2', '3', '4', '5', '6', '7', '8'],
   progressStepsDistance: '6px',

   preConfirm: () => {
   // this.sendRecord(0, 'email', 'cellulare');
   }
   });
   }

   sendRecord(step: number, risposta: string, risposta2?: string){
   return .('x',
   '\'' + localStorage.getItem('token') + '\','
   + step + '\','
   + risposta + '\','
   + risposta2 + '\''
   );
   } */

}
