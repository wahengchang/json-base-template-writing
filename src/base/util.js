/**
 * Base Utility class for chat providers
 * @abstract
 */
class BaseUtil {
    /**
     * @param {string} apiKey - API key for the service
     * @param {Object} config - Configuration options
     */
    constructor(apiKey, config = {}) {
        if (this.constructor === BaseUtil) {
            throw new Error('BaseUtil is abstract and cannot be instantiated directly');
        }
        const { systemMessage = "Be precise and concise." } = config;
        this.systemMessage = systemMessage;
        this.config = config;
    }

    /**
     * Validate completion input
     * @param {string} prompt 
     */
    async validateCompletionInput(prompt) {
        if (!prompt || typeof prompt !== 'string') {
            throw new Error('Prompt must be a non-empty string');
        }
    }

    /**
     * Validate conversation messages
     * @param {Array} messages 
     */
    async validateConversationPreMessage(messages) {
        if (!Array.isArray(messages)) {
            throw new Error('Messages must be an array');
        }
        if (messages.length === 0) {
            throw new Error('Messages array cannot be empty');
        }
        for (const message of messages) {
            if (!message || typeof message !== 'object') {
                throw new Error('Each message must be an object');
            }
            if (!message.role || typeof message.role !== 'string') {
                throw new Error('Each message must have a role as a string');
            }
            if (!message.content || typeof message.content !== 'string') {
                throw new Error('Each message must have content as a string');
            }
        }
    }

    /**
     * Get completion response
     * @abstract
     * @param {string} prompt 
     */
    async getCompletion(prompt) {
        throw new Error('getCompletion must be implemented by derived classes');
    }

    /**
     * Get conversation response
     * @abstract
     * @param {Array} preMessage 
     * @param {string} newMessage 
     */
    async getConversation(preMessage, newMessage) {
        throw new Error('getConversation must be implemented by derived classes');
    }
}

module.exports = BaseUtil; 