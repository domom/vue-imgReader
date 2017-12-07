<template lang="html">
	<div class="vue-imgReader" @click.stop="close">
		<!-- <img :src="realSrc" alt="" ref="img" :class="{aspectFillX: fillX,aspectFillY:fillY,aspectFillXY:fillXY}" @click.stop @load="imageCenter($event.target)"> -->
		<img src="./loading.gif" alt="" ref="img" :class="{aspectFillX: fillX,aspectFillY:fillY,aspectFillXY:fillXY,normal:isNormal}" @click.stop @load="imageCenter($event.target)">
	</div>
</template>
<script>
export default {
	data() {
			return {
				fillX: false,
				fillY: false,
				fillXY: false,
				isNormal: false,
				realSrc: './loading.gif',
				isFirstLoading: true
			}
		},
		methods: {
			close() {
				window.removeEventListener("resize", this.imageCenter);
				this.$emit('close');
			},
			imageCenter(img) {
				//console.log(44444)
				if (!img) {
					img = this.$refs.img;
				}
				// if(this.isFirstLoading){
				// 	this.isFirstLoading = false;
				// 	return
				// }
				img = this.$refs.img;
				const screenWidth = document.body.clientWidth; //可视区域高度
				const screenHeight = document.body.clientHeight; //可视区域宽度
				const imgHeight = img.naturalHeight; //图片真实高度
				const imgWidth = img.naturalWidth; //图片真实宽度
				const imgRate = imgWidth / imgHeight;
				const rate = (imgWidth * screenHeight) / (screenWidth * imgHeight); //图片宽高和屏幕宽高比
				const isBigImg = imgWidth >= screenWidth || imgHeight >= screenHeight; //判断图片是否超过屏幕大小
				/*
				 *rate > 1 图片相对屏幕偏宽
				 *rate = 1 图片相对屏幕宽高比相等
				 *rate < 1 图片相对屏幕偏高
				 */
				//console.log(screenWidth, screenHeight, imgHeight, imgWidth);
				if (isBigImg && rate > 1) {
					//console.log(111)
					this.fillX = true;
					this.fillY = false;
					this.fillXY = false;
					this.isNormal = false;
				} else if (isBigImg && rate < 1) {
					//console.log(22221)
					this.fillX = false;
					this.fillY = true;
					this.fillXY = false;
					this.isNormal = false;
				} else if (isBigImg && rate == 1) {
					this.fillX = false;
					this.fillY = false;
					this.fillXY = true;
					this.isNormal = false;
				} else {
					this.fillX = false;
					this.fillY = false;
					this.fillXY = false;
					this.isNormal = true;
				}
				window.removeEventListener("resize", this.imageCenter);
				window.addEventListener("resize", this.imageCenter, false);
			},
		},
		mounted() {
			let oImg = new Image();
			oImg.src = this.src;
			let _this = this;
			oImg.onload = function() {
				//_this.$refs.img.src = _this.src;
				_this.$refs.img.src = this.src;
				this.onload = null;
				oImg = null;
			}
		},
		// mounted() {
		//
		// },
		props: {
			src: {
				type: String,
				default: ""
			}
		}
}

</script>
<style lang="css" scoped>
.vue-imgReader {
	position: fixed;
	z-index: 9999;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.4);
	overflow: hidden;
}

.vue-imgReader img {
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	width: 40px;
	height: 40px;
	transition: all 0.2s;
}

.vue-imgReader img.aspectFillX {
	width: 100%;
	height: auto;
}

.vue-imgReader img.aspectFillY {
	width: auto;
	height: 100%;
}

.vue-imgReader img.aspectFillXY {
	width: 80%;
	height: auto;
}

.vue-imgReader img.normal {
	width: auto;
	height: auto;
}

</style>

