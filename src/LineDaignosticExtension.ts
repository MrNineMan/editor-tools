import * as vscode from 'vscode';

export function updateDiagnostic(collection: vscode.DiagnosticCollection) {
    //clears previous errors 
    collection.clear;
    //fetches current active text editor
    let editor = vscode.window.activeTextEditor;
    //ensures that active text editor is not undefined
    if (editor) {
        //fetches the document from the active text editor
        let document = editor.document;
        //fetches the number of lines
        let lineCount = document.lineCount;
        //verifies that the line count is not les than 8
        if (lineCount < 8) {
            //specifies the range to highlight and display error over
            const diagnosticrange = new vscode.Range(new vscode.Position(0, 0), new vscode.Position(lineCount-1, 10));
            //sets the properties of VSCode's diagnostic features
            collection.set(document.uri, [{
                code: '',
                message: 'Document has only ' + lineCount + ' line(s). Document must have at least 8 lines',
                range: diagnosticrange,
                severity: vscode.DiagnosticSeverity.Error,
                source: '',
                relatedInformation: [
                    new vscode.DiagnosticRelatedInformation(new vscode.Location(document.uri, new vscode.Range(new vscode.Position(0, 0), new vscode.Position(7, 10))), 'Line Count')
                ]
            }]);
        } else {
            //if line count is equal or greater than 8, it clears all error messages 
            collection.clear();
            
        }
        
    }   
    
}    