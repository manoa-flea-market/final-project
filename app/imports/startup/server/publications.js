import { Interests } from '/imports/api/interest/InterestCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Items } from '/imports/api/items/ItemCollection';
import { Categories } from '/imports/api/category/CategoryCollection';
import { Contacts } from '../../api/contacts/contacts.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('Contacts', function publishContactsData() {
  return Contacts.find();
});
Interests.publish();
Profiles.publish();
Items.publish();
Categories.publish();
