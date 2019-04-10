import React, { Component }  from 'react'
import SimpleMDE from 'simplemde';
import marked from 'marked';
import highlight from 'highlight.js';
import 'simplemde/dist/simplemde.min.css';
import {  Button, } from 'antd';
class Article extends Component {
	constructor(props) {
		super(props);
		this.state = {
			smde: null,
			content: ''
		}
	}
	componentDidMount() {
		this.state.smde = new SimpleMDE({
			element: document.getElementById('editor').childElementCount,
			autofocus: true,
			autosave: true,
			previewRender(plainText) {
				return marked(plainText, {
					renderer: new marked.Renderer(),
					gfm: true,
					pedantic: false,
					sanitize: false,
					tables: true,
					breaks: true,
					smartLists: true,
					smartypants: true,
					highlight(code) {
						return highlight.highlightAuto(code).value;
					},
				});
			}
		})
	}
	handSubmit = () => {
		console.log(this.state.smde.value())
	}
	render() {
		return (
			<div style={{width: '1200px'}}>
				<textarea id="editor" style={{ marginBottom: 20, width: 800 }} size="large" rows={6} />
				<div>
					<Button onClick={this.handSubmit}>提交</Button>
				</div>
			</div>
		)
	}
}


export default Article
