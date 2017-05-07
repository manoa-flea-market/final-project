import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Items, ItemsSchema } from '/imports/api/items/ItemCollection';
import { Categories } from '/imports/api/category/CategoryCollection';

const selectedCategoriesKey = 'selectedCategories';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';

Template.Add_Listing_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = Items.getSchema().namedContext('Add_Listing_Page');
  this.subscribe(Categories.getPublicationName());
  this.subscribe(Items.getPublicationName());
  this.messageFlags.set(selectedCategoriesKey, undefined);
});

Template.Add_Listing_Page.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  fieldError(fieldName) {
    const invalidKeys = Template.instance().context.invalidKeys();
    const errorObject = _.find(invalidKeys, (keyObj) => keyObj.name === fieldName);
    return errorObject && Template.instance().context.keyErrorMessage(errorObject.name);
  },
  items() {
    // Initialize selectedCategories to all of them if messageFlags is undefined.
    if (!Template.instance().messageFlags.get(selectedCategoriesKey)) {
      Template.instance().messageFlags.set(selectedCategoriesKey,
          _.map(Categories.findAll(), category => category.name));
    }
    // Find all items with the currently selected categories.
    const allItems = Items.findAll();
    const selectedCategories = Template.instance().messageFlags.get(selectedCategoriesKey);
    return _.filter(allItems, item => _.intersection(item.categories, selectedCategories).length > 0);
  },

  categories() {
    return _.map(Categories.findAll(),
        function makeCategoryObject(category) {
          return {
            label: category.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedCategoriesKey), category.name),
          };
        });
  },
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
