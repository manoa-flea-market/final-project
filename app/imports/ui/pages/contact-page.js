import { Template } from 'meteor/templating';
import { Contacts } from '../../api/contacts/contacts.js';

Template.Contact_Page.helpers({

  /**
   * @returns {*} All of the Stuff documents.
   */
  contactsList() {
    return Contacts.find();
  },
});

Template.Contact_Page.onCreated(function onCreated() {
  this.subscribe('Contacts');
});
