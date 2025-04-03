import { FolderEntity } from '../../services/database/types';
import { getTrashFolderId } from '../../services/trash';
import Folder, { FolderEntityWithChildren } from '../Folder';

export default (folders: FolderEntity[]) => {
	const tree = Folder.buildTree(folders);

	const canBeCollapsedIds: string[] = [];

	const processTree = (folders: FolderEntityWithChildren[]) => {
		for (const folder of folders) {
			if (folder.children.length) {
				canBeCollapsedIds.push(folder.id);
				processTree(folder.children);
			}
		}
	};

	// Future proofing: if TrashFolder is already in canBeCollapsedIds do not add it again.
	if (!(getTrashFolderId() in canBeCollapsedIds)) {

		// Currently only deleted folders result in a collapsable Trash
		for (const folder of folders) {
			if (folder.deleted_time) {
				canBeCollapsedIds.push(getTrashFolderId());
				break;
			}
		}
	}

	processTree(tree);

	return canBeCollapsedIds;
};
