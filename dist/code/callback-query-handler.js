"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callbackQueryHandler = void 0;
const settings_1 = require("./settings");
class CallbackQueryHandler {
    constructor() {
        this.handle = (query, methods) => __awaiter(this, void 0, void 0, function* () {
            if (!query || !query.data || !query.message)
                return;
            const chatId = query.message.chat.id;
            const messageId = query.message.message_id;
            const data = query.data;
            const queryData = { chatId, messageId, methods };
            settings_1.settings.updateSettingsFile();
        });
    }
}
exports.callbackQueryHandler = new CallbackQueryHandler();
