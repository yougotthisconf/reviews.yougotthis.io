const app = new Vue({
    el: '#app',
    delimiters: ['{§', '§}'],
    async created() {
        this.reviewers = await fetch(baseURL() + '/get-reviewers').then(r =>
            r.json()
        )
    },
    data: {
        reviewers: false,
        reviewer: '',
        talks: false
    },
    methods: {
        async loadTalks() {
            if (!this.reviewer) return alert('Please select reviewer')
            this.talks = await fetch(
                baseURL() + '/get-talks?reviewer=' + this.reviewer
            ).then(r => r.json())
        }
    }
})
