import React from 'react';
import FoldersList from '/imports/ui/containers/folders';
import {FoldersHeader} from '/imports/ui/components/folders-header';

export const FoldersView = ({foldersCollection}) => (
  <div className="view-container boards index">
    <section>
      <FoldersHeader iconClass="fa fa-user" title="My Folders"/>
      <FoldersList />
    </section>
  </div>
);
