import React, { Component } from 'react';
import './App.css';
import '../node_modules/draft-js-mention-plugin/lib/plugin.css';
import '../node_modules/draft-js-emoji-plugin/lib/plugin.css';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor'; // eslint-disable-line import/no-unresolved
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'; // eslint-disable-line import/no-unresolved
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createCounterPlugin from 'draft-js-counter-plugin';

import editorStyles from './editorStyles.css';
import hashtagStyles from './hashtagStyles.css';
import mentions from './mentions';

const mentionPlugin = createMentionPlugin();
const hashtagPlugin = createHashtagPlugin({ theme: hashtagStyles });
const linkifyPlugin = createLinkifyPlugin();
const counterPlugin = createCounterPlugin();

const { MentionSuggestions } = mentionPlugin;
const { CharCounter } = counterPlugin;
const plugins = [mentionPlugin, hashtagPlugin, linkifyPlugin, counterPlugin];

class App extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    suggestions: mentions,
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions),
    });
  };

  onAddMention = () => {
    // get the mention object selected
  }

  focus = () => {
    this.editor.focus();
  };

  customCountFunction(str) {
    const wordArray = str.match(/\S+/g);  // matches words according to whitespace
    return wordArray ? wordArray.length : 0;
  }

  render() {
    return (
      <div className={editorStyles.editor} onClick={this.focus}>
        <h1>Hello World!</h1>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={(element) => { this.editor = element; }}
        />
        <MentionSuggestions
          onSearchChange={this.onSearchChange}
          suggestions={this.state.suggestions}
          onAddMention={this.onAddMention}
        />
        <CharCounter limit={200} />
      </div>
    );
  }
}

export default App;
