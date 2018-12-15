const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()
const db = cloud.database();

/**
 * context 云函数执行上下文
 * event 参数包含小程序端调用传入的 data
 */
exports.main = async (event, context) => {
  // 获取微信上下文，包括openid，appid，unionid
  const { OPENID } = cloud.getWXContext();
  
  return await db.collection('userList')
                .where({
                  _openid: OPENID
                })
                .get()
                .then(res => {
                  const { data } = res;
                  // 若登录过，更新登录时间
                  if(data && data.length > 0) {
                    return db.collection('userList')
                            .doc(data[0]._id)
                            .update({
                              data: {
                                lastLoginTime: db.serverDate()
                              }
                            })
                            .then(() => {
                              let openid = 'userForTest';
                              let groupId = null;
                              // 若有加入的group，则不是测试用户
                              if(data[0].groupId && data[0].groupId.length > 0) {
                                groupId = data[0].groupId;
                                openid = OPENID;
                              }
                              return {
                                openid,
                                groupId
                              }
                            })
                  }else {
                  // 若是新用户，增加一条记录
                    return db.collection('userList')
                            .add({
                              data: {
                                _openid: OPENID,
                                lastLoginTime: db.serverDate(),
                                groupId: null
                              }
                            })
                            .then(() => {
                              return {
                                openid: 'userForTest'
                              }
                            })
                  }
                })

}
