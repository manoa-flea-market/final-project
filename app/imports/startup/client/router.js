import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  name: 'Home_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Home_Page' });
  },
});

FlowRouter.route('/sell-item', {
  name: 'Sell_Item_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Sell_Item_Page' });
  },
});

FlowRouter.route('/user-home-page', {
  name: 'User_Home_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'User_Home_Page' });
  },
});

FlowRouter.route('/list', {
  name: 'List_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'List_Stuff_Page' });
  },
});

FlowRouter.route('/profile-page', {
  name: 'Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Profile_Page' });
  },
});

FlowRouter.route('/edit-profile-page', {
  name: 'Edit_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Profile_Page' });
  },
});

FlowRouter.route('/market-page', {
  name: 'Market_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Market_Page' });
  },
});

FlowRouter.route('/contact-page', {
  name: 'List_Contact_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'List_Contact_Page' });
  },
});

FlowRouter.route('/listing-page', {
  name: 'Listing_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Listing_Page' });
  },
});

FlowRouter.route('/add-listing-page', {
  name: 'Add_Listing_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Listing_Page' });
  },
});

FlowRouter.route('/edit-listing-page', {
  name: 'Edit_Listing_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Listing_Page' });
  },
});

FlowRouter.route('/add', {
  name: 'Add_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Stuff_Page' });
  },
});

FlowRouter.route('/stuff/:_id', {
  name: 'Edit_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Stuff_Page' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};
