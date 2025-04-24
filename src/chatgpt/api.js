const axios = require('axios');
const BaseAPI = require('../base/api');

class ChatGPTAPI extends BaseAPI {
    constructor(apiKey, config = {}) {
        super(apiKey, config);
        this.baseURL = 'https://api.openai.com/v1';
    }

    static get defaultParams() {
        return {
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "Be precise and concise." }
            ],
            temperature: 0.2,
            top_p: 0.9,
            presence_penalty: 0,
            frequency_penalty: 1,
            max_tokens: 200
        };
    }

    initParameter() {
        const params = {...this.config};
        const defaultParams = ChatGPTAPI.defaultParams;
        return {
            model: params.model || defaultParams.model,
            messages: params.messages || defaultParams.messages,
            temperature: params.temperature || defaultParams.temperature,
            top_p: params.top_p || defaultParams.top_p,
            presence_penalty: params.presence_penalty || defaultParams.presence_penalty,
            frequency_penalty: params.frequency_penalty || defaultParams.frequency_penalty,
            max_tokens: params.max_tokens || defaultParams.max_tokens
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

module.exports = ChatGPTAPI;