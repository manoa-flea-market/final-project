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
   * Interests is an array of defined interest names.
   * @throws { Meteor.Error } If a user with the supplied username already exists, or
   * if one or more interests are not defined, or if github, facebook, and instagram are not URLs.
   * @returns The newly created docID.
   */
  define({ firstName = '', lastName = '', username, bio = '', interests, picture = '', title = '', github = '',
      facebook = '', instagram = '' }) {
    // make sure required fields are OK.
    const checkPattern = { firstName: String, lastName: String, username: String, bio: String, picture: String,
      title: String };
    check({ firstName, lastName, username, bio, picture, title }, checkPattern);

    if (this.find({ username }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Profile`);
    }

    // Throw an error if any of the passed Interest names are not defined.
    Interests.assertNames(interests);
    return this._collection.insert({ firstName, lastName, username, bio, interests, picture, title, github,
      facebook, instagram });
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
export const Items = new ItemCollection();