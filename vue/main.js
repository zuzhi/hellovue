// message
Vue.component('message', {

    props: ['title', 'body'],

    data() {
        return {
            isVisible: true
        }
    },

    template: `
        <article class="message" v-show="isVisible">
            <div class="message-header">
                {{ title }}
                <button class="delete" @click="isVisible = false"></button>
            </div>
            <div class="message-body">
                {{ body }}
            </div>
        </article>
    `

})


// modal
Vue.component('modal', {

    template: `
        <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <slot></slot>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
        </div>
    `

})

// tabs
Vue.component('tabs', {

    template: `
        <div>
            <div class="tabs">
                <ul>
                    <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
                        <a :href="tab.href" @click="selectedTab(tab)">{{ tab.name }}</a>
                    </li>
                </ul>
            </div>

            <div class="tabs-details">
                <slot></slot>
            </div>
        </div>
    `,
    data() {
        return {
            tabs: []
        }
    },
    created() {
        this.tabs = this.$children
    },
    methods: {
        selectedTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.name == selectedTab.name)
            })
        }
    }

})

// tab
Vue.component('tab', {

    template: `
        <div v-show="isActive"><slot></slot></div>
    `,
    props: {
        name: { required: true },
        selected: { default: false }
    },
    data() {
        return {
            isActive: false
        }
    },
    computed: {
        href() {
            return '#' + this.name.toLowerCase().replace(/ /g, '-')
        }
    },
    mounted() {
        this.isActive = this.selected
    }

})


// coupon
Vue.component('coupon', {

    template: `
        <input type="text" placeholder="Enter your coupon code" @blur="onCouponApplied" />
    `,
    methods: {
        onCouponApplied() {
            this.$emit('applied')
        }
    }

})

window.Event = new Vue()
// coupon2
Vue.component('coupon2', {

    template: `
        <input type="text" placeholder="Enter your coupon code" @blur="onCoupon2Applied" />
    `,
    methods: {
        onCoupon2Applied() {
            Event.$emit('applied2')
        }
    }

})

// modal card
Vue.component('modal2', {
    template: `
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">
                    <slot name="header">Default header</slot>
                </p>
                <button class="delete" aria-label="close" @click="$emit('close')"></button>
            </header>
            <section class="modal-card-body">
                <slot></slot>
            </section>
            <footer class="modal-card-foot">
                <slot name="footer">
                    <button class="button is-success" @click="$emit('close')">OK</button>
                </slot>
            </footer>
        </div>
    </div>
    `
})

// progress-view
Vue.component('progress-view', {
    data() {
        return {
            completionRate: 50
        }
    }
})

let app = new Vue({
    el: '#root',
    data: {
        showModal: false,
        couponApplied: false,
        coupon2Applied: false,
        showModal2: false
    },
    methods: {
        onCouponApplied() {
            // alert("It was applied!")
            this.couponApplied = true
        }
    },
    created() {
        Event.$on('applied2', () => {
            // alert('Handling it!')
            this.coupon2Applied = true
        })
    }
})