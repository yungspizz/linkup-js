const Timestamps = Base => class extends Base {
    created_at() {
        return new Date();
    }

    updated_at() {
        return new Date();
    }
};

// Usage:
// class UserModel extends TimestampMixin(BaseModel) { ... }