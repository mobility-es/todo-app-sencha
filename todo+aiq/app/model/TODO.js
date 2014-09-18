Ext.define('todo.model.TODO', {
    extend: 'Ext.data.Model',
    
    config: {
        idProperty: '_id',
        identifier: 'uuid',
        fields: [
            { name: '_id', type: 'string' },
            { name: 'title', type: 'string' },
            { name: 'completed', type: 'boolean', defaultValue: false }

        ]
    }
});
