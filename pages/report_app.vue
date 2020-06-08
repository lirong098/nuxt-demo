<template>
    <div class="main tses">
        <div class="main-background" :style="'height:' + clientHeight + 'px;'"></div>
        <!-- 分享成绩单 -->
        <canvas v-show="false" id="canvas-share"></canvas>
        <!-- <img src="~assets/images/btn_play.png" alt=""> -->
        <div>
            <div class="module">
                <div class="page-horn"></div>
                <img class="module-banner" src="~assets/images/icn_banner.png" />
                <div class="class-info mk-flex-row-start-center">
                    <img class="head-url head-url-default" :src="baseInfo.smallUserHead" @error="imageError" />
                    <div class="class-text flex-1 mk-flex-column">
                        <div class="class-name mk-flex-row-start-center" v-show="baseInfo.userNick">
                            <span class="class-user-name">{{baseInfo.userNick}}</span>
                        </div>
                        <div class="class-time">{{baseInfo.classTimeText}}</div>
                    </div>
                </div>
                <div class="music-sum">
                    <div class="music-sum-qty">{{statisticsInfo.yearLearnSong}}</div>
                    <hr/>
                    <hr/>
                    <hr/>
                    <hr/>
                    <hr/>
                    <div class="music-sum-text">年度掌握曲目（首)</div>
                </div>
                <div class="study-time">
                    <div class="study-time-font mk-flex-row-start-center">
                        <div class="study-time-qty mk-flex-row flex-1">
                            {{statisticsInfo.currentWeekPractice}}/{{statisticsInfo.historyWeekMaxPractice}}
                            <img v-if="Number(statisticsInfo.currentWeekPractice) > Number(statisticsInfo.historyWeekMaxPractice)" class="study-time-qty-new" src="~assets/images/icn_record.png"/>
                        </div>
                        <div class="study-time-time flex-1">{{statisticsInfo.cumulativeDuration}}</div>
                    </div>
                    <hr/>
                    <hr/>
                    <hr/>
                    <hr/>
                    <hr/>
                    <div class="music-sum-text mk-flex-row">
                        <span class="flex-1">本周练习/历史最多（次）</span>
                        <span class="flex-1">累计练习时长（分钟）</span>
                    </div>
                </div>
                <div class="teacher-comment">
                    <span
                    v-for="(ite, idx) in statisticsInfo.evaluate"
                    :key="idx"
                    :class="
                    idx > 0 && idx !== (statisticsInfo.evaluate.length - 1) ?
                    'teacher-comment-blod ' +
                    ((Number(ite) >= 0) ?
                    ' teacher-comment-big' : '')
                    : ''">{{ite}}</span>
                </div>
            </div>
            <!-- 上课表现 -->
            <div class="module mk-flex-column-center-center">
                <div class="module-title mk-flex-row-start-center">
                    <img class="module-title-icon" src="~assets/images/icn_line.png"/>
                    <span class="module-title-text">上课表现</span>
                </div>
                <div class="graph">
                    <div class="graph-explain mk-flex-row-center-center">
                        <div class="explain-item mk-flex-row-center-center flex-1">
                            <div class="color-tip-round explain-color1"></div>
                            <div>较差</div>
                        </div>
                        <div class="explain-item mk-flex-row-center-center flex-1">
                            <div class="color-tip-round explain-color2"></div>
                            <div>欠佳</div>
                        </div>
                        <div class="explain-item mk-flex-row-center-center flex-1">
                            <div class="color-tip-round explain-color3"></div>
                            <div>合格</div>
                        </div>
                        <div class="explain-item mk-flex-row-center-center flex-1">
                            <div class="color-tip-round explain-color4"></div>
                            <div>良好</div>
                        </div>
                        <div class="explain-item mk-flex-row-center-center flex-1">
                            <div class="color-tip-round explain-color5"></div>
                            <div>优秀</div>
                        </div>
                    </div>
                    <!-- <canvas id="canvas-graph"></canvas> -->
                    <!-- <div id="canvas-graph-text">近{{graphData.length}}节课曲线图</div> -->
                </div>
            </div>
            <!-- 曲谱练习详情 -->
            <div class="module">
                <div>
                    <div class="module-title mk-flex-row-start-center">
                        <img class="module-title-icon" src="~assets/images/icn_lesson.png" />
                        <span class="module-title-text">曲谱练习详情</span>
                    </div>
                    <client-only>
                        <tab-music
                            :isExperience="false"
                            :songInfo="songInfo"
                            :activeObj="{
                                background: 'linear-gradient(135deg, #FD7902, #FD4502)',
                                color: '#ffffff',
                                fontWeight: 700
                            }"
                            :isTeacher="false"
                            @imgClick="musicImgClick"
                            @tabclick="musicTagClick">
                        </tab-music>
                    </client-only>
                    <div class="training-error">
                        <div class="error-tips mk-flex-row-center-center" >
                            <div class="error-tip mk-flex-row-center-center">
                                <div class="color-tip-round error-tip-color1"></div>
                                <div>上次练习</div>
                            </div>
                            <div class="mk-flex-row-center-center">
                                <div class="color-tip-round error-tip-color2"></div>
                                <div>本次练习</div>
                            </div>
                        </div>
                        <div class="training-error-canvas">
                            <canvas id="canvas-drum"></canvas>
                        </div>
                        <div class="training-error-qty" v-show="songInfo[currentMusicTagIndex].issueCount.length > 0">
                            <div class="training-error-qty-title" v-show="songInfo[currentMusicTagIndex].issueCount.length === 2">错误数对比</div>
                            <div class="training-error-qty-title" v-show="songInfo[currentMusicTagIndex].issueCount.length === 1">练习错误数</div>
                            <div class="training-error-qty-info mk-flex-row">
                                <div class="training-error-info-old flex-1 mk-flex-column-center-center" v-show="songInfo[currentMusicTagIndex].issueCount.length === 2">
                                    <div class="training-error-info-number">{{songInfo[currentMusicTagIndex].issueCount[0]}}</div>
                                    <div class="training-error-info-text">上次练习</div>
                                </div>
                                <div class="training-error-info-center flex-1" v-show="songInfo[currentMusicTagIndex].issueCount.length === 2">:</div>
                                <div class="training-error-info-new flex-1 mk-flex-column-center-center">
                                    <div class="training-error-info-number new-color" v-show="songInfo[currentMusicTagIndex].issueCount.length === 2">{{songInfo[currentMusicTagIndex].issueCount[1]}}</div>
                                    <div class="training-error-info-number new-color" v-show="songInfo[currentMusicTagIndex].issueCount.length === 1">{{songInfo[currentMusicTagIndex].issueCount[0]}}</div>
                                    <div class="training-error-info-text new-color">本次练习</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="teacher-opinion">
                    <div class="opinion-title ">
                        <div class="mk-flex-row-center-center">
                            <div class="opinion-title-hr flex-1"></div>
                            <div class="opinion-title-text flex-1">老师指导意见</div>
                            <div class="opinion-title-hr flex-1"></div>
                        </div>
                        <div style="">以下音频来源于老师课中或课后总结</div>
                    </div>
                    <client-only>
                        <progress-bar
                            :percent="percent"
                            :durationText="durationText"
                            :currentTimeText="currentTimeText"
                            @percentChangeEnd="percentChangeEnd"
                            @percentChange="percentChange"
                            :lineProgressColor="'#FD6102'"
                            :lineBgColor="'#F6F6F6'"
                            :borderRadius="6">
                        </progress-bar>
                    </client-only>
                    <div class="opinion-video mk-flex-row-center-center">
                        <div class="opinion-video-item mk-flex-row-center-center" @click="backFive">
                            <img class="video-progress-btn" src="~assets/images/icn_back5.png" />
                        </div>
                        <div class="opinion-video-item mk-flex-row-center-center" @click="audioPlay">
                            <img class="video-play-btn" :src="imgState === 'btn_pause.png' ? audioPause : audioPlayImg" />
                        </div>
                        <div class="opinion-video-item mk-flex-row-center-center" @click="nextFive">
                            <img class="video-progress-btn" src="~assets/images/icn_add5.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import Vue from 'vue'
// import progressBar from '@/components/progress/progressBar.vue'
// import tabMusic from '@/components/tabMusic/tabMusic.vue'
// import preview from '@/components/preview.vue'
// import F2 from '@antv/f2'
// import studentActions from '@/service/student.js'
// import { getqiniuAvinfo } from '@/service/qiniu.js'
// import { wbShowShareImg, showEvaluateTeacher, appSharePostMessage, setEvaluateStatus, documentHiddenProperty } from '@/util/mkAPPWebViewBridge.js'
// import { format } from '@/util/time.js'
// import { Toast } from 'mint-ui'
// import wexinPost from '@/service/config'
// import { wxShare } from '@/util/wxapi'
// import { getIosOrAndroid, dataURL2ObjUrl } from '@/util/base.js'
// import { appClick, reportAudioError } from '@/sensors/track'
// import dialogAlert from '@/components/dialog/miniDialog.vue'
// import detect from './../../assets/bridge/detect'
// import env from './../../api/env'
// import axios from '~plugins/axios.js'
// import serves from '~plugins/serves.js'
// import axios from 'axios'
// console.log('process',process.browser)
let progressBar,
    tabMusic
if (process.browser) {
    // import progressBar from '@/components/progress/progressBar.vue'
    tabMusic = require('@/components/tabMusic/tabMusic.vue').default
    progressBar = require('@/components/progress/progressBar.vue').default
}
export default {
    name: 'report',
    components: {
        'progress-bar': progressBar,
        'tab-music': tabMusic
    },
    async asyncData (context) {
        // console.log('context', context)
        // console.log('dsd',context.app.$apiServer)
        // console.log('process.env.dev', process.env.dev)
        // console.log('process.env.NODE_ENV', process.env.NODE_ENV)
        const { payDetail } = context.app.$apiServer
        // console.log(JSON.stringify(context.app.$apiServer))
        let res = await payDetail({
            classId: 65668460
        })
        
        if (res.data.data.songInfo.length === 0 ) {
            res.data.data.songInfo = [{issues: [], issueCount: []}]
        } else {
            res.data.data.songInfo.forEach((songItem) => {
                if (songItem.recordImgUrls) {
                    songItem.imgUrls = []
                    songItem.previewimgUrls = []
                    songItem.recordImgUrls.forEach((imgItem) => {
                        songItem.imgUrls.push(imgItem.smallUrl)
                        songItem.previewimgUrls.push(imgItem.url)
                    })
                }
            })
        }
        // console.log(res.data.data)
        return res.data.data
    },
    data () {
        // console.log('ss',[document.body])
        return {
            audioPause: require('@/assets/images/btn_pause.png'),
            audioPlayImg: require('@/assets/images/btn_play.png'),
            clientHeight: 1000,
            currentTimeText: '00:00',
            durationText: '00:00',
            percent: 0,
            imgState: 'btn_pause.png',
            baseInfo: {
                studentId: '',
                recordId: 0,
                instrumentName: '',
                classTime: 0,
                classEndTime: 0,
                userNick: '',
                classTimeText: '',
                userHead: '',
                teacherShowName: '',
                teacherHead: '',
                smallUserHead: '',
                smallTeacherHead: '',
                teacherTitleName: '', // 特级老师等级名称
                teacherTitleStyleType: '', // 等级名称样式
                teacherTitleStyle: '#FFFFFF',
                teacherTitleType: '', // 老师等级type
                isShowFixedButton: 0, // 0否 1是
            },
            statisticsInfo: {
                yearLearnSong: 0,
                currentWeekPractice: 0,
                historyWeekMaxPractice: 0,
                cumulativeDuration: 0,
                evaluate: []
            },
            songInfo: [
                {
                    title: '',
                    courseName: '',
                    imgUrls: [], // 缩略图
                    previewimgUrls: [], // 预览图
                    issueCount: [],
                    issues: [],
                    recordImgUrls: [] // 接口原数据
                }
            ],
            currentMusicTagIndex: 0
        }
    },
    computed: {
        isTeacherApp (params) {
            return  1 !== 1
        }
    },
    mounted () {
        console.log('mounted', window.innerHeight)
        this.clientHeight = window.innerHeight
    },
    methods: {
        imageError (e, attr) {
            e.target.src = 'https://statics.pnlyy.com/mini_guarder_ic_moren@2x.png'
            if (attr) {
                this.baseInfo.smallUserHead = 'https://statics.pnlyy.com/mini_guarder_ic_moren@2x.png'
            }
        },
        createShareReport () {

        },
         // 曲谱练习详情 点击图片事件
        musicImgClick (e) {
            this.currentMusicImgIndex = Number(e.target.dataset.index)
            localStorage.setItem('preViewImgInfo', JSON.stringify({images: this.previewimgUrls, currentMusicImgIndex: this.currentMusicImgIndex, currentMusicTagIndex: this.currentMusicTagIndex}))
            if (this.imgState === 'btn_play.png') {
                this.isShowMusicImg = true
            }
            this.$router.push({ path: 'preview-img' })
        },
        // 曲谱练习详情 点击曲目事件
        musicTagClick (e) {
            if (Number(e.target.dataset.index) !== this.currentMusicTagIndex) {
                this.isShowDrum = false
                this.currentMusicTagIndex = Number(e.target.dataset.index)
            }
        },
        backFive () {
            this.$backgroundAudioElement.backFive()
        },
        nextFive () {
            this.$backgroundAudioElement.nextFive()
        },
        audioPlay () {
            if (this.imgState === 'btn_play.png') {
                this.imgState = 'btn_pause.png'
                this.pause()
            } else {
                this.imgState = 'btn_play.png'
                this.play()
            }
        },
        play () {
            this.audioStatus = 'play'
            this.$backgroundAudioElement.play()
        },
        pause () {
            this.audioStatus = 'pause'
            this.$backgroundAudioElement.pause()
        },
        format (time) {
            let min, sec;
            let roundTime = Math.round(time)
            let currentSecond = Math.round(time - Math.floor(time / 60) * 60)
            min = this.padStartZero(Math.floor(roundTime / 60));
            sec = this.padStartZero(currentSecond === 60 ? 0 : currentSecond);
            return min + ':' +sec;
        },
        padStartZero (num) {
            return num <10 ?'0' + num :num
        },
        percentChangeEnd (percent) {
            if (!this.duration) {
                this.audioPlay()
                return
            }
            this.currentTime = this.duration * percent
            this.currentTimeText = this.format(this.currentTime)
            this.$backgroundAudioElement.setCurrentTime(this.currentTime)
            if (this.imgState === 'btn_pause.png') this.audioPlay()
            // 拖动到最后直接暂停
            if (this.currentTime === this.duration) {
                this.imgState ='btn_pause.png'
            }
        },
        percentChange (percent) {
            if (!this.duration) {
                this.audioPlay()
                return
            }
            this.currentTime = this.duration * percent
            this.currentTimeText = this.format(this.currentTime)
        },
        updateTime (e) {
            this.currentTime = e.currentTime
            this.percent = e.percent
            this.currentTimeText = e.currentTimeText
        },
        _durationTime (e) {
            this.duration = e.duration
            this.durationText = e.durationText
        }
    }
} 
</script>

<style lang="less">
    .head-url {
        .px2rem(width, 108);
        .px2rem(height, 108);
        border-radius: 50%;
        flex: none;
    }
    .head-url-default {
        background: url('https://statics.pnlyy.com/mini_guarder_ic_moren@2x.png') center center no-repeat;
        .px2rem(background-size, 108);
    }
    .color-tip-round {
        .px2rem(width, 14);
        .px2rem(height, 14);
        border-radius: 50%;
        .px2rem(margin-right, 10)
    }
    .main {
        width: 100%;
        .px2rem(padding-top, 15);
        .px2rem(padding-bottom, 30);
        position: relative;
        .main-background {
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            background: @linear-gradient;
            z-index: -1;
        }
        .module {
            border: 1px solid #ffffff;
            .px2rem(margin-right, 30);
            .px2rem(margin-bottom, 30);
           .px2rem(margin-left, 30);
            background-color: #ffffff;
            .px2rem(border-radius, 26);
            position: relative;
            box-shadow:0px 14px 44px 0px rgba(0,0,0,0.1);
            .page-horn {
                position: absolute;
                .px2rem(top, -2);
                .px2rem(left, -5);
                display: inline-block;
                width: 0;
                height: 0;
                .px2rem(margin-left, 2);
                vertical-align: middle;
                .px2rem(border-top-width, 44);
                border-top-style: solid;
                border-top-color: #FD7802;
                .px2rem(border-left-width, 44);
                border-left-style: solid;
                border-left-color: #FD7802;
                .px2rem(border-right-width, 44);
                border-right-style: solid;
                border-right-color: #ffffff; 
                .px2rem(border-bottom-width, 44);
                border-bottom-style: solid;
                border-bottom-color: #ffffff;
                .px2rem(border-bottom-right-radius, 26);
                box-shadow: 18px 18px 58px -10px rgba(0,0,0,0.1);
            }
            // .page-horn-img {
            //     width: 58px;
            //     height: 58px;
            // }
            .module-title {
                width: 100%;
                .px2rem(padding-top, 40);
                .px2rem(padding-left, 30);
                .module-title-icon {
                    .px2rem(width, 40);
                    .px2rem(height, 40);
                    .px2rem(margin-right, 10);
                }
                .module-title-text {
                    .px2rem(font-size, 30);
                    // font-family: PingFangSC-Semibold;
                    font-weight: 700;
                    color: @mainFontColor;
                }
            }
            .graph {
                .px2rem(width, 630);
                .px2rem(margin-top, 40);
                .px2rem(margin-right, 30);
                .px2rem(margin-bottom, 30);
                .px2rem(margin-left, 30);
                background-color: #F9F9F9;
                .px2rem(border-radius, 10);
                .graph-explain {
                    .px2rem(margin-top, 36);
                    .px2rem(margin-right, 30);
                    .px2rem(margin-bottom, 30);
                    .px2rem(margin-left, 30);
                    .explain-item {
                        flex: 1;
                        .px2rem(font-size, 22);
                        // font-family: PingFangSC-Regular;
                        color: #9B9B9B;
                        .explain-color1 {
                            background-color: #CBCBCB;
                        }
                        .explain-color2 {
                            background-color: @mainColor;
                        }
                        .explain-color3 {
                            background-color: #FFBC00;
                        }
                        .explain-color4 {
                            background-color: #0097FF;
                        }
                        .explain-color5 {
                            background-color: #2ABC6F;
                        }
                    }
                }
                #canvas-graph {
                    width: 100%;
                    .px2rem(margin-bottom, 30);
                }
                #canvas-graph-text {
                    .px2rem(font-size, 20);
                    // font-family: PingFangSC-Regular;
                    color: #D3D3D3;
                    text-align: center;
                    .px2rem(margin-bottom, 22);
                }
            }
            .training-error {
                .px2rem(margin-top, 30);
                .px2rem(margin-right, 30);
                .px2rem(margin-left, 30);
                .px2rem(padding-right, 30);
                .px2rem(padding-left, 30);
                background-color: #F9F9F9;
                .px2rem(border-radius, 10);
                .error-tips {
                    .px2rem(font-size, 22);
                    // font-family: PingFangSC-Regular;
                    color: #9B9B9B;
                    .px2rem(padding-top, 42);
                    .px2rem(padding-bottom, 22);
                    .error-tip {
                        .px2rem(margin-right, 56);
                    }
                    .error-tip-color1 {
                        background-color: #CBCBCB;
                    }
                    .error-tip-color2 {
                        background-color: @mainColor;
                    }
                }
                .training-error-canvas {
                    .px2rem(height, 428);
                    border-bottom: 1px solid #E9E9E9;
                }
                .training-error-qty {
                    color: @mainFontColor;
                    .training-error-qty-title {
                        .px2rem(margin-top, 26);
                        text-align: center;
                        .px2rem(font-size, 24);
                        // font-family: PingFangSC-Semibold;
                        font-weight: 700;
                        color: @mainFontColor;
                    }
                    .training-error-qty-info {
                        .px2rem(padding-top, 30);
                        .px2rem(padding-bottom, 52);
                        .training-error-info-old {
                            flex: 1;
                        }
                        .training-error-info-center {
                            text-align: center;
                            flex: 1;
                            font-weight: 700;
                            .px2rem(line-height, 56);
                            .px2rem(font-size, 56);
                        }
                        .training-error-info-new {
                            flex: 1;
                        }
                        .training-error-info-number {
                            .px2rem(font-size, 56);
                            font-family: @numberFont;
                            font-weight: 700;
                        }
                        .training-error-info-text {
                            .px2rem(font-size, 20);
                            // font-family: PingFangSC-Regular;
                        }
                        .new-color {
                            color: #FD5E02;
                        }
                    }
                }
            }
            .teacher-opinion {
                .px2rem(margin-right, 30);
                .px2rem(margin-left, 30);
                .opinion-title {
                    .px2rem(margin-top, 60);
                    .px2rem(margin-bottom, 60);
                    .px2rem(font-size, 22);
                    color: #9B9B9B;
                    div {
                        flex: 1;
                        text-align: center;
                    }
                    .opinion-title-hr {
                        .px2rem(height, 2);
                        background-color: #E1E1E1;
                        // border-bottom: 1px solid #E1E1E1;
                    }
                    .opinion-title-text {
                        .px2rem(font-size, 26);
                        // font-family: PingFangSC-Medium;
                        font-weight: 500;
                        color: #9B9B9B;
                    }
                }
                .opinion-video {
                    .px2rem(margin-top, 40);
                    .px2rem(margin-right, 30);
                    .px2rem(margin-bottom, 50);
                    .px2rem(margin-left, 30);
                    .opinion-video-item {
                        flex: 1;
                        .video-progress-btn {
                            .px2rem(width, 72);
                            .px2rem(height, 72);
                        }
                        .video-play-btn {
                            .px2rem(width, 112);
                            .px2rem(height, 112);
                        }
                    }
                }
            }
            .music-title {
                .px2rem(margin-right, 30);
                .px2rem(margin-left, 30);
                .px2rem(padding-top, 24);
                .px2rem(padding-bottom, 28);
                .px2rem(font-size, 28);
                // font-family: PingFangSC-Semibold;
                font-weight: 700;
                color: @mainFontColor;
            }
            .module-banner {
                position: absolute;
                .px2rem(top, -8);
                .px2rem(right, 24);
                .px2rem(width, 152);
                .px2rem(height, 152);
            }
            .class-info {
                .px2rem(margin-top, 100);
                .px2rem(margin-right, 60);
                .px2rem(margin-left, 60);
                img {
                    border: 2px solid #F6F6F6;
                }
                .class-text {
                    .px2rem(padding-left, 24);
                    overflow: hidden;
                    .class-name {
                        .px2rem(font-size, 32);
                        // font-family: PingFangSC-Semibold;
                        font-weight: 700;
                        color: @mainFontColor;
                        .px2rem(line-height, 44);
                        .class-user-name {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            word-break: break-all;
                        }
                        .class-span {
                            font-weight: 400;
                            color: #E9E9E9;
                            .px2rem(margin-right, 12);
                            .px2rem(margin-left, 12);
                            flex: none;
                        }
                        .class-instrument-name {
                            white-space: nowrap;
                            flex: none;
                        }
                    }
                    .class-time {
                        .px2rem(font-size, 26);
                        color: @mainFontColor;
                        opacity: 0.6;
                    }
                }
            }
            .music-sum {
                .px2rem(margin-top, 60);
                .px2rem(margin-right, 60);
                .px2rem(margin-left, 60);
                .px2rem(padding-top, 60);
                position: relative;
                .music-sum-qty {
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    .px2rem(height, 122);
                    .px2rem(font-size, 100);
                    font-family: @numberFont;
                    color: @mainFontColor;
                    .px2rem(line-height, 126);
                }
            }
            .study-time {
                .px2rem(margin-top, 40);
                .px2rem(margin-right, 60);
                .px2rem(margin-left, 60);
                position: relative;
                .study-time-font {
                    width: 100%;
                    position: absolute;
                    .px2rem(top, -13);
                    left: 0px;
                    .px2rem(height, 70);
                    .px2rem(font-size, 58);
                    color: @mainFontColor;
                    .px2rem(line-height, 72);
                    font-weight: 700;
                    .study-time-qty {
                        font-family: @numberFont;
                        flex: 1;
                        .study-time-qty-new {
                            .px2rem(height, 28);
                        }
                    }
                    .study-time-time {
                        font-family: @numberFont;
                        flex: 1;
                    }
                }
            }
            .teacher-comment {
                .px2rem(margin-top, 60);
                .px2rem(margin-right, 60);
                .px2rem(margin-bottom, 40);
                .px2rem(margin-left, 60);
                .px2rem(padding-top, 16);
                .px2rem(padding-right, 24);
                .px2rem(padding-bottom, 30);
                .px2rem(padding-left, 24);
                .px2rem(font-size, 28);
                font-family: PingFangSC-Regular;
                color: #9B9B9B;
                .px2rem(line-height, 48);
                background-color: #F9F9F9;
                .px2rem(border-radius, 10);
                .teacher-comment-blod {
                    font-weight: bold;
                    color: @mainFontColor;
                }
                .teacher-comment-big {
                    font-family: @numberFont;
                    .px2rem(font-size, 40);
                }
            }
        }
        .module:last-child {
            margin-bottom: 0px;
        }
        hr {
            border: 1px solid #f6f6f6;
            .px2rem(border-top-width, 1);
            .px2rem(border-right-width, 1);
            .px2rem(border-bottom-width, 1);
            .px2rem(border-left-width, 1);
            .px2rem(margin-block-end, 8.5);
            .px2rem(margin-block-start, 2);
        }
        .music-sum-text {
            .px2rem(font-size, 22);
            font-family: PingFangSC-Regular;
            color: #9B9B9B;
            span {
                flex: 1;
            }
        }
    }
</style>
