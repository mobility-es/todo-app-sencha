Ext.define('todo.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            addButton: '#addButton',
            clearButton: '#clearButton',
            titleField: '#titleField',
            tasksLabel: '#tasksLabel',
            todoList: '#todoList'
        },
        control: {
            addButton: {
                tap: 'onAdd'
            },
            clearButton: {
                tap: 'onClear'
            },
            todoList: {
                itemtap: 'toggleCompletion'
            }
        }
    },

    //called when the Application is launched, remove if not needed
    launch: function(app) {
        this.store = Ext.data.StoreManager.lookup('todos');
        this.store.on('load', this.onLoad, this);
        this.store.on('addrecords', this.updateFooter, this);
        this.store.on('updaterecord', this.updateFooter, this);
        this.store.on('removerecords', this.updateFooter, this);
        this.store.load();
    },

    onLoad: function() {
        this.getTodoList().select(this.store.completed().all);
        this.updateFooter();
    },

    onAdd: function() {
        var titleField = this.getTitleField();
        this.store.add({
            title: titleField.getValue(),
            createdAt: Date.now()
        });
        titleField.reset();
    },

    onClear: function() {
        this.store.completed().each(function(record) {
            this.store.remove(record);
        }, this);
    },

    toggleCompletion: function(list, index, target, record, event, options) {
        record.set('completed', !record.get('completed'));
    },

    updateFooter: function() {
        var completed = this.store.completed().length;
        var remaining = this.store.getAllCount() - completed;
        var tasksLabel = this.getTasksLabel();

        if (remaining === 0) {
            tasksLabel.setHidden(true);
        } else {
            tasksLabel.setHidden(false);
            tasksLabel.setHtml(remaining + ' task(s) left');
        }

        var clearButton = this.getClearButton();
        if (completed === 0) {
            clearButton.setHidden(true);
        } else {
            clearButton.setHidden(false);
            clearButton.setText('Clear ' + completed + ' completed task(s)');
        }
    }
});
