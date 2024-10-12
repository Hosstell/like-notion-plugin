import { Plugin } from "obsidian";
import boldTextHandlerPlugin from './src/bold-text-handler-plugin'
import strikeTextHandlerPlugin from "src/strike-text-handler-plugin";
import highlightTextHandlerPlugin from "src/highlight-text-handler-plugin";

export default class MainPlugin extends Plugin {
  onload() {
    this.registerEditorExtension([
      strikeTextHandlerPlugin,
      boldTextHandlerPlugin,
      highlightTextHandlerPlugin
    ]);
  }
}
