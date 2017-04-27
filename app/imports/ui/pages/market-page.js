import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Items } from '/imports/api/items/ItemCollection';
import { Categories } from '/imports/api/category/CategoryCollection';

const selectedCategoriesKey = 'selectedCategories';

Template.Filter_Page.onCreated(function onCreated() {
  this.subscribe(Categories.getPublicationName());
  this.subscribe(Items.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(selectedCategoriesKey, undefined);
});

Template.Filter_Page.helpers({
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

Template.Market_Page.events({
  'submit .filter-data-form'(event, instance) {
    event.preventDefault();
    const selectedOptions = _.filter(event.target.Categories.selectedOptions, (option) => option.selected);
    instance.messageFlags.set(selectedCategoriesKey, _.map(selectedOptions, (option) => option.value));
  },
});
