//ps9--Copyrig
const vscode = require('vscode');
const axios = require('axios');
const {installPackage}= require('./installpackage')
// Function to fetch package names based on user query
const getPackageName = async (searchQuery) => {
    try {
        const response = await axios.get(`https://registry.npmjs.org/-/v1/search?text=${searchQuery}&size=10`);
        const packages = response.data.objects;
        const packageNames = packages.map(pkg => pkg.package.name);
        return packageNames;
    } catch (error) {
        console.error('Failed to fetch package names:', error);
        return [];
    }
}




// Extension activation function
const activateExtension = function (context) {
    let disposable = vscode.commands.registerCommand('extension.installNpmPackage', async function () {
        let quickPick = vscode.window.createQuickPick();
        quickPick.placeholder = 'Type the npm package name to install';
        // Update QuickPick items on user input
        quickPick.onDidChangeValue(async (value) => {
            if (!value) {
                quickPick.items = [];
                return;
            }
            const packageNames = await getPackageName(value);
            quickPick.items = packageNames.map(name => ({ label: name }));
        });
        // Handle selection (installation triggered immediately on typing enter)
        quickPick.onDidAccept(async () => {
            const selectedPackageName = quickPick.items.length > 0 ? quickPick.items[0].label : '';

            if (!selectedPackageName) {
                vscode.window.showErrorMessage('No package selected.');
                var inputUserText = quickPick.value;
                try {
                    installPackage(inputUserText);
                } catch (error) {
                    console.log(error);
                    vscode.window.showErrorMessage(`Failed to install ${inputUserText}: ${error.message}`);
                }
            } else {
                // Install the selected package
                installPackage(selectedPackageName);
            }

            quickPick.hide();
        });

        quickPick.show();
    });

    context.subscriptions.push(disposable);
}
// Function to install npm package
// const installPackage = function (packageName) {
//    try {
//     child_process.exec(`npm install ${packageName}`, (error, stdout, stderr) => {
//         if (error) {
//             vscode.window.showErrorMessage(`Failed to install ${packageName}: ${error.message}`);
//             console.error(stderr);
//         } else {
//             vscode.window.showInformationMessage(`${packageName} installed successfully!`);
//             console.log(stdout);
//         }
//     });
//    } catch (error) {
//     vscode.window.showErrorMessage(`Sorry error Happened ${error}`)
//    }
// }

exports.activate = activateExtension;
