import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { Items } from '/imports/api/items/ItemCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

/** @module Contact */

/**
 * Contacts provide portfolio data for a user.
 * @extends module:Base~BaseCollection
 */
class ProfileCollection extends BaseCollection {

  /**
   * Creates the Contact collection.
   */
  constructor() {
    super('Contact', new SimpleSchema({
      name: { type: String },
      email: { type: String },
      // Remainder are optional
      homeCampus: { type: String, optional: true },
      bio: { type: String, optional: true },
      picture: { type: SimpleSchema.RegEx.Url, optional: true },
    }));
  }

  /**
   * Defines a new Contact.
   * @example
   * Profiles.define({ name: 'Raena Naka',
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
  define({ name = '', email = '', homeCampus = '', bio = '', picture = '' }) {

    // make sure required fields are OK.
    const checkPattern = { name: String, email: String, homeCampus: String, bio: String, picture: String };
    check({ name, email, homeCampus, bio, picture }, checkPattern);

    if (this.find({ email }).count() > 0) {
      throw new Meteor.Error(`${email} is previously defined in another Profile`);
    }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Contact.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID)
    {
    const doc = this.findDoc(docID);
    const name = doc.name;
    const email = doc.email;
    const homeCampus = doc.homeCampus;
    const bio = doc.bio;
    const picture = doc.picture;
    return { name, email, homeCampus, bio, picture };
  }
}

export const Contacts = new ContactCollection();