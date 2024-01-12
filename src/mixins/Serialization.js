const SerializationMixin = Base => class extends Base {
    serialize(data) {
        // Implement logic to serialize data
    }

    deserialize(data) {
        // Implement logic to deserialize data
    }
};

// Usage:
// class UserModel extends SerializationMixin(BaseModel) { ... }
