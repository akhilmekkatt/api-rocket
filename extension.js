const vscode = require("vscode");
const path = require("path");
const fs = require("fs");

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "extension.sendApiRequest",
    () => {
      // Create and show a new webview
      const panel = vscode.window.createWebviewPanel(
        "sendApiRequest", // Identifies the type of the webview. Used internally
        "API Tester", // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in
        {
          enableScripts: true,
          // Only allow the webview to access resources in our extension's media directory
          localResourceRoots: [
            vscode.Uri.file(path.join(context.extensionPath, "media")),
          ],
        }
      );

      const htmlPath = vscode.Uri.file(
        path.join(context.extensionPath, "rocket/build", "index.html")
      );

      panel.webview.html = fs.readFileSync(htmlPath.fsPath).toString();
    }
  );

  context.subscriptions.push(disposable);
}

exports.activate = activate;
