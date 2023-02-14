<template>
	<view><web-view :webview-styles="webviewStyles" :src="pathUrl"></web-view></view>
</template>

<script>
export default {
	data() {
		return {
			pathUrl: 'https://www.baidu.com',
			webviewStyles: {
				progress: {
					color: '#FF3333'
				}
			}
		};
	},
	methods: {}
};
</script>

<style></style>
