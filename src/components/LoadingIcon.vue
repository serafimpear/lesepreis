<template>
    <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<style scoped>
.lds-ring {
    display: inline-block;
    position: relative;
    width: 1.2em;
    height: 1.2em;
    margin: 0 0 -0.2em 0.3em;
}

.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 0.9em;
    height: 0.9em;
    margin: 0.15em;
    border: 0.1em solid #000;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #000 transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}

@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}</style>