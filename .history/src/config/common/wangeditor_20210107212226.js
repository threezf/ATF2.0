import WangEditor from 'wangeditor';
import { onMounted, onBeforeUnmount, ref, reactive } from 'vue';

export default {
    name: 'app',
    setup() {
        const editor = ref();
        const content = reactive({
            html: '',
            text: '',
        });

        let instance;
        onMounted(() => {
            instance = new WangEditor(editor.value);
            Object.assign(instance.config, {
                onchange() {
                    console.log('change');
                },
            });
            instance.create();
        });

        onBeforeUnmount(() => {
            instance.destroy();
            instance = null;
        });

        const syncHTML = () => {
            content.html = instance.txt.html();
        };

        return () => (
            <div>
                <div ref={editor}></div>
                <button onClick={syncHTML}>同步内容</button>
                <div innerHTML={content.html}></div>
            </div>
        );
    },
};
