import {
    TimeUtils,
    SessionStorage
} from 'wii-fe-utils'

export default {
    filters: {
        changeTime(value) {
            return TimeUtils.timestampToTime(value, 'yyyy-MM-dd hh:mm:ss')
        }
    },
    data() {
        return {
            verifyId: SessionStorage.get('unigroupuid'),
            rtx: SessionStorage.get('unigrouprtx'),
            componentAppId: 'wx1ec08a99274a048d',
            address4:' http://10.101.167.184:8080/'
        }
    },
    methods:{
        transTime(row, column, cellValue) {
            // console.log(cellValue)
            return TimeUtils.timestampToTime(cellValue, 'yyyy-MM-dd hh:mm:ss')
        }
    }
}
