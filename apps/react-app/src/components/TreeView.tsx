import { TkTreeView, TkTreeItem } from '@takeoff-ui/react';

function TreeView() {
  return (
    <TkTreeView type="basic" size="base">
      <TkTreeItem itemId="1" label="Parent Directory">
        <TkTreeItem itemId="2" label="Child File 1" />
        <TkTreeItem itemId="3" label="Child Directory">
          <TkTreeItem itemId="4" label="Child Directory2">
            <TkTreeItem itemId="5" label="Child Directory3"></TkTreeItem>
          </TkTreeItem>
        </TkTreeItem>
        <TkTreeItem itemId="7" label="Another Directory">
          <TkTreeItem itemId="8" label="Another File" />
        </TkTreeItem>
        <TkTreeItem itemId="9" label="Single File" />
      </TkTreeItem>
      <TkTreeItem itemId="10" label="Parent Directory">
        <TkTreeItem itemId="11" label="Child File 1" />
        <TkTreeItem itemId="12" label="Child Directory">
          <TkTreeItem itemId="13" label="Child Directory2"></TkTreeItem>
        </TkTreeItem>
        <TkTreeItem itemId="15" label="Another Directory">
          <TkTreeItem itemId="16" label="Another File1" />
          <TkTreeItem itemId="18" label="Another File2" />
          <TkTreeItem itemId="19" label="Another File3" />
        </TkTreeItem>
        <TkTreeItem itemId="17" label="Single File" />
      </TkTreeItem>
    </TkTreeView>
  );
}

export default TreeView;
