<template>
    <section>
        <p class="title is-4">HMR<sup>(Hot Module Replacement)</sup></p>
        <div class="content">You can make changes to the text above on the fly, and the count will not change</div>
        <div class="example">
            <p>The Count Is: {{ count }}</p>
            <p>
                <button class="button" @click="count += 1">Increment</button>
            </p>
        </div>
        <hr class="is-medium">
    </section>
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