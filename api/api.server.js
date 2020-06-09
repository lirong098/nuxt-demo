import httpRequest from './httpRequest'
/*
 * api请求封装
 * type -请求方式(post/get)
 * url -请求地址
 * params -传递参数
 */
export const payDetail = (params) => {
    // mock数据
    // return httpRequest('post', 'training-report/v1/record/pay-detail', params)
    return Promise.resolve({
        "data": {
            "code": 200,
            "msg": "成功",
            "data": {
                "baseInfo": {
                    "classId": 65668460,
                    "recordId": 1029817,
                    "instrumentId": 1,
                    "instrumentName": "钢琴",
                    "className": "钢琴",
                    "classTime": 1591340400,
                    "classEndTime": 1591341900,
                    "studentId": 1252488,
                    "userNick": "测试33",
                    "userHead": "",
                    "smallUserHead": "",
                    "teacherId": 100000094,
                    "teacherShowName": "测试可示范1",
                    "teacherHead": "",
                    "smallTeacherHead": "",
                    "superTeacherIcon": "",
                    "superTeacherLevel": 50,
                    "teacherTitleType": 50,
                    "type": 1,
                    "teacherTitleName": "王牌可示范",
                    "teacherTitleStyleType": 4,
                    "isShowFixedButton": 0
                },
                "statisticsInfo": {
                    "yearLearnSong": 60,
                    "currentWeekPractice": 7,
                    "historyWeekMaxPractice": 18,
                    "cumulativeDuration": 2950.0,
                    "evaluate": ["小朋友本次", "练习表现良好", "，", "要继续加油哦！"],
                    "scheduleCount": 0,
                    "classPer": "良好",
                    "mortgageRepertoireName": "第一级-匈牙利舞曲",
                    "practiceRepertoireCount": 1
                },
                "classPerformance": [{
                    "num": 65667010,
                    "score": 4
                }, {
                    "num": 65667079,
                    "score": 1
                }, {
                    "num": 65667785,
                    "score": 4
                }, {
                    "num": 65667937,
                    "score": 4
                }, {
                    "num": 65667996,
                    "score": 5
                }, {
                    "num": 65668001,
                    "score": 5
                }, {
                    "num": 65668084,
                    "score": 5
                }, {
                    "num": 65668460,
                    "score": 4
                }],
                "songInfo": [{
                    "title": "曲目1",
                    "courseName": "第一级-匈牙利舞曲",
                    "name": "第一级-匈牙利舞曲",
                    "officialVideoUrl": "",
                    "recordImgUrls": [{
                        "url": "",
                        "smallUrl": ""
                    }],
                    "issueCount": [0],
                    "issues": [{
                        "name": "音准问题",
                        "isMark": 0,
                        "count": [0]
                    }, {
                        "name": "节奏错误",
                        "isMark": 0,
                        "count": [0]
                    }, {
                        "name": "连贯性不足",
                        "isMark": 0,
                        "count": [0]
                    }, {
                        "name": "指法问题",
                        "isMark": 0,
                        "count": [0]
                    }],
                    "courseType": null
                }],
                "directionProposeAudio": "",
                "directionProposeAudioTime": 41000,
                "isAssess": 0,
                "hasAgainAppraise": 0,
                "anonymous": 0,
                "shareInfo": {
                    "posterBackground": "",
                    "posterId": "hb003",
                    "posterTempletId": "hbmb2"
                },
                "precautionsText": ""
            }
        }})
}
export const payDetail1 = (params) => httpRequest('post', 'training-report/v1', params)