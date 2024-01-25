// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const axios = require("axios");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "extension.sendApiRequest",
    sendRequest
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

// Function to send HTTP request and display the response
async function sendRequest() {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage("Open a file to send a request.");
    return;
  }

  const selectedText = editor.document.getText(editor.selection);

  // You can customize this URL or use user input
  const apiUrl = selectedText; //"https://jsonplaceholder.typicode.com/posts/1";

  try {
    const response = await axios.get(apiUrl);
    vscode.window.showInformationMessage(
      `API Response:\n${JSON.stringify(response.data, null, 2)}`
    );
  } catch (error) {
    vscode.window.showErrorMessage(`Error sending request: ${error.message}`);
  }
}
module.exports = {
  activate,
  deactivate,
};
