'use strict';
describe('ot-site-directive testing.', function() {
    var $compile, $rootScope, template;
	  
  beforeEach(module('otSite'));  
  beforeEach(module('app/directives/ot-site/ot-site-directive.html'));

  beforeEach(inject(function($templateCache,_$compile_, _$rootScope_){
    template = $templateCache.get('app/directives/ot-site/ot-site-directive.html');
    $templateCache.put('directives/ot-site/ot-site-directive.html',template);
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Should display empty directive correctly', function() {
    var element = $compile("<ot-site></ot-site>")($rootScope);
    $rootScope.$digest(); 
    expect(element.html()).toContain('Angular - Components skeleton');
    expect(element.html()).toContain('<nav transclude-id="site-menu"> </nav>');
    expect(element.html()).toContain('<main transclude-id="site-body"></main>');
  });

  it('Should display filled directive correctly', function() {
    var element = $compile('<ot-site><div transclude-to="site-head">site-head</div><div transclude-to="site-menu">site-menu</div><div transclude-to="site-body">site-body</div></ot-site>')($rootScope);
    $rootScope.$digest(); 
    expect(element.html()).toMatch(/\<div transclude-id\=\"site-head\"\>.*site-head\<\/div\>/);
    expect(element.html()).toMatch(/\<nav transclude-id\=\"site-menu\"\>.*site-menu\<\/div\>\<\/nav\>/);
    expect(element.html()).toMatch(/\<main transclude-id\=\"site-body\"\>.*site-body\<\/div\>\<\/main\>/);
  });
});
