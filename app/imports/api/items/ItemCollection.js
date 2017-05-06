import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

/** @module Item */

/**
 * Items provide portfolio data for an item.
 * @extends module:Base~BaseCollection
 */
class ItemCollection extends BaseCollection {

  /**
   * Creates the Item collection.
   */
  constructor() {
    super('Item', new SimpleSchema({
      name: { type: String },
      price: { type: String },
      // Remainder are optional
      description: { type: String, optional: true },
      picture: { type: SimpleSchema.RegEx.Url, optional: true },
    }));
  }

  /**
   * Defines a new Item.
   * @example
   * Items.define({ name: 'Discrete Math & its Applications',
   *                   email: 'raena6@hawaii.edu',
   *                   homeCampus: 'UH Manoa',
   *                   bio: 'I am a student at UH Manoa majoring in Computer Science',
   *                   picture: 'http://google.com/headshot.jpg' });
   * @param { Object } description Object with required key name and email.
   * Remaining keys are optional.
   * email must be unique for all users. It should be the UH email account.
   * @throws { Meteor.Error } If a user with the supplied email already exists
   * @returns The newly created docID.
   */
  define({ name = '', price = '', description = '', picture = ''}) {

    // make sure required fields are OK.
    const checkPattern = { name: String, price: String, description: String, picture: String };
    check({ name, price, description, picture }, checkPattern);

    /**
     * Returns an object representing the Profile docID in a format acceptable to define().
     * @param docID The docID of a Contact.
     * @returns { Object } An object representing the definition of docID.
     */
    dumpOne(docID)
    {
      const doc = this.findDoc(docID);
      const name = doc.name;
      const price = doc.price;
      const description = doc.description;
      const picture = doc.picture;
      return { name, price, description, picture };
    }
  }
}

export const Items = new ItemCollection();

