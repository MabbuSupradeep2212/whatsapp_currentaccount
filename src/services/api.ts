const API_BASE_URL = 'http://212.2.242.196:9300/api';

export interface BusinessApplicationRequest {
  message?: string;
  bank_statement?: File;
  itr_document?: File;
}

export interface BusinessApplicationResponse {
  success: boolean;
  response?: string;
  message?: string;
  data?: any;
  error?: string;
  expected_field?: string;
  user_data?: any;
  progress?: any;
  completion_percentage?: number;
  current_state?: string;
  workflow_completed?: boolean;
}

export class ApiService {
  static async sendBusinessApplication(data: BusinessApplicationRequest): Promise<BusinessApplicationResponse> {
    try {
      const formData = new FormData();
      
      // Add message if provided
      if (data.message) {
        formData.append('message', data.message);
      }
      
      // Add bank statement if provided
      if (data.bank_statement) {
        formData.append('bank_statement', data.bank_statement);
      }
      
      // Add ITR document if provided
      if (data.itr_document) {
        formData.append('itr_document', data.itr_document);
      }

      const response = await fetch(`${API_BASE_URL}/business_application`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // The backend returns the response directly, not wrapped in a data field
      return {
        success: result.success || true,
        response: result.response,
        message: result.message,
        data: result,
        expected_field: result.expected_field,
        user_data: result.user_data,
        progress: result.progress,
        completion_percentage: result.completion_percentage,
        current_state: result.current_state,
        workflow_completed: result.workflow_completed,
      };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  static async sendMessage(message: string): Promise<BusinessApplicationResponse> {
    return this.sendBusinessApplication({ message });
  }

  static async uploadBankStatement(file: File, message?: string): Promise<BusinessApplicationResponse> {
    return this.sendBusinessApplication({ 
      bank_statement: file,
      message 
    });
  }

  static async uploadITRDocument(file: File, message?: string): Promise<BusinessApplicationResponse> {
    return this.sendBusinessApplication({ 
      itr_document: file,
      message 
    });
  }

  static async sendMessageWithFiles(
    message: string, 
    bankStatement?: File, 
    itrDocument?: File
  ): Promise<BusinessApplicationResponse> {
    return this.sendBusinessApplication({
      message,
      bank_statement: bankStatement,
      itr_document: itrDocument,
    });
  }
}
