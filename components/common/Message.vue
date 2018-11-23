<template>
	<div>
		<notifications group="auth" position="center" />
		<notifications group="app" position="top right" />
	</div>
</template>

<script>
	export default {
		name: 'Message'
	}
</script>

<style>
	.notifications {
        display: block;
        position: fixed;
        z-index: 5000
    }

    .notification-wrapper {
        display: block;
        overflow: hidden;
        width: 100%;
        margin: 0;
        padding: 0
    }

    .notification {
        display: block;
        box-sizing: border-box;
        background: #fff;
        text-align: left
    }

    .notification-title {
        font-weight: 600
    }

    .vue-notification {
        font-size: 12px;
        padding: 10px;
        margin: 0 5px 5px;
        color: #fff;
        background: #44a4fc;
        border-left: 5px solid #187fe7
    }

    .vue-notification.warn {
        background: #ffb648;
        border-left-color: #f48a06
    }

    .vue-notification.error {
        background: #e54d42;
        border-left-color: #b82e24
    }

    .vue-notification.success {
        background: #68cd86;
        border-left-color: #42a85f
    }

    .vn-fade-enter-active,.vn-fade-leave-active,.vn-fade-move {
        transition: all .5s
    }

    .vn-fade-enter,.vn-fade-leave-to {
        opacity: 0
    }
</style>