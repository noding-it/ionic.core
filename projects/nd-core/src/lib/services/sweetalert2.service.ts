import {Injectable} from '@angular/core';
import Swal, {SweetAlertIcon} from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
// https://sweetalert2.github.io/
export class Sweetalert2Service {

    error(text: string, title?: string) {
        Swal.fire({
            title,
            text,
            icon: 'error',
            showClass: {
                popup: 'animate__animated animate__bounceInUp'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }

    success(text: string, title?: string, imageUrl?: string, timer?: number) {
        Swal.fire({
            title,
            text,
            icon: 'success',
            showClass: {
                popup: 'animate__animated animate__bounceInUp'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            imageUrl,
            timer,
            showConfirmButton: (!timer)
        });
    }

    warning(text: string, title?: string) {
        Swal.fire({
            title,
            text,
            icon: 'warning',
            showClass: {
                popup: 'animate__animated animate__bounceInUp'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }

    info(text: string, title?: string, buttonConfirm?: string) {
        return Swal.fire({
            title,
            text,
            icon: 'info',
            confirmButtonText: buttonConfirm || 'Ok',
            showClass: {
                popup: 'animate__animated animate__bounceInUp'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
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
    confirm(text: string, title?: string, buttonConfirm?: string, buttonCancel?: string, icon?: SweetAlertIcon) {
        return Swal.fire({
            title,
            text,
            icon: icon || 'question',
            showCancelButton: true,
            cancelButtonText: buttonCancel || 'No',
            confirmButtonText: buttonConfirm || 'Si',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            reverseButtons: true,
            showClass: {
                popup: 'animate__animated animate__bounceInUp'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }

    confirmThreeButtons(text: string, title?: string, buttonConfirm?: string, buttonCancel?: string, buttonDeny?: string) {
        return Swal.fire({
            title,
            text,
            icon: 'question',
            showDenyButton: true,
            showCancelButton: true,
            cancelButtonText: buttonCancel || 'Esci',
            confirmButtonText: buttonConfirm || 'Si',
            denyButtonText: buttonDeny || 'Non',
            confirmButtonColor: '#3085d6',
            reverseButtons: true,
            showClass: {
                popup: 'animate__animated animate__bounceInUp'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }

    confirmWithInput(title: string, input: 'text' | 'number' | 'textarea', placeholder: string, okText: string, koText: string, preConfirm?: (params) => void): Promise<any> {
        return Swal.fire({
            title,
            input,
            inputPlaceholder: placeholder,
            inputAttributes: {
                autocapitalize: 'off'
            },
            cancelButtonText: koText,
            showCancelButton: true,
            confirmButtonText: okText,
            showLoaderOnConfirm: (!!(preConfirm)),
            preConfirm,
            allowOutsideClick: () => !Swal.isLoading()
        });
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
