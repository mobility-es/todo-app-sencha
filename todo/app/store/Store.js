Ext.define('todo.store.Store', {
    extend: 'Ext.data.Store',

    config: {
        storeId: 'todos',
        autoSync: true,
        autoLoad: false,
        model: 'todo.model.TODO'
    },

    completed: function() {
        return this.queryBy(function(record, id) {
            if (record.get('completed')) {
                return record;
            }
        });
    }
});
