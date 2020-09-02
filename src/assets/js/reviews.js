const app = new Vue({
    el: '#app',
    delimiters: ['{§', '§}'],
    async created() {
        const params = new URL(document.location).searchParams
        this.talk = await fetch(
            baseURL() + '/get-talk?id=' + params.get('id')
        ).then(r => r.json())
        this.reviewer = params.get('reviewer')
    },
    data: {
        talk: false,
        reviewer: false
    },
    methods: {
        async updateTalk() {
            if (!this.talk.fields[this.reviewer + ' Score'])
                return alert('You must provide a score')

            let url = `/update-talk?id=${this.talk.id}&reviewer=${
                this.reviewer
            }&score=${this.talk.fields[this.reviewer + ' Score']}`
            if (this.talk.fields[this.reviewer + ' Notes'])
                url += `&notes=${this.talk.fields[this.reviewer + ' Notes']}`
            await fetch(baseURL() + url)
            alert('Successfully submitted')
        }
    }
})
