# y-ace

Initial example of [Ace Editor](http://ace.c9.io) binding for [Yjs](https://github.com/yjs/yjs) v13.4+  
Contributed by [Ted Davis](https://github.com/ffd8), with huge thanks to [Federico Lorenzi](https://github.com/cb22) of [room.sh](https://room.sh) for insight on binding Ace with an early 13.0 version of Yjs and [Kevin Jahns](https://github.com/dmonad) for the powerful Yjs project!

This binding maps a Y.Text to an Ace instance. It supports syncing of cursors and selection.  
Built upon [y-quill](https://github.com/yjs/y-quill), with tests currently disabled.

## Example

```js
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { AceBinding } from 'y-ace'
import Ace from 'ace-builds/src-noconflict/ace'

window.addEventListener('load', () => {
  const ydoc = new Y.Doc()
  const provider = new WebrtcProvider('yjs-ace', ydoc)

  const type = ydoc.getText('ace')
  
  // init Ace
  var editor = Ace.edit('editor')

  // init binding
  const binding = new AceBinding(type, editor, provider.awareness)
```

Clone/download this repo and run `npm install` followed by `npm run demo` for working demo.

## License

[The MIT License](./LICENSE) © Kevin Jahns
