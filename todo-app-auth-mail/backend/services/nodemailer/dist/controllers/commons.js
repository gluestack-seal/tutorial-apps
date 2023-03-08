"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Commons {
    /**
     * Server response
     */
    Response(res, success, message, data) {
        res.json({ success, message, data });
    }
}
exports.default = new Commons();
