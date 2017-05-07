import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Items, ItemsSchema } from '/imports/api/items/ItemCollection';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';

Template.Add_Listing_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = Items.getSchema().namedContext('Add_Listing_Page');
});

Template.Add_Listing_Page.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  fieldError(fieldName) {
    const invalidKeys = Template.instance().context.invalidKeys();
    const errorObject = _.find(invalidKeys, (keyObj) => keyObj.name === fieldName);
    return errorObject && Template.instance().context.keyErrorMessage(errorObject.name);
  }
});


Template.Add_Listing_Page.events({
  'submit .listing-data-form'(event, instance) {
    event.preventDefault();
    const name = event.target.Name.value;
    const price = event.target.Price.value;
    const picture = event.target.Picture.value;
    const description = event.target.Description.value;
    const newItemData = { name, price, picture, description };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that updatedListingData reflects what will be inserted.
    Items.getSchema().clean(newItemData);
    // Determine validity.
    instance.context.validate(newItemData);

    if (instance.context.isValid()) {
      Items.define(newItemData);
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('Market_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
