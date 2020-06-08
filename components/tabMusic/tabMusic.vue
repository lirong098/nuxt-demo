<template>
    <div class="tab-music" v-if="this.songs.length > 0">
        <div class="tab-music-tabs" :class="!isExperience ? 'tab-music-tabs-border' : ''">
            <div class="tab-music-tabs-scroll" v-if="isExperience">
                <div
                    class="tab-music-tab-experience"
                    :style="(id === index) ? activeObj: ''"
                    @click="tabClick"
                    :data-index="index"
                    v-for="(item,index) in songInfo"
                    :key="index"
                >
                    {{item.title}}
                    <i class="tab-music-tab-experience-hr" :class="(id === index) ? 'active': ''"></i>
                    <i class="tab-music-tab-experience-hr-bottom" :class="(id === index) ? 'active': ''"></i>
                </div>
            </div>
            <div class="tab-music-tabs-scroll" v-else>
                <div
                    :class="isPad ? 'tab-music-tab-pad' : 'tab-music-tab'"
                    :style="(id === index) ? activeObj: ''"
                    @click="tabClick"
                    :data-index="index"
                    v-for="(item,index) in songs"
                    :key="index"
                >{{item.title}}</div>
            </div>
        </div>
        <i class="tab-music-hr" :class="isPad ? 'tab-music-hr-pad' : ''" v-if="!isExperience"></i>
        <div class="tab-music-detail">
            <div class="tab-music-detail-title" :class="isExperience ? 'active' : isPad ? 'tab-music-detail-title-pad' : ''">{{songs[id].courseName}}</div>
            <div class="tab-music-detail-imgs" :class="isPad ? 'tab-music-detail-imgs-pad' : ''">
                <div class="tab-music-detail-main" :class="isPad ? 'tab-music-detail-main-pad' : ''" v-for="(item, index) in songs[id].imgUrls" :key="index">
                    <img
                    v-show="item.isShow"
                    class="tab-music-detail-img"
                    :data-index="index"
                    @click="imgClick"
                    :src="item.url"
                    @error="errorEvent"
                    >
                    <img
                    v-if="isTeacher"
                    :data-index="index"
                    @click="deleteImg"
                    class="tab-music-detail-close"
                    src="./images/icon_delect@2x.png"
                    alt
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @baseFontSize: 75;//基于视觉稿横屏尺寸/100得出的基准font-size
    .px2rem(@name, @px){
        @{name}: @px / @baseFontSize * 1rem;
    }
    .tab-music {
        width: 100%;
        .px2rem(padding-right, 30);
        .px2rem(padding-left, 30);
    }
    .tab-music-tabs {
        .px2rem(padding-top, 30);
        .px2rem(padding-bottom, 30);
        overflow-x: auto;
    }
    .tab-music-tabs-border {
        border-bottom: 1px solid rgba(246, 246, 246, 0.5);
        .px2rem(border-bottom-width, 1);
    }
    .tab-music-tabs-scroll {
        width: 100%;
        white-space: nowrap;
        ::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
        ::-webkit-scrollbar-thumb {
            background: #ffffff;
        }
        ::-webkit-scrollbar-track {
            background: #ffffff;
        }
    }
    .tab-music-tab {
        display: inline-block;
        .px2rem(width, 130);
        .px2rem(font-size, 28);
        color: #9b9b9b;
        background: #f6f6f6;
        .px2rem(padding-top, 16);
        .px2rem(padding-bottom, 16);
        text-align: center;
        .px2rem(border-radius, 6);
        .px2rem(margin-right, 30);
    }
    .tab-music-tab-pad {
        display: inline-block;
        .px2rem(width, 65);
        .px2rem(height, 32);
        .px2rem(line-height, 32);
        .px2rem(font-size, 15);
        color: #9b9b9b;
        background: #f6f6f6;
        text-align: center;
        .px2rem(border-radius, 3);
        .px2rem(margin-right, 25);
        .px2rem(margin-top, 3);
    }
    .tab-music-tab-experience {
        display: inline-block;
        .px2rem(width, 74);
        .px2rem(font-size, 28);
        color: #866759;
        .px2rem(margin-right, 60);
        z-index: 2;
        font-weight: normal;
    }
    .tab-music-tab:last-child,
    .tab-music-tab-experience:last-child {
        margin-right: 0px;
    }
    .tab-music-tab-experience-hr.active{
        display: block;
        width: 100%;
        .px2rem(height, 4);
        background: #81685B;
        .px2rem(margin-top, 2);
    }
    .tab-music-tab-experience-hr-bottom.active{
        display: block;
        width: 100%;
        .px2rem(height, 2);
        background: #81685B;
        .px2rem(margin-top, 2);
    }
    .tab-music-hr {
        display: block;
        width: 100%;
        .px2rem(height, 1);
        background: #f6f6f6;
        .px2rem(margin-bottom, 24);
    }
    .tab-music-hr-pad {
        .px2rem(margin-bottom, 18);
    }
    .tab-music-detail{
        .px2rem(margin-top, 10);
    }
    .tab-music-detail-title {
        color: #4a4a4a;
        .px2rem(font-size, 28);
        font-weight: 700;
        .px2rem(line-height,40);
    }
    .tab-music-detail-title-pad {
        .px2rem(font-size, 19);
        .px2rem(line-height, 19);
    }
    .tab-music-detail-title.active{
        color: #866759;
    }
    .tab-music-detail-imgs {
        .px2rem(margin-top, 12);
        overflow-x: auto;
        overflow-y: hidden;
        .px2rem(padding-top, 15);
        white-space: nowrap;
    }
    .tab-music-detail-imgs-pad {
        margin-top: 0px;
    }
    .tab-music-detail-main {
        display: inline-block;
        position: relative;
        .px2rem(width, 160);
        .px2rem(height, 160);
        .px2rem(border-radius, 8);
        border: 1px solid #e9e9e9;
        .px2rem(border-top-width, 1);
        .px2rem(border-right-width, 1);
        .px2rem(border-bottom-width, 1);
        .px2rem(border-left-width, 1);
        box-sizing: border-box;
        .px2rem(margin-right, 16);
        background: url('./images/img_music_default@2x.png') no-repeat;
        background-size: contain;
        .px2rem(padding, 2);
        img {
            .px2rem(border-radius, 8);
        }
    }
    .tab-music-detail-main-pad {
        .px2rem(width, 120);
        .px2rem(height, 120);
        .px2rem(margin-right, 12);
    }
    .tab-music-detail-close {
        position: absolute;
        .px2rem(width, 32);
        .px2rem(height, 32);
        .px2rem(top, -16);
        .px2rem(right, -16);
    }
    .tab-music-detail-img {
        width: 99%;
        height: 99%;
        .px2rem(border-radius, 8);
    }
    .tab-music-detail-main:last-child {
        margin-right: 0;
    }
    @media screen and (min-width: 767px){
    @baseFontSize: 76.8;//基于视觉稿横屏尺寸/100得出的基准font-size
    .px2rem(@name, @px){
        @{name}: @px / @baseFontSize * 1rem;
    }
    .tab-music-detail-title {
        .px2rem(font-size,23);
        .px2rem(line-height,30);
    }

    .tab-music-tab-experience{
        .px2rem(font-size,23);
        .px2rem(width,60);
        .px2rem(margin-right,49);
    }
    .tab-music-detail-main {
        .px2rem(width,97);
        .px2rem(height,97);
        .px2rem(border-radius,8);
        .px2rem(margin-right,16);
        .px2rem(padding,2);
        img {
            .px2rem(border-radius,8);
        }
    }
}
</style>
<script>
export default {
    props: {
        songInfo: {
            type: Array,
            default() {
                return [];
            }
        },
        isExperience: {
            type: Boolean,
            default() {
                return false;
            }
        },
        isTeacher: {
            type: Boolean,
            default() {
                return false;
            }
        },
        isPad: {
            type: Boolean,
            default() {
                return false;
            }
        },
        activeObj: {
            type: Object,
            default() {
                return {
                    background: "transparent",
                    color: "#866759",
                    fontWeight: 700
                };
            }
        }
    },
    data() {
        return {
            id: 0,
            songs: []
        };
    },
    mounted() {
        let songInfo = this.songInfo;
        let songArr = []
        songInfo.forEach(v => {
            let imgUrls = v.imgUrls;
            let result = []
            imgUrls.forEach(i => {
                let imgObj = {
                    url: i,
                    isShow: true
                }
                result.push(imgObj)
            })
            let obj = {
                title: v.title,
                courseName: v.courseName,
                imgUrls: result
            }
            songArr.push(obj)
        })
        this.songs = songArr
    },
    methods: {
        tabClick(e) {
            this.id = Number(e.target.dataset.index);
            this.$emit("tabclick", e);
        },
        imgClick(e) {
            this.$emit("imgClick", e);
        },
        deleteImg(e) {
            let index = e.target.dataset.index;
            this.songs[this.id].imgUrls.splice(index, 1);
            this.$emit("deleteImg", this.songs);
        },
        errorEvent(e) {
            let index = e.currentTarget.dataset.index;
            this.songs[this.id].imgUrls[index].isShow = false
        }
    },
    watch: {
        songInfo(newVal) {
            let songInfo = newVal;
            let songArr = []
            songInfo.forEach(v => {
                let imgUrls = v.imgUrls;
                let result = []
                imgUrls.forEach(i => {
                    let imgObj = {
                        url: i,
                        isShow: true
                    }
                    result.push(imgObj)
                })
                let obj = {
                    title: v.title,
                    courseName: v.courseName,
                    imgUrls: result
                }
                songArr.push(obj)
            })
            this.songs = songArr
        }

    }
};
</script>
