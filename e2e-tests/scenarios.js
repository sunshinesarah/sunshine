'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /verbs when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/verbs");
  });


  describe('verbs', function() {

    beforeEach(function() {
      browser.get('index.html#!/verbs');
    });


    it('should render verbs when user navigates to /verbs', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('particles', function() {

    beforeEach(function() {
      browser.get('index.html#!/particles');
    });


    it('should render particles when user navigates to /particles', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
