// eslint-disable-next-line
function changeLinkToHardLine(event, object) {
  const linkData = object.part.data;
  if (linkData) {
    const { diagram } = object.part;
    diagram.startTransaction('changeCategory');
    diagram.model.setCategoryForLinkData(linkData, '');
    diagram.rebuildParts();
    diagram.commitTransaction('changeCategory');
  }
}

// eslint-disable-next-line
function changeLinkToDottedLine(event, object) {
  const linkData = object.part.data;
  if (linkData) {
    const { diagram } = object.part;
    diagram.startTransaction('changeCategory');
    diagram.model.setDataProperty(linkData, 'category', 'dottedLine');
    diagram.rebuildParts();
    diagram.commitTransaction('changeCategory');
  }
}

// eslint-disable-next-line
function changeLinkToProbablyReportsTo(event, object) {
  const linkData = object.part.data;
  if (linkData) {
    const { diagram } = object.part;
    diagram.startTransaction('changeCategory');
    diagram.model.setDataProperty(linkData, 'category', 'probably');
    diagram.rebuildParts();
    diagram.commitTransaction('changeCategory');
  }
}

export default function linkContextMenu(go, $$) {
  return $$(
    go.Adornment,
    'Vertical', // that has one button
    $$('ContextMenuButton', $$(go.TextBlock, 'Hard line report'), { click: changeLinkToHardLine }),
    $$('ContextMenuButton', $$(go.TextBlock, 'Dotted line report'), {
      click: changeLinkToDottedLine,
    }),
    $$('ContextMenuButton', $$(go.TextBlock, 'Probably reports to'), {
      click: changeLinkToProbablyReportsTo,
    })
    // more ContextMenuButtons would go here
  ); // end Adornment
}
