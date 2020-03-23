const {app, BrowserWindow} = require('electron')
let {PythonShell} = require('python-shell')
const path = require('path')

function createWindow () {
 
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
    
  const pathToPythonScript = path.join(__dirname, 'app.py');
  let pyshell = new PythonShell(pathToPythonScript);

    pyshell.on('message', function(message) {
      swal(message);
    })

  mainWindow.loadFile('index.html')
}


app.whenReady().then(createWindow)

app.on('window-all-closed', function () {
  
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
