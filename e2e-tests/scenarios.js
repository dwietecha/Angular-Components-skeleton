'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

    beforeEach(function() {
      browser.get('index.html');
      this.optionsListElements = element.all(by.css('#options-list li'));
    });

    it('Correctly rendered UI',  function() {
	expect(element.all(by.css('h1')).first().getText()).
		toMatch(/Angular - Components skeleton/);
	expect(element.all(by.css('ot-trigger span')).first().getOuterHtml()).
		toMatch(/\<span ng-bind=\"apps.current\" class=\"ng-binding ng-scope\"\>Marketing\<\/span\>/);
	expect(element.all(by.css('#apps-list li')).count()).toBe(4);
	expect(element.all(by.css('#app-info')).first().getText()).
		toMatch(/App: Marketing/);
	expect(element.all(by.css('#area-info')).first().getText()).
		toMatch(/Area: Floorplan/);

	expect(this.optionsListElements.count()).toBe(4);
	expect(this.optionsListElements.first().getText()).
		toMatch(/Marketing\/Floorplan option1/);
    });

    it('Should display correct options list for Reservations / Publish',  function() {
        element.all(by.css('nav ot-list li')).get(2).click();
        element.all(by.css('ot-trigger')).first().click();
        element.all(by.css('#apps-list li')).get(2).click();
        expect(this.optionsListElements.first().getText()).
        toMatch(/Reservations\/Schedule option1/);
    });
});
