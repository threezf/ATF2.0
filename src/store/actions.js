import Request from '../libs/request'
export default {
    // 获取总积分
    getTotalScore(context, userId) {
        return new Promise((resolve, reject) => {
            Request({
                url: '/userController/getTotalScore',
                method: 'POST',
                params: {
                    userId
                }
            }).then(res => {
                sessionStorage.setItem('totalScore', res.totalScore)
                console.log('获取积分', res)
                context.commit('setTotalScore', { totalScore: Number(res.totalScore) })
                resolve({ userId, totalScore: Number(res.totalScore) })
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    // 修改总积分
    updateTotalScore(context, res) {
        console.log('update', res)
        return new Promise((resolve, reject) => {
            Request({
                url: '/userController/updateTotalScore',
                method: 'POST',
                params: {
                    userId: res.userId,
                    totalScore: res.totalScore
                }
            }).then(res => {
                console.log(res, '积分更新成功')
                context.commit('updateTotalScore', { totalScore: Number(res.totalScore) })
                resolve(res)
            }).catch(err => {
                console.log(err, '出现错误')
                reject(err)
            })
        })
    }
}