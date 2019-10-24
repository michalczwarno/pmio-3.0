export default function contextMenu(go, $$) {
  return {
    // define a context menu for each node
    contextMenu: $$(
      go.Adornment,
      'Vertical', // that has one button
      $$(
        go.Panel,
        {
          minSize: new go.Size(160, 16),
          maxSize: new go.Size(NaN, 16),
        },
        $$(go.Shape, {
          fill: 'lightgray',
          minSize: new go.Size(160, 16),
          maxSize: new go.Size(NaN, 16),
        }),
        $$(go.TextBlock, 'Attitude', {
          textAlign: 'center',
          minSize: new go.Size(160, 16),
        })
      ),
      $$(
        'ContextMenuButton',
        $$(go.TextBlock, 'Onboard with a deal'),
        // eslint-disable-next-line
        { click: (event, object) => { this.modelActionHelper.changeAttitude({ object: object.part.data, key: '2', value: 'Onboard with a deal' }); } }
      ),
      $$(
        'ContextMenuButton',
        $$(go.TextBlock, 'Some heistation'),
        // eslint-disable-next-line
        { click: (event, object) => { this.modelActionHelper.changeAttitude({ object: object.part.data, key: '3', value: 'Some heistation' }); } }
      ),
      $$(
        'ContextMenuButton',
        $$(go.TextBlock, 'Against the deal'),
        // eslint-disable-next-line
        { click: (event, object) => { this.modelActionHelper.changeAttitude({ object: object.part.data, key: '4', value: 'Against the deal' }); } }
      ),
      $$(
        'ContextMenuButton',
        $$(go.TextBlock, 'Unknown'),
        // eslint-disable-next-line
        { click: (event, object) => { this.modelActionHelper.changeAttitude({ object: object.part.data, key: '1', value: 'Unknown' }); } }
      ),
      $$(
        go.Panel,
        {
          minSize: new go.Size(160, 16),
          maxSize: new go.Size(NaN, 16),
        },
        $$(go.Shape, {
          fill: 'lightgray',
          minSize: new go.Size(160, 16),
          maxSize: new go.Size(NaN, 16),
        }),
        $$(go.TextBlock, 'Power', {
          textAlign: 'center',
          minSize: new go.Size(160, 16),
        })
      ),
      $$(
        'ContextMenuButton',
        $$(go.TextBlock, 'Executive that Matter'),
        // eslint-disable-next-line
        { click: (event, object) => { this.modelActionHelper.changePower(object.part.data, 'EHM'); } }
      ),
      $$(
        'ContextMenuButton',
        $$(go.TextBlock, 'Budget Owner'),
        // eslint-disable-next-line
        { click: (event, object) => { this.modelActionHelper.changePower(object.part.data, 'BudgetOwner'); } }
      ),
      $$(
        'ContextMenuButton',
        $$(go.TextBlock, 'Influencer'),
        // eslint-disable-next-line
        { click: (event, object) => { this.modelActionHelper.changePower(object.part.data, 'Influencer'); } }
      ),
      $$(
        'ContextMenuButton',
        $$(go.TextBlock, 'Unknown'),
        // eslint-disable-next-line
        { click: (event, object) => { this.modelActionHelper.changePower(object.part.data, 'Unknown'); } }
      )
      // more ContextMenuButtons would go here
    ), // end Adornment
  };
}
