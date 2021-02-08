<template>
  <div class="page-outer">
    <sidebar  :categoryMap="categoryMap" :showByCategory="showByCategory"
              :projects="projects" id="sidebar"></sidebar>
    <div class="project-container" id="project-container">
        <project v-for="project in projects" :project="project" :showshort="project.hasShortIntro" :config="config" :key="project.id">
        </project>
    </div>
  </div>
</template>
<script>
import Request from '@/libs/request.js'
import VueMixins from '@/libs/vueMixins.js'
import project from '@/components/help/project'
import sidebar from '@/components/help/sidebar'
export default {
    name: ' Help',
    mixins: [VueMixins], // 混入
    components: {
        project,        
        sidebar
    },
    data() {
        return {
            projects: [],
            categoryMap: new Map(),
            showByCategory: false,
            config: {},
        }
 
    },
    created() {
        this.getdata()
    },
    methods: {
        getdata(){
            const config= {
                        "category": true,
                        "homeText": "Home",
                        "codeText": "Code",
                        "expandText": "详细介绍",
                        "collapseText": "收起",
                        "defaultCategory": "---------------------------",
                        "github": "zhangjikai/project-list-template",
                        "busuanzi": true
                    };
            const projectList = [
                        {
                            "id": 0,
                            "hasShortIntro": true,
                            "hasGithub": true,
                            "hasHome": false,
                            "hasCode": true,
                            "name": "Markdown 语法介绍",
                            "content": "<p>介绍 Markdown 的相关语法。</p>\n<!-- more -->\n<h2 id=\"headers\">Headers</h2>\n<h1 id=\"h1\">H1</h1>\n<h2 id=\"h2\">H2</h2>\n<h3 id=\"h3\">H3</h3>\n<h4 id=\"h4\">H4</h4>\n<h5 id=\"h5\">H5</h5>\n<h6 id=\"h6\">H6</h6>\n<h2 id=\"emphasis\">Emphasis</h2>\n<p>Emphasis, aka italics, with <em>asterisks</em> or <em>underscores</em>.</p>\n<p>Strong emphasis, aka bold, with <strong>asterisks</strong> or <strong>underscores</strong>.</p>\n<p>Combined emphasis with <strong>asterisks and <em>underscores</em></strong>.</p>\n<p>Strikethrough uses two tildes. <del>Scratch this.</del></p>\n<h2 id=\"lists\">Lists</h2>\n<ol>\n<li>First ordered list item</li>\n<li>Another item<ul>\n<li>Unordered sub-list.</li>\n</ul>\n</li>\n<li>Actual numbers don't matter, just that it's a number<ol>\n<li>Ordered sub-list</li>\n</ol>\n</li>\n<li><p>And another item.</p>\n<p> You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).</p>\n<p> To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅\n Note that this line is separate, but within the same paragraph.⋅⋅\n (This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)</p>\n</li>\n</ol>\n<ul>\n<li>Unordered list can use asterisks</li>\n<li>Or minuses</li>\n<li>Or pluses</li>\n</ul>\n<h2 id=\"links\">Links</h2>\n<p><a href=\"https://www.google.com\">I'm an inline-style link</a></p>\n<p><a href=\"https://www.google.com\" title=\"Google's Homepage\">I'm an inline-style link with title</a></p>\n<p><a href=\"https://www.mozilla.org\">I'm a reference-style link</a></p>\n<p><a href=\"../blob/master/LICENSE\">I'm a relative reference to a repository file</a></p>\n<p><a href=\"http://slashdot.org\">You can use numbers for reference-style link definitions</a></p>\n<p>Or leave it empty and use the <a href=\"http://www.reddit.com\">link text itself</a>.</p>\n<p>URLs and URLs in angle brackets will automatically get turned into links.\n<a href=\"http://www.example.com\">http://www.example.com</a> or <a href=\"http://www.example.com\">http://www.example.com</a> and sometimes\nexample.com (but not on Github, for example).</p>\n<p>Some text to show that the reference links can follow later.</p>\n<h2 id=\"images\">Images</h2>\n<p>Here's our logo (hover to see the title text):</p>\n<p>Inline-style:\n<img src=\"https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png\" alt=\"alt text\" title=\"Logo Title Text 1\"></p>\n<p>Reference-style:\n<img src=\"https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png\" alt=\"alt text\" title=\"Logo Title Text 2\"></p>\n<h2 id=\"code\">Code</h2>\n<pre class=\"line-numbers language-css\"><code class=\" language-css\"><span class=\"token selector\">body</span><span class=\"token punctuation\">{</span>\n    <span class=\"token property\">margin</span><span class=\"token punctuation\">:</span> <span class=\"token number\">0</span> auto<span class=\"token punctuation\">;</span>\n    <span class=\"token property\">font-family</span><span class=\"token punctuation\">:</span> Georgia, Palatino, serif<span class=\"token punctuation\">;</span>\n    <span class=\"token property\">color</span><span class=\"token punctuation\">:</span> <span class=\"token hexcode\">#444444</span><span class=\"token punctuation\">;</span>\n    <span class=\"token property\">line-height</span><span class=\"token punctuation\">:</span> <span class=\"token number\">1</span><span class=\"token punctuation\">;</span>\n    <span class=\"token property\">padding</span><span class=\"token punctuation\">:</span> <span class=\"token number\">30</span>px<span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span><span aria-hidden=\"true\" class=\"line-numbers-rows\"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span></code></pre><h2 id=\"tables\">Tables</h2>\n<p>Colons can be used to align columns.</p>\n<table>\n<thead>\n<tr>\n<th>Tables</th>\n<th style=\"text-align:center\">Are</th>\n<th style=\"text-align:right\">Cool</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>col 3 is</td>\n<td style=\"text-align:center\">right-aligned</td>\n<td style=\"text-align:right\">$1600</td>\n</tr>\n<tr>\n<td>col 2 is</td>\n<td style=\"text-align:center\">centered</td>\n<td style=\"text-align:right\">$12</td>\n</tr>\n<tr>\n<td>zebra stripes</td>\n<td style=\"text-align:center\">are neat</td>\n<td style=\"text-align:right\">$1</td>\n</tr>\n</tbody>\n</table>\n<p>There must be at least 3 dashes separating each header cell.\nThe outer pipes (|) are optional, and you don't need to make the\nraw Markdown line up prettily. You can also use inline Markdown.</p>\n<table>\n<thead>\n<tr>\n<th>Markdown</th>\n<th>Less</th>\n<th>Pretty</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><em>Still</em></td>\n<td><code>renders</code></td>\n<td><strong>nicely</strong></td>\n</tr>\n<tr>\n<td>1</td>\n<td>2</td>\n<td>3</td>\n</tr>\n</tbody>\n</table>\n<h2 id=\"blockquotes\">Blockquotes</h2>\n<blockquote>\n<p>Blockquotes are very handy in email to emulate reply text.\nThis line is part of the same quote.</p>\n</blockquote>\n<p>Quote break.</p>\n<blockquote>\n<p>This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can <em>put</em> <strong>Markdown</strong> into a blockquote.</p>\n</blockquote>\n<h2 id=\"inline-html\">Inline HTML</h2>\n<dl>\n  <dt>Definition list</dt>\n  <dd>Is something people use sometimes.</dd>\n\n  <dt>Markdown in HTML</dt>\n  <dd>Does <em>not</em> work <strong>very</strong> well. Use HTML <em>tags</em>.</dd>\n</dl>\n\n<h2 id=\"horizontal-rule\">Horizontal Rule</h2>\n<p>Three or more...</p>\n<hr>\n<p>Hyphens</p>\n<hr>\n<p>Asterisks</p>\n<hr>\n<p>Underscores</p>\n",
                            "shortIntro": "<p>介绍 Markdown 的相关语法。</p>\n",
                            "tags": [
                                "markdown"
                            ],
                            "category": "示例",
                            "home": "",
                            "code": "https://github.com/zhangjikai/project-list-template",
                            "github": {
                                "star": "true",
                                "fork": "true",
                                "repo": "zhangjikai/project-list-template"
                            }
                        },
                        {
                            "id": 1,
                            "hasShortIntro": true,
                            "hasGithub": true,
                            "hasHome": true,
                            "hasCode": true,
                            "name": "基于Three.js 框架的 3D 射击游戏",
                            "content": "<p>基于 three.js 的一款 3D 射击游戏。</p>\n<!-- more -->\n<h2 id=\"-\">介绍</h2>\n<p>首先选取一张包含人脸的图片，人脸尽可能大以便于裁剪。裁剪框有三条提示线，分别对应人的双眼和嘴。通过调节图片的大小，使双眼和嘴尽量重合。裁剪的图片会被用做怪物的脸。\n游戏设置了四种武器：</p>\n<ul>\n<li>普通子弹 - 第一次击中怪物后，会使怪物脸发生变形，第二次击中怪物后才会杀死怪物</li>\n<li>冷冻弹 - 爆炸后使怪物停止移动</li>\n<li>炮弹 - 爆炸后会产生很多小子弹，不会自动引爆，发射后需要点击普通子弹操作引爆</li>\n<li>激光 - 碰到怪物就可以杀死怪物</li>\n</ul>\n<p>游戏设置了两种模式 - 闯关模式和计分模式。本来还有一个对战模式，通信使用 websocket + java web, 但是因为没有 java 服务器，所以把这个模式去掉了。</p>\n<p>如果在移动端玩这个游戏，注意使用横屏模式。建议使用 chrome 浏览器。</p>\n<h2 id=\"-\">截图</h2>\n<p><img src=\"https://raw.githubusercontent.com/zhangjikai/MindYourHead/master/images/demo/game.png\" alt=\"\"></p>\n",
                            "shortIntro": "<p>基于 three.js 的一款 3D 射击游戏。</p>\n",
                            "tags": [
                                "Three.js",
                                "游戏"
                            ],
                            "category": "HTML5 & JS",
                            "home": "http://head.zhangjikai.com/",
                            "code": "https://github.com/zhangjikai/MindYourHead",
                            "github": {
                                "star": "true",
                                "fork": "true",
                                "repo": "zhangjikai/MindYourHead"
                            }
                        },
                    ];
            let categoryObjMap = new Map();
            this.categoryMap = {};
            this.showByCategory = config.category;
            this.projects = projectList;
            //console.log(document.body.clientWidth);
            //console.log(projectList);
            if (this.showByCategory) {
                let arrList;
                let projectMap = new Map();
                for (let pro of projectList) {
                    projectMap.set(pro.id, pro);
                    if (pro.category == null || pro.category.trim() == "") {
                        pro.category = config.defaultCategory;
                    }

                    if (categoryObjMap.has(pro.category)) {
                        arrList = categoryObjMap.get(pro.category);
                        arrList.push({
                            id: pro.id,
                            name: pro.name
                        });

                    } else {
                        arrList = [];
                        arrList.push({
                            id: pro.id,
                            name: pro.name
                        });
                        categoryObjMap.set(pro.category, arrList);

                    }
                }


                for (let key of categoryObjMap.keys()) {
                    this.categoryMap[key] = categoryObjMap.get(key);
                }

                this.projects = [];

                for (let cate of categoryObjMap.keys()) {
                    let pros = categoryObjMap.get(cate);
                    for (let pro of pros) {
                        this.projects.push(projectMap.get(pro.id));
                    }
                }
            }
        }

    }
}
</script>

<style lang="less" scoped>

</style>>