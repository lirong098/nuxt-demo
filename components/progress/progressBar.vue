<template>
    <article style="width:100%;">
        <div class="progress-bar" ref="progressBar" @click="progressClick">
            <div class="bar-inner" :style="{backgroundColor:lineBgColor,borderRadius:borderRadius+'px'}">
                <div class="progress" ref="progress" :style="{backgroundColor:lineProgressColor}"></div>
                <div class="progress-btn-wrapper mk-flex-column-center-center" ref="progressBtn" @touchstart.prevent="progressTouchStart" @touchmove.prevent="progressTouchMove" @touchend.prevent="progressTouchEnd">
                    <div v-if="!hiddenDefaultBtn"  id="progress-btn" class="progress-btn-default" :style="{backgroundColor: lineProgressColor}">
                        {{playtime}}
                    </div>
                    <slot name="progressBotton"></slot>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
import {
    prefixStyle
} from './dom'
// const progressBtnWidth = parseInt(document.documentElement.style.fontSize)
let progressBtnWidth = 0
const transform = prefixStyle('transform')

export default {
    data() {
        return {
            newPercent: 0
        }
    },
    computed: {
        playtime(){
            return this.currentTimeText!=='' ? `${this.currentTimeText}/${this.durationText}` : ''
        }
    },
    props: {
        percent: {
            type: Number,
            default:0
        },
        durationText:{
            type: String,
            default: '00:00'
        },
        currentTimeText:{
            type: String,
            default: '00:00'
        },
        lineBgColor: {
            type: String,
            default:'#E8E1D8'
        },
        lineProgressColor: {
            type: String,
            default:'#866759'
        },
        borderRadius:{
            type: Number,
            default: 0
        },
        hiddenDefaultBtn: {
            type: Boolean,
            value: false
        }
    },
    created() {
        this.touch = {}
    },
    mounted() {
        this.$nextTick(() => {
            progressBtnWidth = document.getElementById('progress-btn').offsetWidth
        })
    },
    methods: {
        progressClick(e) {
            const rect = this.$refs.progressBar.getBoundingClientRect()
            // rect.left 元素距离左边的距离
            // e.pageX 点击距离左边的距离
            let offsetWidth = e.pageX - rect.left
            const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
            if (offsetWidth > barWidth) {
                offsetWidth = barWidth
            }
            this._offset(offsetWidth)
            const percent = offsetWidth / barWidth
            this.$emit('percentChangeEnd', percent)

        },
        progressTouchStart(e) {
            // console.log('Start', e)
            this.touch.initiated = true
            this.touch.startX = e.touches[0].pageX
            this.touch.left = this.$refs.progress.clientWidth
        },
        progressTouchMove(e) {
            // console.log('Move', e)
            if (!this.touch.initiated) {
                return
            }
            this._triggerPercent()
            const deltaX = e.touches[0].pageX - this.touch.startX
            const offsetWidth = Math.min(Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX)))
            this._offset(offsetWidth)
        },
        progressTouchEnd () {
            // console.log('End', e)
            this.touch.initiated = false
            const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
            const percent = this.$refs.progress.clientWidth / barWidth
            this.$emit('percentChangeEnd', percent)
        },
        _triggerPercent() {
            const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
            const percent = this.$refs.progress.clientWidth / barWidth
            // console.log('_triggerPercent', percent, this.$refs.progress.clientWidth + '/' + barWidth)
            this.$emit('percentChange', percent)
        },
        _offset(offsetWidth) {
            this.$refs.progress.style.width = `${offsetWidth}px`
            this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth - 2}px, 0, 0)`
        }
    },
    watch: {
        percent(newPercent) {
            if (newPercent >= 0 && !this.touch.initiated) {
                const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
                const offsetWidth = newPercent * barWidth
                this._offset(offsetWidth)
            }
        },
        durationText (newValue) {
            if (newValue.indexOf('N') > -1) {
                this.durationText = '00:00'
            }
        },
        currentTimeText (newValue) {
            if (newValue.indexOf('N') > -1) {
                this.currentTimeText = '00:00'
            }
        }
    }
}
</script>

<style scoped lang="less">
@baseFontSize: 75;//基于视觉稿横屏尺寸/100得出的基准font-size
.px2rem(@name, @px){
    @{name}: @px / @baseFontSize * 1rem;
}
.progress-bar {
    .px2rem(height, 32);
    display: flex;
    flex-flow: column;
    justify-content: center;
    position: relative;
    .bar-inner {
        .px2rem(height, 8);
        background-color: #F6F6F6;
        .px2rem(border-radius, 6);
        .progress {
            height:100%;
            width: 0px;
            background: #FD4502;
            .px2rem(border-radius, 6);
        }
        .progress-btn-wrapper {
            position: absolute;
            left: 0;
            top: 0;
            .progress-btn-default {
                box-sizing: border-box;
                box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.4);
                .px2rem(border-radius, 20);
                .px2rem(padding-top, 2);
                .px2rem(padding-bottom, 2);
                .px2rem(padding-right, 12);
                .px2rem(padding-left, 12);
                color: #ffffff;
                .px2rem(font-size, 18);
                .px2rem(min-width, 27);
                .px2rem(min-height, 27);
            }
        }
    }
}
</style>
