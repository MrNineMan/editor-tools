// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as autofill from './AutoFillExtension';
import * as linelimit from './LineDaignosticExtension'; 

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	//create a new diagnostic collection 
	const collection = vscode.languages.createDiagnosticCollection('line count diagnostics');
	vscode.commands.registerCommand('extension.fillAddress',autofill.autofillMyAddress);
		
	//Initial run of the upDateDiagnostic method
	linelimit.updateDiagnostic(collection);
	
	//Subscribes a new event handler that activates when an edit or change is performed on a workspace document document  
	context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(editorchangeevent => {		
		if (editorchangeevent) {
			linelimit.updateDiagnostic(collection);
		}
	}));
		
}



// This method is called when your extension is deactivated
export function deactivate() {}
