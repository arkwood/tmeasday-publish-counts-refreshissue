/**
 * Created by peter on 1/06/15.
 */
entries = new Mongo.Collection('entries');

if (Meteor.isServer) {
    Meteor.publish('entriesPub', function () {
        if(this.userId) {
            var filter = Meteor.users.findOne(this.userId).profile.filter;
            Counts.publish(this, 'total-entries', entries.find(filter));
            return entries.find(filter);
        }
    });

    if (Meteor.users.find().count() == 0) {
        // init account
        Accounts.createUser({
            username: 'test',
            email: 'test@test.com',
            password: 'test',
            profile: {
                filter: {
                    a: 'b'
                }
            }
        });
    }

    if (entries.find().count() == 0) {
        // init entries
        entries.insert({ a: 'b' });
        entries.insert({ a: 'c' });
        entries.insert({ a: 'c' });
        entries.insert({ a: 'c' });
    }
}