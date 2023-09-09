<template>
    <div v-show="show" class="popover" :style="positionInlineStyle">
        {{ txt }}
    </div>
</template>
  
<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
            show: false,
            txt: '',
            posX: 0,
            posY: 0,
            popovers: []
        }
    },
    methods: {
        init() {
            this.removeListeners();
            this.popovers = this.$parent.$el.querySelectorAll('[data-popover]');

            this.popovers.forEach(popover => {
                popover.addEventListener("mousemove", this.setPopoverData);
                popover.addEventListener("mouseleave", this.clearData);
            });

        },
        removeListeners() {
            this.popovers.forEach(popover => {
                popover.removeEventListener("mousemove", this.setPopoverData);
                popover.removeEventListener("mouseleave", this.clearData);
            });
            this.popovers = [];
        },
        setPopoverData(e) {
            this.show = true;
            this.txt = e.target.getAttribute('data-popover');
            this.posX = e.x - 10;
            this.posY = e.y + 30;
        },
        clearData() {
            this.show = false;
            this.txt = '';
            this.posX = 0;
            this.posY = 0;
        }
    },
    computed: {
        positionInlineStyle() {
            return `left: ${this.posX}px; top: ${this.posY}px`;
        }
    },
    mounted() {
        console.log('mounted');
        this.init();
    }
}
</script>
  
<style scoped>
.popover {
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    position: absolute;
    padding: 10px;
    z-index: 9999;
}

.popover::before {
    content: '';
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #ccc;
    position: absolute;
    top: 0;
    left: 10px;
    transform: translateY(-100%);
    z-index: 9999;
}
</style>