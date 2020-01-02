<template>
    <div @contextmenu.prevent>
        <!-- <el-table :data="tableData" style="width: 100%" :row-style="isRed" @selection-change="selected"> -->
        <el-table 
            :data="tableData" 
            style="width: 100%" 
            :cell-class-name="isRed"
            :row-class-name="tableRowClassName"
            @row-click = "onRowClick">
            <el-table-column type="selection" width="50">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="80">
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="80">
            </el-table-column>
        </el-table>
        <div>
            <button @click="rowIndex++">aa+a</button>
            <button @click="columnIndex++">bb+bb</button>
            <button @click="rowIndex--">a-aa</button>
            <button @click="columnIndex--">bb-bb</button>
        </div>
        <div>
            rowIndex: {{rowIndex}}
            columnIndex: {{columnIndex}}
        </div>
        <div @click="log('外部')">
            rowIndex: {{rowIndex}}
            <div @click="log('中部')">
                <span @click.stop="log('内部')">rowIndex 内部: {{rowIndex}}</span>
                columnIndex 中部: {{columnIndex}}
            </div>
            columnIndex 外部: {{columnIndex}}
        </div>
	</div>
</template>

<script>
	import VueMixins from '@/libs/vueMixins.js'
    export default {
        name: "test-sub-page12",
        mixins: [VueMixins],
        data() {
            return {
            tableData: [
                {
                    id: 123,
                    "name": "直接登录网站",
                    "age": "11",
                },
                {
                    id: 33,
                    "name": "asd",
                    "age": "22",
                },
                {
                    id: 12553,
                    "name": "zxc",
                    "age": "5",
                },
            ],
            selectedArr: [] ,
            rowIndex:-1,
            columnIndex:-1,
        }
      },
      methods:{
        log(mes){
            alert(mes)
        },
        selected (select) {
            console.log(select)
            this.selectedArr = select
        },

        isRed ({row, column, rowIndex, columnIndex}) {
            console.log(row)
            console.log(column)
            console.log(rowIndex)
            console.log(columnIndex)
            if (rowIndex === this.rowIndex && columnIndex === this.columnIndex) {
            console.log('ssss')
                return 'reds'
            }
        },
        tableRowClassName({row, rowIndex}){
            row.index = rowIndex;
        },
        onRowClick (row, event, column) {
            //行点击消除new标记
            var index = row.index;
            var deleteIndex = Array.indexOf(this.showIndexArr, index);
            if (deleteIndex != -1) {
                this.showIndexArr.splice(deleteIndex,1);  
            }
        }
        // isRed({ row }) {
        //     const checkIdList = this.selectedArr.map(item => item.id)
        //     console.log(checkIdList)
        //     if (checkIdList.includes(row.id)) {
        //         console.log("MF")
        //         return {
        //             backgroundColor: '#F4EDE6',
        //         }
        //     }
        // },
      }
    }
</script>

<style >
.menu__item {
	display: block;
	line-height: 20px;
	text-align: center;
	margin:10px;
	cursor: default;
}
.menu__item:hover{
	color: #FF0000;
}

.menu {
 	height: auto;
 	width: auto;
 	position: fixed;
 	font-size: 14px;
 	text-align: left;
 	border-radius: 10px;
 	border: 1px solid #c1c1c1;
 	background-color: #ffffff;
}

li:hover {
  background-color: #E0E0E2;
  color: white;
}
.reds{
    background: #FF0000
}
</style>
