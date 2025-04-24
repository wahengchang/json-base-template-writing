/**
 * Base API class for chat providers
 * @abstract
 */
class BaseAPI {
    /**
     * @param {string} apiKey - API key for the service
     * @param {Object} config - Configuration options
     */
    constructor(apiKey, config = {}) {
        if (this.constructor === BaseAPI) {
            throw new Error('BaseAPI is abstract and cannot be instantiated directly');
        }
        this.config = {...config};
        this.apiKey = apiKey;
        this.parameterObj = {
            ...this.initParameter()
        };
    }

    /**
     * Initialize parameters with defaults and config
     * @abstract
     * @returns {Object}
     */
    initParameter() {
        throw new Error('initParameter must be implemented by derived classes');
    }

    /**
     * Set system message
     * @param {string} message 
     */
    setSystemMessage(message) {
        const systemMessageIndex = this.parameterObj.messages.findIndex(msg => msg.role === "system");
        if (systemMessageIndex !== -1) {
            this.parameterObj.messages[systemMessageIndex].content = message;
        } else {
            this.parameterObj.messages.unshift({ role: "system", content: message });
        }
    }

    /**
     * Set messages array
     * @param {Array} messages 
     */
    setMessage(messages) {
        if (!Array.isArray(messages)) {
            throw new Error('Messages must be an array');
        }
        this.parameterObj.messages = messages;
    }

    /**
     * Append a message to the messages array
     * @param {Object} message 
     */
    appendMessage(message) {
        if (!message.role || !message.content) {
            throw new Error('Message must have role and content properties');
        }
        this.parameterObj.messages.push(message);
    }

    /**
     * Fetch data from API endpoint
     * @abstract
     * @param {string} endpoint 
     * @returns {Promise}
     */
    async fetchData(endpoint) {
        throw new Error('fetchData must be implemented by derived classes');
    }
}

module.exports = BaseAPI; 