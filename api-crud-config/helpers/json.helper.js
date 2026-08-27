function serialize(data) {
    return JSON.stringify(data);
}
function deserialize(data) {
    if (typeof data === 'object' && data !== null) {
        return data;
    }
    if (typeof data !== 'string') {
        throw new Error(
            `Expected JSON string or object, received ${typeof data}`
        );
    }
    try {
        return JSON.parse(data);
    } catch (error) {
        throw new Error(
            `Invalid JSON payload:\n${data}\n\n${error.message}`
        );
    }
}
module.exports = {
    serialize,
    deserialize
};