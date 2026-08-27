function serialize(data) {
    return JSON.stringify(data);
}
function deserialize(data) {
    if (typeof data === 'object') {
        return data;
    }

    if (typeof data !== 'string') {
        throw new Error(
            `Expected JSON string or object but received ${typeof data}`
        );
    }
    try {
        return JSON.parse(data);
    } catch (error) {

        throw new Error(
            `Invalid JSON payload:\n${data}\n${error.message}`
        );
    }
}
module.exports = {
    serialize,
    deserialize
};