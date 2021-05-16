/* eslint-env browser */

import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { WebsocketProvider } from 'y-websocket'
import { AceBinding } from 'y-ace'
import Ace from 'ace-builds/src-min-noconflict/ace'
import 'ace-builds/src-min-noconflict/mode-javascript'
import 'ace-builds/src-min-noconflict/theme-monokai'

window.addEventListener('load', () => {
  const ydoc = new Y.Doc()
  const provider = new WebrtcProvider('yjs-ace', ydoc)

  // or use y-websocket
  // const provider = new WebsocketProvider('wss://demos.yjs.dev', 'ace-demo', ydoc) // remote
  // const provider = new WebsocketProvider('ws://localhost:1234', 'ace-demo', ydoc) // local
  // provider.on('status', event => {
  //   console.log(event.status) // websocket logs "connected" or "disconnected"
  // })

  const type = ydoc.getText('ace')

  var editor = Ace.edit('editor')
    editor.setTheme('ace/theme/monokai')
    editor.session.setMode('ace/mode/javascript')
    editor.setOptions({
      showPrintMargin: false,
      animatedScroll: false,
      displayIndentGuides: false,
      useWorker: false,
      showLineNumbers: true,
      showGutter: true,
      tabSize: 4, useSoftTabs: false,
    })


  // const binding = new Y.AceBinding(ace, type)
  const binding = new AceBinding(type, editor, provider.awareness)

  provider.awareness.on('change', function(){
    let userCount = provider.awareness.getStates().size
    let userIcon = '👤 '
    if(userCount > 1){
      userIcon = '👥 '
    }
    document.getElementById('users').innerHTML = userIcon + userCount + ' users'
  })

  // Define user name and user name
  provider.awareness.setLocalStateField('user', {
    name: Math.random().toString(36).substring(7),
    color: '#'+Math.floor(Math.random()*16777215).toString(16)
  })


  const connectBtn = document.getElementById('y-connect-btn')
  connectBtn.addEventListener('click', () => {
    if (provider.shouldConnect) {
      provider.disconnect()
      connectBtn.textContent = 'Connect'
    } else {
      provider.connect()
      connectBtn.textContent = 'Disconnect'
    }
  })

  // @ts-ignore
  // window.example = { provider, ydoc, type, binding, Y }
})
