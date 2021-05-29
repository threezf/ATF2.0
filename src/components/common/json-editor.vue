 <template>
  <div class="json-editor">
    <textarea ref="textarea" class="json-editor" />
  </div>
</template>
 
<script>
// 引入全局实例
import CodeMirror from "codemirror";
// 引入核心样式
import "codemirror/lib/codemirror.css";
import "codemirror/addon/lint/lint.css";
import "codemirror/theme/rubyblue.css";
// 引入js与json支持
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/json-lint";
// 引入代码自动补全
import 'codemirror/addon/hint/anyword-hint.js';
import 'codemirror/addon/hint/javascript-hint.js';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js';
require("script-loader!jsonlint");
export default {
	name: "JsonEditor",
	/* eslint-disable vue/require-prop-types */
	props: {
		value: {
			type: [Object, String, Array],
		},
		// 是否只读，默认否
		readOnly: {
			type: Boolean,
			default: false,
		},
		hightligtRows: {
			type: Array,
			default: () => []
		},
	},
	data() {
		return {
			jsonEditor: null,
			copyEditng: false,
			isCopy: false
		};
	},
	model: {
		prop: 'value',
		event: 'input'
	},
	computed: {
        valueStr() {
			let obj = null
			if(typeof this.value === 'string') {
				obj = JSON.parse(this.value)
			} else {
				obj = this.value
			}
            return JSON.stringify(obj, null, 4);
        },
    },
	watch: {
		valueStr: {
			handler(newVal, oldVal) {
				if (this.jsonEditor) {
					console.log(this.jsonEditor.markText)
					const editorValue = this.jsonEditor.getValue();
					const self = this;
					// console.log('对比前后', newVal, editorValue)
					if(!newVal || newVal === "{}") {
						this.jsonEditor.setValue("{}");
					}
                    if (newVal && newVal !== editorValue) {
						if(oldVal === "{}" || oldVal == undefined) {
							this.jsonEditor.setValue(JSON.stringify(this.value, null, 4));
						}
						if(this.isCopy) {
							this.jsonEditor.setValue(JSON.stringify(this.value, null, 4));
							this.isCopy = false
						}
                        setTimeout(() => {
                            self.jsonEditor.refresh();
                        }, 0);
                    }
                }
            },
        },
		isEditing: {
			handler(newVal) {
				this.copyEditng = newVal
			},
			immediate: true
		}
	},
	mounted() {
		this.initJsonEditor();
		console.log(this.jsonEditor)
		this.jsonEditor.setOption("readOnly", this.readOnly);
		//监听粘贴事件
		document.addEventListener('paste', (event) => {
			this.jsonEditor.refresh();
		})
		// this.$EventBus.$on('jsonRefresh', (json) => {
		// 	// console.log(this.valueStr)
		// 	this.isCopy = true
		// })
	},
	destroyed() {
		document.removeEventListener('paste',(event) => {
			console.log(event, this.jsonEditor)
		})
	},
	methods: {
		setValue(value){
			this.jsonEditor.setValue(JSON.stringify(value, null, 4));
			setTimeout(() => {
				this.jsonEditor.refresh();
			}, 100);
		},
		// 初始化jsonEditor
		initJsonEditor() {
			this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
				lineNumbers: true,
				matchBrackets: true,
				mode: "application/json",
				gutters: ["CodeMirror-lint-markers"],
				extraKeys: {"Tab": "autocomplete"},
				// theme: "rubyblue",
				lineWrapping: true,
				indentUnit: 4,
				lint: true,
			});
			if(this.value) {
				this.jsonEditor.setValue(JSON.stringify(this.value, null, 4));
				setTimeout(() => {
					this.jsonEditor.refresh();
				}, 100);
			}
			this.jsonEditor.on("change", cm => {
				let sendValue;
				try {
					sendValue = JSON.parse(cm.getValue())
					this.$emit('jsonChange', true)
				}catch(e) {
					console.log('error---->',e)
					this.$emit('jsonChange', false)
				}
				if (sendValue) {
					this.$emit('input', sendValue);
					this.$emit('refresh', this.jsonEditor)
                } else {
					this.$emit('input', this.value);
					this.$emit('refresh', this.jsonEditor)
                }
			});
		},
		// 获取json
		getValue() {
			return this.jsonEditor.getValue();
		},
		// 设置值
		setValue(value) {
			this.jsonEditor.setValue(JSON.stringify(value, null, 4));
			setTimeout(() => {
				this.jsonEditor.refresh();
			}, 0);
		},
		// 高亮某些行
		stressLine(startIndex, endIndex) {
            this.jsonEditor.markText({
                line: startIndex, 
                ch: 0
            }, {
                line: endIndex, 
                ch: 32
            }, {
                className: "highlight-row", 
                css: 'color: blue',
                inclusiveLeft: false
            })
            // this.jsonEditor.addLineClass(14, 'text')
        }
	},
};
</script>
 
<style lang="less" >
.json-editor {
  height: 100%;
  overflow-y: auto;
  position: relative;
  font-size: 14px;
  width: 100%;
  border: 1px solid #ddd;
  pre{
      outline: none;
  }
  .CodeMirror {
    height: auto;
    min-height: 300px;
    .CodeMirror-line {
      line-height: 1.5;
    }
  }
  .CodeMirror-scroll {
    min-height: 300px;
  }
  .CodeMirror-linenumber {
    color: #2b91af;
    height: 21px;
    line-height: 21px;
  }
  .CodeMirror-gutters {
    background-color: #fff;
    border-right: 0;
  }
  span.cm-string {
    color: #f08047;
  }
  .mark {
	  background: chartreuse;
	  color: blue;
  }
}
</style>