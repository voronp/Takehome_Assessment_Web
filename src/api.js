

export default {
    baseUrl: 'https://601f1754b5a0e9001706a292.mockapi.io',
    getJson: async function (url, params) {
        return window.fetch(this.baseUrl + url + (params ? '?' + new URLSearchParams(params) : ''))
            .then(res => {
                if(!res.ok)
                    throw new Error('Error fetching data')
                return res
            })
            .then(res => res.json())
    }

}
