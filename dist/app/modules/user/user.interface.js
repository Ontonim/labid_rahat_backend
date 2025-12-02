"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.isActive = void 0;
var isActive;
(function (isActive) {
    isActive["ACTIVE"] = "active";
    isActive["INACTIVE"] = "inactive";
    isActive["BLOCKED"] = "blocked";
})(isActive || (exports.isActive = isActive = {}));
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["MODERATOR"] = "moderator";
    Role["MEMBER"] = "member";
    Role["USER"] = "user";
})(Role || (exports.Role = Role = {}));
