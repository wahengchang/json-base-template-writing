const axios = require('axios');
const BaseAPI = require('../base/api');

class PerplexityAPI extends BaseAPI {
    constructor(apiKey, config = {}) {
        super(apiKey, config);
        this.baseURL = 'https://api.perplexity.ai';
    }

    static get defaultParams() {
        return {
            model: "llama-3.1-sonar-small-128k-online",
            messages: [
                { role: "system", content: "Be precise and concise." }
            ],
            temperature: 0.2,
            top_p: 0.9,
            presence_penalty: 0,
            frequency_penalty: 1,
            return_citations: true,
            search_domain_filter: ["perplexity.ai"],
            return_images: false,
            return_related_questions: false,
            search_recency_filter: "month",
            top_k: 0,
            stream: false
        };
    }

    initParameter() {
        const params = {...this.config};
        const defaultParams = PerplexityAPI.defaultParams;
        return {
            model: params.model || defaultParams.model,
            messages: params.messages || defaultParams.messages,
            temperature: params.temperature || defaultParams.temperature,
            top_p: params.top_p || defaultParams.top_p,
            presence_penalty: params.presence_penalty || defaultParams.presence_penalty,
            frequency_penalty: params.frequency_penalty || defaultParams.frequency_penalty,
            return_citations: params.return_citations || defaultParams.return_citations,
            search_domain_filter: params.search_domain_filter || defaultParams.search_domain_filter,
            return_images: params.return_images || defaultParams.return_images,
            return_related_questions: params.return_related_questions || defaultParams.return_related_questions,
            search_recency_filter: params.search_recency_filter || defaultParams.search_recency_filter,
            top_k: params.top_k || defaultParams.top_k,
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

module.exports = PerplexityAPI;