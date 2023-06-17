import * as vscode from 'vscode';

export function autofillMyAddress() {
    //Retrieve the current active text editor
    const editor = vscode.window.activeTextEditor;
    //Check if editor is undefined
    if (editor) {
        //Insert text at the current position using an edit builder
        editor.edit(editBuilder => {
            editBuilder.insert(editor.selection.active,'Street 6260-112 Glenwood Ave'
            +'\nCity/Town	Raleigh'
            +'\nState/Province/Region	Nebraska'
            +'\nZip/Postal Code	27612'
            +'\nPhone Number	(919) 785-2864'
            +'\nCountry	United States'
            +'\nLatitude	35.859171'
            +'\nLongitude	-78.703853');
        });
    }
}


