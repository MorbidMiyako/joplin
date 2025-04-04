"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../testing/test-utils");
const Folder_1 = require("../Folder");
const getCanBeCollapsedFolderIds_1 = require("./getCanBeCollapsedFolderIds");
describe('getCanBeCollapsedFolderIds', () => {
    beforeEach(async () => {
        await (0, test_utils_1.setupDatabaseAndSynchronizer)(1);
        await (0, test_utils_1.switchClient)(1);
    });
    it('should tell if trash can be collapsed too', async () => {
        const folder1 = await Folder_1.default.save({});
        await Folder_1.default.save({ parent_id: folder1.id });
        await Folder_1.default.save({ parent_id: folder1.id });
        const folder2 = await Folder_1.default.save({});
        const folder2a = await Folder_1.default.save({ parent_id: folder2.id });
        await Folder_1.default.save({ parent_id: folder2a.id });
        expect((0, getCanBeCollapsedFolderIds_1.default)(await Folder_1.default.all({ includeTrash: true }))).toHaveLength(3);
        await Folder_1.default.delete(folder1.id, { toTrash: true, deleteChildren: true });
        expect((0, getCanBeCollapsedFolderIds_1.default)(await Folder_1.default.all({ includeTrash: true }))).toHaveLength(4);
    });
});
//# sourceMappingURL=getCanBeCollapsedFolderIds.test.js.map