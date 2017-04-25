import { Interests } from '/imports/api/interest/InterestCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Items } from '/imports/api/items/ItemCollection';
import { Categories } from '/imports/api/category/CategoryCollection';

Interests.publish();
Profiles.publish();
Items.publish();
Categories.publish();
