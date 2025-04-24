const axios = require('axios');
const BaseAPI = require('../base/api');
class DeepSeekAPI extends BaseAPI {
    constructor(apiKey, config = {}) {
        super(apiKey, config);
        this.baseURL = 'https://api.deepseek.com';
    }

    static get defaultParams() {
        return {
            model: "deepseek-chat",
            messages: [
                { role: "system", content: "You are a helpful assistant." }
            ],
            stream: false
        };
    }

    initParameter() {
        const params = {...this.config};
        const defaultParams = DeepSeekAPI.defaultParams;
        return {
            model: params.model || defaultParams.model,
            messages: params.messages || defaultParams.messages,
            stream: params.stream || defaultParams.stream
        };
    }

    async fetchData(endpoint) {
        const updatedParams = {...this.parameterObj};

        try {
            const response = await axios.post(`${this.baseURL}/${endpoint}`, updatedParams, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
}
module.exports = DeepSeekAPI