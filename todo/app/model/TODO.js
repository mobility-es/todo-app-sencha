Ext.define('todo.model.TODO', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'title', type: 'string' },
            { name: 'completed', type: 'boolean', defaultValue: false },
            { name: 'createdAt', type: 'int'}

        ]
    }
});
