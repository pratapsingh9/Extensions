const vscode = require('vscode');

const installPackage = function (packageName) {
    try {
        console.log(`Attempting to install package: ${packageName}`);
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage("No open workspace. Please open a folder first.");
            return;
        }
        if (packageName == 'nextjsapp' || packageName == "nextjs" || packageName == "nextapp" || packageName == "next") {
            let newQuickPick = vscode.window.createQuickPick();
            newQuickPick.placeholder = "Enter Next App Name";
            newQuickPick.show();
            newQuickPick.onDidAccept(() => {
                let projectName = newQuickPick.value;
                if (!projectName) {
                    vscode.window.showErrorMessage("No Name Selected");
                    newQuickPick.dispose();
                    return;
                }
                const terminal = vscode.window.createTerminal();
                terminal.show();
                terminal.sendText(`npx create-next-app@latest ${projectName}`);
                vscode.window.showInformationMessage('Next App Created Successfully...');
                newQuickPick.dispose();
                return;
            })
            return;
        }
        else if (packageName == 'vitereact'|| packageName=='reactapp' || packageName == "reactvite" || packageName == 'reactapp') {
            let newQuickPick = vscode.window.createQuickPick();
            newQuickPick.placeholder = "Enter Vite React App Name";
            newQuickPick.show();
            newQuickPick.onDidAccept(() => {
                let projectName = newQuickPick.value;
                if (!projectName) {
                    vscode.window.showErrorMessage("No Name Selected");
                    newQuickPick.dispose();
                    return;
                }
                const terminal = vscode.window.createTerminal();
                terminal.show();
                terminal.sendText(`npm init @vitejs/app ${projectName} --template react`);
                vscode.window.showInformationMessage('Vite React App Created Successfully...');
                newQuickPick.dispose();
                return;
            })
        }
        else if(packageName == "react native" || packageName == "react natvie" || packageName=="native react " || packageName == "react native app" || packageName == "reactnative") {
            let newQuickPick = vscode.window.createQuickPick();
            newQuickPick.placeholder = "Enter React Native App Name";
            newQuickPick.show();
            newQuickPick.onDidAccept(() => {
                let projectName = newQuickPick.value;
                if (!projectName) {
                    vscode.window.showErrorMessage("No Name Selected");
                    newQuickPick.dispose();
                    return;
                }
                const terminal = vscode.window.createTerminal();
                terminal.show();
                terminal.sendText(`npx react-native init ${projectName}`);
                vscode.window.showInformationMessage('React Native App Created Successfully...');
                newQuickPick.dispose();
                return;
            })
        }
        
        else {
            const projectPath = workspaceFolders[0].uri.fsPath;
            console.log(`Installing in directory: ${projectPath}`);
            vscode.window.showInformationMessage("Trying to install");
            const terminal = vscode.window.createTerminal();
            terminal.show();
            terminal.sendText(`npm install ${packageName}`);
            vscode.window.showInformationMessage("packag installed succesfully");
        }
        vscode.window.showInformationMessage("Thanks For Using");
    } catch (error) {
        vscode.window.showErrorMessage(error);
        vscode.window.showInformationMessage('Error In Installation')
    }
};

exports.installPackage = installPackage;