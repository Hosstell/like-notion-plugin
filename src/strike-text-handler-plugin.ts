import {
ViewUpdate,
PluginValue,
ViewPlugin,
} from "@codemirror/view";
  
  class StrikeTextHandlerPlugin implements PluginValue {
    update(update: ViewUpdate) {  
      const changesJson = update.changes.toJSON()
      const isRemoving = changesJson.map((x: any) => x.length === 1).some((x: any) => x)
      if (update.docChanged && isRemoving) {
        const oldText = update.startState.doc.toString()
        const newText = update.state.doc.toString()
        let boldStatuses = [false, false]
        let boldStatus = false
  
        for (let i = 2; i < oldText.length; i++) {
          if (oldText[i-1] === "~" && oldText[i-2] === "~") {
            boldStatus = !boldStatus
          }
          boldStatuses.push(boldStatus)
        }
  
        let position = changesJson[0].length ? 0 : changesJson[0]
        const count = changesJson[0].length ? changesJson[0][0] : changesJson[1][0]
        boldStatuses = boldStatuses.slice(0, position).concat(boldStatuses.slice(position + count))
  
        let text = ""
        boldStatus = false
        for (let i = 0; i < newText.length; i++) {
          if (newText[i] === "~") {
            continue
          }
  
          if (boldStatuses[i] !== boldStatus) {
            text += "~~"
            boldStatus = !boldStatus
          }
          text += newText[i]
        }
        if (boldStatus) {
          text += "~~"
        }
        
        const changes = update.state.update({
          changes: {from: 0, to: newText.length, insert: text},
          selection: {anchor: position > text.length ? text.length : position}
        })
        setTimeout(() => {
          update.view.dispatch(changes)
        })
        
      }  
    }
  }
  
  export default ViewPlugin.fromClass(StrikeTextHandlerPlugin);