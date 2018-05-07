<template>
    <div>
        <h2>The Count Is: {{ count }}</h2>
        <small>HMR: Hot Module Replacement</small>
        <small>You can make changes to the text above on the fly, and the count will not change</small>
        <p>
            <button @click="count += 1">Increment</button>
        </p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                count: 0
            }
        }
    }
</script>

<style>

</style>