const BaseUtil = require('../base/util');
const DeepSeekAPI = require('./api');

class DeepSeekUtil extends BaseUtil {
    constructor(apiKey, config = {}) {
        super(apiKey, config);
        this.api = new DeepSeekAPI(apiKey, config);
    }

    async getCompletion(prompt) {
        await this.validateCompletionInput(prompt);

        this.api.setMessage([
            { role: "system", content: this.systemMessage },
            { role: "user", content: prompt }
        ]);

        try {
            const response = await this.api.fetchData('chat/completions');
            return response;
        } catch (error) {
            console.error('Error fetching completion:', error);
            throw error;
        }
    }

    async getConversation(preMessage = [], newMessage = '') {
        await this.validateConversationPreMessage(preMessage);

        const messages = [...preMessage, { role: "user", content: newMessage }];
        this.api.setMessage(messages);

        try {
            const response = await this.api.fetchData('chat/completions');
            return response;
        } catch (error) {
            console.error('Error fetching conversation:', error);
            throw error;
        }
    }
}

module.exports = DeepSeekUtil;