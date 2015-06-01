if (Meteor.isClient) {

  Meteor.startup(function () {
    if (!Meteor.userId()) {
      Meteor.loginWithPassword('test', 'test');
    }
    Meteor.subscribe('entriesPub');
  });

  Template.test.helpers({
    filteredEntries: function() {
      return entries.find();
    },

    total: function() {
      return Counts.get('total-entries');
    }
  });

  Template.test.events({
    'click #filter-c': function() {
      Meteor.users.update({_id: Meteor.userId() }, { $set: {
        'profile.filter': {
          a: 'c'
        }
      }});
      Meteor.subscribe('entriesPub');
    }
  });
}


