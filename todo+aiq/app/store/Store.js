Ext.define('todo.store.Store', {
    extend: 'Ext.data.Store',
    requires: [
        'todo.proxy.DataSyncProxy'
    ],

    config: {
        storeId: 'todos',
        autoSync: true,
        autoLoad: false,
        model: 'todo.model.TODO',
        proxy: 'datasync',
        sorters: [{
            property : 'createdAt',
            direction: 'ASC'
        }]
    },

    initialize: function() {
        var me = this;
        var descriptor = {
            _type: this.getModel().getName(),
            callback: function() {
                me.load();
            }
        };

        document.addEventListener('aiq-ready', function() {
            aiq.datasync.bind('document-created', descriptor);
            aiq.datasync.bind('document-updated', descriptor);
            aiq.datasync.bind('document-deleted', descriptor);
        }, false);
    },

    completed: function() {
        return this.queryBy(function(record, id) {
            if (record.get('completed')) {
                return record;
            }
        });
    }
});
