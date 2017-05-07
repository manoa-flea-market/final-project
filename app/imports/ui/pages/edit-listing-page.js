import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Contacts, ContactsSchema } from '../../api/contacts/contacts.js';
import { Items, ItemsSchema } from '/imports/api/items/ItemCollection';
import { FlowRouter } from 'meteor/kadira:flow-router';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';

Template.Edit_Listing_Page.onCreated(function onCreated() {
  this.subscribe('Items');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = ContactsSchema.namedContext('Edit_Listing_Page');
});

Template.Edit_Listing_Page.helpers({
  contactDataField(fieldName) {
    const itemData = Items.findOne(FlowRouter.getParam('_id'));
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return itemData && itemData[fieldName];
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  fieldError(fieldName) {
    const invalidKeys = Template.instance().context.invalidKeys();
    const errorObject = _.find(invalidKeys, (keyObj) => keyObj.name === fieldName);
    return errorObject && Template.instance().context.keyErrorMessage(errorObject.name);
  },
});


Template.Edit_Listing_Page.events({
  'submit .listing-data-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const name = event.target.Name.value;
    const price = event.target.Price.value;
    const picture = event.target.Picture.value;
    const description = event.target.Description.value;
    const updatedItemData = { name, price, picture, description };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    Items.getSchema().clean(updatedItemData);
    // Determine validity.
    instance.context.validate(updatedItemData);
    if (instance.context.isValid()) {
      Items.update(FlowRouter.getParam('_id'), { $set: updatedItemData });
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('Market_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
