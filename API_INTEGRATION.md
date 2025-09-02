# API Integration Documentation

## Overview
This WhatsApp-like frontend application has been integrated with the business application API endpoint at `http://212.2.242.196:9300/api/business_application`.

## API Integration Details

### Endpoint
- **URL**: `http://212.2.242.196:9300/api/business_application`
- **Method**: POST
- **Content-Type**: multipart/form-data

### Form Data Keys
The API accepts the following form data keys:

1. **`message`** - Text messages from the chat
2. **`bank_statement`** - Bank statement files (PDF, JPG, JPEG, PNG, DOC, DOCX)
3. **`itr_document`** - ITR document files (PDF, JPG, JPEG, PNG, DOC, DOCX)

## Implementation

### 1. API Service (`src/services/api.ts`)
- `ApiService.sendMessage(message)` - Send text messages
- `ApiService.uploadBankStatement(file, message?)` - Upload bank statements
- `ApiService.uploadITRDocument(file, message?)` - Upload ITR documents
- `ApiService.sendMessageWithFiles(message, bankStatement?, itrDocument?)` - Send combined data

### 2. Chat Hook (`src/hooks/useChat.ts`)
- Enhanced `sendMessage()` function to call the API
- New `sendMessageWithFiles()` function for file uploads
- API response handling with error management
- Message status tracking (delivered, read, error)

### 3. Chat Input (`src/components/ChatInput.tsx`)
- File upload interface with attachment menu
- Support for bank statement and ITR document uploads
- File preview with removal capability
- Visual indicators for different file types

### 4. Message Display (`src/components/Message.tsx`)
- File attachment display in messages
- Error message styling
- Different icons for bank statements (Receipt) and ITR documents (FileText)

## Workflow

The backend follows a specific workflow for business loan applications:

1. **Business Name** - User provides business name
2. **Mobile Number** - User provides mobile number  
3. **Email Address** - User provides email address
4. **PAN Number** - User provides PAN for KYC
5. **Aadhaar Number** - User provides Aadhaar for KYC
6. **Bank Statement** - User uploads bank statement file
7. **ITR Document** - User uploads ITR document file
8. **Annual Turnover** - User provides annual business turnover
9. **Loan Calculation** - System calculates eligibility and approves loan

### Special Commands
- **Greetings** (`hi`, `hello`, `hey`, `start`, `begin`) - Starts/resets the workflow
- **Reset** (`reset`, `restart`, `start_fresh`, `clear_all`) - Clears all data and starts fresh

## Usage

### Starting the Chat
1. **Welcome Screen**: When the app loads, you'll see a welcome screen
2. **Start Chat Button**: Click "Start Chat" to begin the loan application process
3. **Automatic Greeting**: The app sends "hi" to the backend and shows it in chat history
4. **Guided Process**: Follow the step-by-step instructions from the assistant

### Sending Text Messages
1. Type a message in the input field
2. Press Enter or click the Send button
3. Message is sent to the API with the `message` key
4. Backend processes the message based on current workflow step

### Resetting the Chat
1. **Reset Button**: Click the reset icon (↻) in the chat header
2. **Confirmation**: Confirm that you want to clear all data and start over
3. **Fresh Start**: Returns to the welcome screen for a new application

### Uploading Files
1. Click the "+" button to open attachment menu
2. Select "Bank Statement" or "ITR Document"
3. Choose a file from your device
4. Optionally add a text message
5. Click Send to upload
6. Backend processes the file with OCR and extracts relevant information

### Supported File Types
- PDF (.pdf)
- Images (.jpg, .jpeg, .png)
- Documents (.doc, .docx)

## API Response Handling

The application handles various API response scenarios based on the backend's actual response structure:

### Success Response
```json
{
  "success": true,
  "response": "Hi Ravi! Welcome to Business Loan Application.\n\n📝 **Step 1:** Please provide your business name.",
  "expected_field": "business_name",
  "user_data": {},
  "progress": {
    "business_name": "❌",
    "mobile": "❌",
    "email": "❌",
    "pan": "❌",
    "aadhaar": "❌",
    "bank_statement": "❌",
    "itr_document": "❌",
    "annual_turnover": "❌"
  },
  "completion_percentage": 0,
  "current_state": "welcome",
  "workflow_completed": false
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

### Key Response Fields
- **`response`**: The main message to display to the user
- **`expected_field`**: What field the backend is expecting next
- **`user_data`**: All collected user information
- **`progress`**: Status of each required field (✅/❌)
- **`completion_percentage`**: Progress percentage (0-100)
- **`current_state`**: Current workflow state
- **`workflow_completed`**: Whether the application is complete

## Error Handling

- Network errors are caught and displayed to the user
- API errors are shown with error styling in the chat
- File upload failures are handled gracefully
- Connection issues display appropriate error messages

## Testing

A test file (`test-api.js`) is included to verify API integration:

```bash
node test-api.js
```

This tests:
1. Simple message sending
2. Bank statement upload
3. ITR document upload
4. Combined file and message upload

## Development

To run the application:

```bash
npm install
npm run dev
```

The application will start on `http://localhost:5173` (or similar) and will make API calls to the configured endpoint.

## Security Considerations

- File type validation on the frontend
- File size limits can be implemented
- CORS headers should be configured on the API server
- Consider implementing authentication if required

## Future Enhancements

- File size validation
- Progress indicators for file uploads
- Retry mechanism for failed uploads
- File preview functionality
- Multiple file selection
- Drag and drop file upload
