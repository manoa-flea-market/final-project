import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/home_page', {
  name: 'Home_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Home_Page' });
  },
});

FlowRouter.route('/', {
  name: 'User_Home_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'User_Home_Page' });
  },
});

FlowRouter.route('/admin-home-page', {
  name: 'Admin_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Admin_Page' });
  },
});

FlowRouter.route('/profile-page', {
  name: 'Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Profile_Page' });
  },
});

FlowRouter.route('/edit-profile-page/:_id', {
  name: 'Edit_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Profile_Page' });
  },
});

FlowRouter.route('/add-profile-page', {
  name: 'Add_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Profile_Page' });
  },
});


FlowRouter.route('/market-page', {
  name: 'Market_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Market_Page' });
  },
});

FlowRouter.route('/contact-page', {
  name: 'Contact_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Contact_Page' });
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

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};
