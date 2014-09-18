Ext.define('todo.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
        'Ext.Button',
        'Ext.field.Text',
        'Ext.Label',
        'Ext.dataview.List'
    ],

    config: {
        fullscreen: true,
        layout: 'vbox',
        items: [
            {
                xtype: 'panel',
                docked: 'top',
                layout: 'hbox',
                cls: 'header',
                items: [
                    {
                        id: 'titleField',
                        xtype: 'textfield',
                        flex: 1,
                        placeHolder: 'What needs to be done?',
                        clearIcon: false
                    },
                    {
                        id: 'addButton',
                        xtype: 'button',
                        docked: 'right',
                        text: 'Add'
                    }
                ]
            },
            {
                id: 'todoList',
                xtype: 'list',
                flex: 1,
                store: 'todos',
                mode: 'MULTI',
                itemTpl: '{title}',
                itemHeight: 39,
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                docked: 'bottom',
                cls: 'footer',
                items: [
                    {
                        id: 'tasksLabel',
                        xtype: 'label',
                        docked: 'left',
                        hidden: true
                    },
                    {
                        id: 'clearButton',
                        xtype: 'button',
                        docked: 'right',
                        hidden: true
                    }
                ]
            }
        ]
    }
});
