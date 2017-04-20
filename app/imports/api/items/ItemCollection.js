import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { Category } from '/imports/api/category/CategoryCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

/** @module Item */

/**
 * Items provide item data for a user.
 * @extends module:Base~BaseCollection
 */
class ItemCollection extends BaseCollection {

  /**
   * Creates the Profile collection.
   */
  constructor() {
    super('Item', new SimpleSchema({
      name: { type: String },
      price: { type: String },
      seller: { type: String },
      category: {type: [String] },
      // Remainder are optional
      description: { type: String, optional: true },
      picture: { type: SimpleSchema.RegEx.Url, optional: true },
    }));
  }

  /**
   * Defines a new Item.
   * @example
   * Items.define({ ({ name: 'Discrete Mathematics and it's Application',
   *                   price: '49.50',
   *                   category: ['textbook', 'school supplies'});
   *                   description: 'Textbook used with ICS 141 and 241.'
   *                   picture: www.google.com
   * @param { Object } description Object with required key name, price, and category.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * Categories is an array of defined category names.
   * @throws { Meteor.Error } if one or more interests are not defined
   * @returns The newly created docID.
   */
  define({ name = '', price = '', seller, category, description = '', picture = '' }) {
    // make sure required fields are OK.
    const checkPattern = { name: String, price: String, seller: String, description: String, picture: String };
    check({ name, price, seller, description, picture }, checkPattern);

    // Throw an error if any of the passed Category names are not defined.
    Category.assertNames(category);
    return this._collection.insert({ name, price, seller, category, picture });
  }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    const price = doc.price;
    const category = doc.category;
    const description = doc.description;
    const picture = doc.picture;
    return { name, price, category, description, picture };
  }
}
