import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MessageType } from './model';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private messageService: MessageService) {}

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string' ) {
      msg = errorResponse;
    } else if (errorResponse.status >= 400 && errorResponse.status <= 499) {
      msg = errorResponse.error.messages != null
          ? errorResponse.error.messages[0]
          : errorResponse.error.error_description;
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.log('Ocorreu um erro', errorResponse);
    }

    this.showMessage(MessageType.ERROR, msg);
  }

  private showMessage(severity: string, message: string) {
    this.messageService.add({ severity, detail: message });
  }
}
