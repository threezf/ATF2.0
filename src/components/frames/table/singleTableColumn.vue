<template> 
    <div v-if="thead.type === 'time'">
        {{+transProp(rowdata.row, thead.prop) | changeTime(thead.format)}}
    </div>
    <div v-else-if="thead.type === 'index'">
        {{1 + rowdata.$index}}
    </div>
    <div v-else-if="thead.type === 'link'">
        <router-link :target="thead.target" :to="{path: thead.href, query: transHrefQuery(rowdata.row, thead.query)}">{{transProp(rowdata.row, thead.prop)}}</router-link>
    </div>
    <div v-else-if="thead.type === 'number'">
        {{transProp(rowdata.row, thead.prop) | changeNumber(thead.fixed, thead.extMulti) | number(thead.fixed)}}{{thead.unit}}
    </div>
    <div v-else-if="thead.type === 'percent'">
        {{transProp(rowdata.row, thead.prop) | changeNumber(thead.fixed, thead.extMulti) | toPercent(thead.fixed)}}{{thead.unit}}
    </div>
    <div v-else-if="thead.type === 'intOrFloat'">
        {{this.formatNumber(transProp(rowdata.row, thead.prop)) }}
    </div>
    <div v-else-if="thead.type === 'text'">
        <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content" style="width: 300px;line-height: 1.6;font-size: 14px;">
                <p v-html="textFommater(transProp(rowdata.row, thead.prop))"></p>
            </div>
            <div class="text-max-line" :style="{'-webkit-line-clamp': thead.maxLine || 3}" v-html="textFommater(transProp(rowdata.row, thead.prop))" style="text-align: left;"></div>
        </el-tooltip>
    </div>
    <div v-else-if="thead.type === 'tag'">
        <template v-for="(tag, index) in transProp(rowdata.row, thead.prop)">
            <el-tag :type="tagType(tag.taglevel)" v-if="tag.tagname" class="tag-item" @click="gotoTagManage(tag.tagname)" :key="index">{{tag.tagname}}</el-tag>
        </template>
    </div>
    <div v-else-if="thead.type === 'avatar'">
        <el-avatar :size="thead.size || 'medium'" :src="transProp(rowdata.row, thead.prop)"></el-avatar>
    </div>
    <div v-else-if="thead.type === 'media'">
        <div class="image-list-wrap" v-viewer="{movable: false}">
            <div class="image-item" v-for="(media, mindex) in transProp(rowdata.row, thead.prop)" :key="mindex">
                <img v-if="media.media_type === 2" :src="media.url" style="width: 80px; height: 80px;">
                <video-player v-if="media.media_type === 4" :src="media.url" :poster="media.thumb_url" :duration="media.video_play_len"></video-player>
            </div>
        </div>
    </div>
    <div v-else-if="thead.type === 'topic'">
        <el-tooltip v-for="(topic, index) in transProp(rowdata.row, thead.prop)" :key="index" class="item" effect="dark" placement="top">
            <div slot="content">{{topic.topic_type === 1 ? '文字话题' : 'POI话题'}}<br />TopicId: {{topic.topic_id}}</div>
            <el-tag class="tag-item" :type="topic.topic_type === 1 ? 'primary': 'info'">{{topic.topic}}</el-tag>
        </el-tooltip>
    </div>
    <div v-else-if="thead.type === 'poi'">
        <template v-if="transProp(rowdata.row, thead.prop).city">
            {{transProp(rowdata.row, thead.prop).city}} {{transProp(rowdata.row, thead.prop).poiAddress}} {{transProp(rowdata.row, thead.prop).poiName}}<br />
            经度：{{transProp(rowdata.row, thead.prop).longitude}}<br />
            纬度：{{transProp(rowdata.row, thead.prop).latitude}}
        </template>
    </div>
    <div v-else-if="thead.type === 'operationSlot'">
        <slot></slot>
    </div>
    <div v-else-if="thead.type === 'slot'">
        <!-- <slot name="slops" :row="rowdata.row" :index="rowdata.$index"></slot> -->
        <slot></slot>
    </div>
    <div v-else-if="thead.type === 'self'">
        <slot></slot>
    </div>
    <div v-else-if="thead.type === 'trans'" v-html="transFilter(transProp(rowdata.row, thead.prop), thead.transList)">
    </div>
    <div v-else>{{transProp(rowdata.row, thead.prop)}}</div>
</template>

<script>
    import VueMixins from '@/libs/vueMixins.js'

    export default {
        name: 'SingleTableColumn',
        mixins: [VueMixins],
        props: {
            rowdata: {
                type: Object,
                default: function () {
                    return {
                    }
                }
            },
            thead: {
                type: Object,
                default: function () {
                    return {
                        lable: '该表格无数据',
                        pageTotal: 0
                    }
                }
            },
        },
        filters: {
            changeNumber(value, dotNum = 0, extMulti = 1) {
                if (!value) {
                    value = 0
                }
                return (value * extMulti)
            }
        },
        data() {
            return {
            }
        },
        watch: {},
        computed: {},
        created() {},
        mounted() {},
        methods: {
            // 添加文字判断
            transColor(flag,text){
                if(!flag){
                    return ''
                }
                let green = ['是']
                let red = [ '否']
                if(green.indexOf(text) !== -1){
                    return 'green'
                }
                if(red.indexOf(text) !== -1){
                    return 'red'
                }
                return ''
            },
            textFommater(val) {
                return val ? val.replace(/\\n/g, "<br/>") : ''
            },
            transProp(row, key) {
                if(!key) {
                    console.warn('error, need [prop] key')
                    return ''
                }
                if (key.indexOf('.') !== -1 || key.indexOf('[') !== -1) {
                    try {
                        return eval('row.' + key)
                    } catch (error) {
                        return ''
                    }
                } else {
                    return this.thead.undefToZero ? this.undefToZero(row[key]) : row[key]
                }
            },
            undefToZero(value){
                if(value !== undefined){
                    return value
                }
                else{
                    return 0
                }
            },
            transHrefQuery(row, query) {
                query = Object.assign({}, query)
                for (let i in query) {
                    query[i] = this.transProp(row, query[i])
                }
                // console.log(query)
                return query
            },
            gotoTagManage(tagName) {
                return false
                let path = this.$router.resolve({
                    name: 'TagManage',
                    query: {
                        tagName: tagName
                    }
                })
                window.open(path.href, '_blank')
            },
            transFilter(value, transList) {
                if(!transList) {
                    console.warn('transList miss!')
                    return ''
                }
                let needReturn = ''
                for(let i in transList) {
                    if(value == transList[i].value) {
                        needReturn = transList[i]
                        break
                    }
                }

                if(!needReturn) {
                    return `<span style="color: ${transList[0] ? transList[0].color : ''}">${value}</span>`
                }else{
                    return `<span style="color: ${needReturn.color}">${needReturn.label}</span>`
                }
            },
            tagType(level) {
                if(level === 2) {
                    return 'warning'
                }else if(level === 3) {
                    return 'info'
                }else{
                    return ''
                }
            },
        }
    };
</script>
<style lang="less" scoped>
    .text-max-line{
        word-wrap: break-word; 
        overflow: hidden; 
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
    }
        .table-comp {

        .tag-item {
            margin-right: 3px;
            margin-bottom: 3px;
        }

        .image-list-wrap {
            display: flex;
            flex-wrap: wrap;
            max-height: 300px;

            .image-item {
                cursor: pointer;
                margin: 0 5px;
            }
        }

        .pagination {
            margin: 15px auto;
            text-align: center;
        }

        .text-max-line{
            word-wrap: break-word; 
            overflow: hidden; 
            display: -webkit-box;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
        }
    }
</style>