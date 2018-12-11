const path = require('path')
import { app, dialog, BrowserWindow, Menu, ipcMain, Tray } from 'electron'

if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let timer = null 
let appTray = null
let mainWindow = null
let loginWindow = null

const winURL = process.env.NODE_ENV === 'development' 
  ? `http://localhost:9080` 
  : `https://api.guanggaoxia.cn/pc/electron/index.html`

const iconTray = process.env.NODE_ENV === 'development' 
  ? path.join(__dirname, './icons', 'icon.ico') 
  : path.join(__dirname, './static/icons', 'icon.ico') 

const emptyTray = process.env.NODE_ENV === 'development' 
  ? path.join(__dirname, './icons', 'empty.ico')       
  : path.join(__dirname, './static/icons', 'empty.ico') 

function createWindow () {
  appTray = new Tray(iconTray);
  mainWindow = new BrowserWindow({
    height: 667,
    minHeight: 600,
    useContentSize: true,
    width: 1000,
    minWidth: 900,
    titleBarStyle: 'hidden',
    frame: false,
    webPreferences: {
       webSecurity: process.env.NODE_ENV === 'development' ? false : true
    }
  })

  var trayMenuTemplate = [ 
    { label: '退出', click: function () { mainWindow.destroy() } }
  ]

  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

  appTray.setToolTip('广告侠');

  appTray.setContextMenu(contextMenu);

  appTray.on('click', function(){     
    clearInterval(timer)
    mainWindow.flashFrame(false)
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    mainWindow.isVisible() ? mainWindow.setSkipTaskbar(false) : mainWindow.setSkipTaskbar(true)
  })

  appTray.on('mouse-enter', function(){
    clearInterval(timer);
  })
  

  mainWindow.loadURL(winURL)

  mainWindow.on('close', (event) => { 
      mainWindow.hide(); 
      mainWindow.setSkipTaskbar(true);
      event.preventDefault();
  })

  mainWindow.on('show', () => {
    clearInterval(timer);
    appTray.setHighlightMode('always')
  })
  
  mainWindow.on('hide', () => {
    appTray.setHighlightMode('never')
  })


  ipcMain.on('message', (str) => {
      if(mainWindow.isMinimized()) { 
        mainWindow.flashFrame(true)
        let count = 0
        timer = setInterval(() => {
          count++
          if(count%2 == 0){
            appTray.setImage(emptyTray)
          }else{
            appTray.setImage(iconTray)
          }
        }, 500)
      }
  })

  ipcMain.on('min', e=> mainWindow.minimize());  //监听窗口最小化  
  ipcMain.on('max', e=> {                        //监听窗口最大化
      if (mainWindow.isMaximized()) {
          e.sender.send('maxevent', 'unmax')
          mainWindow.unmaximize()
      } else {
          e.sender.send('maxevent', 'max')
          mainWindow.maximize()
      }
  }); 
   
  ipcMain.on('close', e=> mainWindow.close()); //监听窗口关闭

  ipcMain.on('openlogin', (event, url) => {
    if (loginWindow!=null) {
      loginWindow.focus()
    } else {
      const loginWin = new BrowserWindow({
        height: 500,
        width: 350,
        useContentSize: true,
        transparent: false,
        frame: false,
        darkTheme: true,
        backgroundColor: '#FFFFFFFF',
        webPreferences: {
           webSecurity: process.env.NODE_ENV === 'development' ? false : true
        }
      })

      loginWin.loadURL(url)
      loginWindow = loginWin
    }
    loginWindow.webContents.closeDevTools();
  })
  // 关闭登录窗口
  ipcMain.on('closelogin', (event) => {
    loginWindow.close()
    loginWindow = null
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();     
  }
})

app.on('ready', function(){
  createWindow();
  Menu.setApplicationMenu(null)
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})


 
