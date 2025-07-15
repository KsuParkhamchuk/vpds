import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "vpds" is now active!');

	vscode.commands.registerCommand('vpds.openChat', () => {
		const vpdsView = vscode.window.createWebviewPanel(
			'vpds',
			'VPDS',
			vscode.ViewColumn.Five,
			{
				enableScripts: true,
				localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'vpdsui', 'dist'))]
			}
		);
		vpdsView.webview.html = getWebViewContent(context, vpdsView);
	});
}

export function deactivate() {}

function getWebviewUri(webview: vscode.Webview, context: vscode.ExtensionContext, ...pathSegments: string[]) {
	return webview.asWebviewUri(vscode.Uri.file(
	  path.join(context.extensionPath, ...pathSegments)
	));
  }

function getWebViewContent(context: vscode.ExtensionContext, vpdsView: vscode.WebviewPanel) {
	let uiBuildPath = path.join(context.extensionPath, "vpdsui", "dist");
	
	let uiIndexPath = path.join(uiBuildPath, "index.html");
	let html = fs.readFileSync(uiIndexPath, 'utf8');

	html = html.replace(
		/(src|href)="(\/assets\/[^"]+)"/g, 
		(_, attr, assetPath) => {
		  const assetUri = getWebviewUri(
			vpdsView.webview, 
			context,
			"vpdsui", 
			"dist", 
			assetPath.replace('./', '')
		  );
		  return `${attr}="${assetUri}"`;
		}
	  );

	  html = html.replace(
		'<head>', 
		`<head>
		<meta http-equiv="Content-Security-Policy" 
			  content="default-src 'none'; 
					  img-src ${vpdsView.webview.cspSource} https:; 
					  script-src ${vpdsView.webview.cspSource} 'unsafe-inline'; 
					  style-src ${vpdsView.webview.cspSource} 'unsafe-inline';
					 connect-src ${vpdsView.webview.cspSource};">`
	  );
	  
	  return html;
}