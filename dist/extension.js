/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.autofillMyAddress = void 0;
const vscode = __webpack_require__(1);
function autofillMyAddress() {
    //Retrieve the current active text editor
    const editor = vscode.window.activeTextEditor;
    //Check if editor is undefined
    if (editor) {
        //Insert text at the current position using an edit builder
        editor.edit(editBuilder => {
            editBuilder.insert(editor.selection.active, 'Street 6260-112 Glenwood Ave'
                + '\nCity/Town	Raleigh'
                + '\nState/Province/Region	Nebraska'
                + '\nZip/Postal Code	27612'
                + '\nPhone Number	(919) 785-2864'
                + '\nCountry	United States'
                + '\nLatitude	35.859171'
                + '\nLongitude	-78.703853');
        });
    }
}
exports.autofillMyAddress = autofillMyAddress;


/***/ }),
/* 3 */,
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateDiagnostic = void 0;
const vscode = __webpack_require__(1);
function updateDiagnostic(collection) {
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
            const diagnosticrange = new vscode.Range(new vscode.Position(0, 0), new vscode.Position(lineCount - 1, 10));
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
        }
        else {
            //if line count is equal or greater than 8, it clears all error messages 
            collection.clear();
        }
    }
}
exports.updateDiagnostic = updateDiagnostic;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(1);
const autofill = __webpack_require__(2);
const linelimit = __webpack_require__(4);
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    //create a new diagnostic collection 
    const collection = vscode.languages.createDiagnosticCollection('line count diagnostics');
    vscode.commands.registerCommand('extension.fillAddress', autofill.autofillMyAddress);
    //Initial run of the upDateDiagnostic method
    linelimit.updateDiagnostic(collection);
    //Subscribes a new event handler that activates when an edit or change is performed on a workspace document document  
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(editorchangeevent => {
        if (editorchangeevent) {
            linelimit.updateDiagnostic(collection);
        }
    }));
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map