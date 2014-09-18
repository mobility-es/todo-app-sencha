Ext.define('todo.proxy.DataSyncProxy', {
    extend: 'Ext.data.proxy.Proxy',
    alias: 'proxy.datasync',

    createFailureHandler: function(operation, callback, scope) {
        return function(error) {
            operation.setException(error);
            Ext.callback(callback, scope, [operation]);
        };
    },

    handleSuccess: function(operation, callback, scope) {
        operation.setCompleted();
        operation.setSuccessful();
        Ext.callback(callback, scope, [operation]);
    },

    read: function(operation, callback, scope) {
        // Each Sencha operation has a well defined lifecycle. It has to be started and finalized
        // by either marking it as successful or passing to it an exception.
        operation.setStarted();

        var me = this;

        aiq.datasync.getDocuments(this.getModel().getName(), {
            success: function(documents) {
                var records = documents.map(function(document) {
                    // This is the data format operation.process() method expects in the result set
                    return { id: document._id, data: document, node: document };
                });

                var result = new Ext.data.ResultSet({
                    records: records,
                    success: true
                });

                if (! operation.process('read', result)) {
                    operation.setException();
                }

                // Executing this callback will notify the store that the data has changed
                Ext.callback(callback, scope || me, [operation]);
            }
        });
    },

    create: function(operation, callback, scope) {
        operation.setStarted();

        // Current AIQ API doesn't support batch operations, so we expect all modifying
        // operations to get only one record at time.
        var record = operation.getRecords()[0];

        var me = this;

        aiq.datasync.createDocument(this.getModel().getName(), record.getData(), {
            success: function(document) {
                // Remove the dirty flag from record, marking it as processed
                record.commit();
                me.handleSuccess(operation, callback, scope || me);
            },
            failure: this.createFailureHandler(operation, callback, scope || me)
        });
    },

    update: function(operation, callback, scope) {
        operation.setStarted();

        var record = operation.getRecords()[0];
        var me = this;

        aiq.datasync.updateDocument(record.getId(), record.getData(), {
            success: function(document) {
                record.commit();
                me.handleSuccess(operation, callback, scope || me);
            }
        });
    },

    destroy: function(operation, callback, scope) {
        operation.setStarted();

        var record = operation.getRecords()[0];
        var me = this;

        aiq.datasync.deleteDocument(record.getId(), {
            success: function() {
                record.commit();
                me.handleSuccess(operation, callback, scope || me);
            },
            failure: me.createFailureHandler(operation, callback, scope || me)
        });
    }
});
