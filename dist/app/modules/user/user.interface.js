"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeratorApprovalStatus = exports.Role = exports.isActive = void 0;
var isActive;
(function (isActive) {
    isActive["ACTIVE"] = "active";
    isActive["INACTIVE"] = "inactive";
    isActive["BLOCKED"] = "blocked";
})(isActive || (exports.isActive = isActive = {}));
var Role;
(function (Role) {
    Role["USER"] = "user";
    Role["MODERATOR"] = "moderator";
    Role["ADMIN"] = "admin";
    Role["PENDING"] = "pending";
})(Role || (exports.Role = Role = {}));
var ModeratorApprovalStatus;
(function (ModeratorApprovalStatus) {
    ModeratorApprovalStatus["PENDING"] = "pending";
    ModeratorApprovalStatus["ACCEPTED"] = "accepted";
    ModeratorApprovalStatus["REJECTED"] = "rejected";
})(ModeratorApprovalStatus || (exports.ModeratorApprovalStatus = ModeratorApprovalStatus = {}));
