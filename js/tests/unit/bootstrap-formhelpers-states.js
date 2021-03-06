$(function () {

  'use strict';
  
  module('bootstrap-formhelpers-states');
  
  test('should provide no conflict', function () {
    var bfhstates;

    bfhstates = $.fn.bfhstates.noConflict();
    ok(!$.fn.bfhstates, 'bfhstates was set back to undefined (org value)');
    $.fn.bfhstates = bfhstates;
  });

  test('should be defined on jquery object', function () {
    ok($(document.body).bfhstates, 'bfhstates method is defined');
  });

  test('should return element', function () {
    var el;
    
    el = $('<div />');
    ok(el.bfhstates()[0] === el[0], 'same element returned');
  });
  
  test('should display state name', function() {
    var statesHTML = '<span class="bfh-states" data-country="US" data-state="CA"></span>',
      states = $(statesHTML).bfhstates({country: 'US', state: 'CA'});

    ok(states.html() === 'California', 'state name displayed');
  });
  
  test('should fill select with a list of states', function() {
    var statesHTML = '<select class="bfh-states" data-country="US"></select>',
      states = $(statesHTML).bfhstates({country: 'US'});

    ok(states.find('option').size() === 66, 'correct number of elements shown');
    ok(states.find('option:selected').text() === '', 'correct option selected');
    ok(states.val() === '', 'correct element value');
    ok(states.find('option[value="CA"]').text() === 'California', 'valid state shown');
  });
  
  test('should fill select with a list of states with preselected state', function() {
    var statesHTML = '<select class="bfh-states" data-country="US" data-state="CA"></select>',
      states = $(statesHTML).bfhstates({country: 'US', state: 'CA'});

    ok(states.find('option').size() === 66, 'correct number of elements shown');
    ok(states.find('option:selected').text() === 'California', 'correct option selected');
    ok(states.val() === 'CA', 'correct element value');
    ok(states.find('option[value="CA"]').text() === 'California', 'valid state shown');
  });
  
  test('should fill select with a list of states without a blank option', function() {
    var statesHTML = '<select class="bfh-states" data-country="US" data-state="CA" data-blank="false"></select>',
      states = $(statesHTML).bfhstates({country: 'US', state: 'CA', blank: false});

    ok(states.find('option').size() === 65, 'correct number of elements shown');
    ok(states.find('option:selected').text() === 'California', 'correct option selected');
    ok(states.val() === 'CA', 'correct element value');
    ok(states.find('option[value="CA"]').text() === 'California', 'valid state shown');
  });
  
  test('should fill select with a list of states and work with bfhcountries', function() {
    var statesHTML = '<select id="countries" class="bfh-countries" data-country="CA"></select>' +
      '<select class="bfh-states" data-country="countries"></select>',
      states = $(statesHTML).appendTo('#qunit-fixture'),
      first = states.first().bfhcountries({country: 'US'}),
      last = states.last().bfhstates({country: 'countries'});
      
    ok(last.find('option').size() === 66, 'correct number of elements shown');
    ok(last.find('option:selected').text() === '', 'correct option selected');
    ok(last.val() === '', 'correct element value');
    ok(last.find('option[value="CA"]').text() === 'California', 'valid state shown');
    
    first.val('CA').change();
    
    ok(last.find('option').size() === 14, 'correct number of elements shown');
    ok(last.find('option:selected').text() === '', 'correct option selected');
    ok(last.val() === '', 'correct element value');
    ok(last.find('option[value="ON"]').text() === 'Ontario', 'valid state shown');
    
    $('#qunit-fixture').html('');
  });
  
  test('should fill bfhselectbox with a list of states', function() {
    var statesHTML = '<div class="bfh-selectbox bfh-states" data-country="US">' +
      '<input type="hidden" value="">' +
      '<a class="bfh-selectbox-toggle" role="button" data-toggle="bfh-selectbox" href="#">' +
      '<span class="bfh-selectbox-option bfh-selectbox-medium" data-option=""></span>' +
      '<b class="caret"></b>' +
      '</a>' +
      '<div class="bfh-selectbox-options">' +
      '<div role="listbox">' +
      '<ul role="option">' +
      '</ul>' +
      '</div>' +
      '</div>' +
      '</div>',
      states = $(statesHTML).bfhstates({country: 'US'});

    ok(states.find('.bfh-selectbox-options > div > ul > li').size() === 66, 'correct number of elements shown');
    ok(states.find('.bfh-selectbox-option').html() === '', 'correct option selected');
    ok(states.val() === '', 'correct element value');
    ok(states.find('.bfh-selectbox-options > div > ul > li > a[data-option="CA"]').html() === 'California', 'valid state shown');
  });
  
  test('should fill bfhselectbox with a list of states with preselected state', function() {
    var statesHTML = '<div class="bfh-selectbox bfh-states" data-country="US" data-state="CA">' +
      '<input type="hidden" value="">' +
      '<a class="bfh-selectbox-toggle" role="button" data-toggle="bfh-selectbox" href="#">' +
      '<span class="bfh-selectbox-option bfh-selectbox-medium" data-option=""></span>' +
      '<b class="caret"></b>' +
      '</a>' +
      '<div class="bfh-selectbox-options">' +
      '<div role="listbox">' +
      '<ul role="option">' +
      '</ul>' +
      '</div>' +
      '</div>' +
      '</div>',
      states = $(statesHTML).bfhstates({country: 'US', state: 'CA'});

    ok(states.find('.bfh-selectbox-options > div > ul > li').size() === 66, 'correct number of elements shown');
    ok(states.find('.bfh-selectbox-option').html() === 'California', 'correct option selected');
    ok(states.val() === 'CA', 'correct element value');
    ok(states.find('.bfh-selectbox-options > div > ul > li > a[data-option="CA"]').html() === 'California', 'valid state shown');
  });
  
  test('should fill bfhselectbox with a list of states without a blank option', function() {
    var statesHTML = '<div class="bfh-selectbox bfh-states" data-country="US" data-state="CA" data-blank="false">' +
      '<input type="hidden" value="">' +
      '<a class="bfh-selectbox-toggle" role="button" data-toggle="bfh-selectbox" href="#">' +
      '<span class="bfh-selectbox-option bfh-selectbox-medium" data-option=""></span>' +
      '<b class="caret"></b>' +
      '</a>' +
      '<div class="bfh-selectbox-options">' +
      '<div role="listbox">' +
      '<ul role="option">' +
      '</ul>' +
      '</div>' +
      '</div>' +
      '</div>',
      states = $(statesHTML).bfhstates({country: 'US', state: 'CA', blank: false});

    ok(states.find('.bfh-selectbox-options > div > ul > li').size() === 65, 'correct number of elements shown');
    ok(states.find('.bfh-selectbox-option').html() === 'California', 'correct option selected');
    ok(states.val() === 'CA', 'correct element value');
    ok(states.find('.bfh-selectbox-options > div > ul > li > a[data-option="CA"]').html() === 'California', 'valid state shown');
  });
  
  test('should fill bfhselectbox with a list of states and work with bfhcountries', function() {
    var statesHTML = '<div id="countries" class="bfh-selectbox bfh-countries" data-country="US">' +
      '<input type="hidden" value="">' +
      '<a class="bfh-selectbox-toggle" role="button" data-toggle="bfh-selectbox" href="#">' +
      '<span class="bfh-selectbox-option bfh-selectbox-medium" data-option=""></span>' +
      '<b class="caret"></b>' +
      '</a>' +
      '<div class="bfh-selectbox-options">' +
      '<div role="listbox">' +
      '<ul role="option">' +
      '</ul>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="bfh-selectbox bfh-states" data-country="countries"' +
      '<input type="hidden" value="">' +
      '<a class="bfh-selectbox-toggle" role="button" data-toggle="bfh-selectbox" href="#">' +
      '<span class="bfh-selectbox-option bfh-selectbox-medium" data-option=""></span>' +
      '<b class="caret"></b>' +
      '</a>' +
      '<div class="bfh-selectbox-options">' +
      '<div role="listbox">' +
      '<ul role="option">' +
      '</ul>' +
      '</div>' +
      '</div>' +
      '</div>',
      states = $(statesHTML).appendTo('#qunit-fixture'),
      first = states.first().bfhcountries({country: 'US'}),
      last = states.last().bfhstates({country: 'countries'});
    
    ok(last.find('.bfh-selectbox-options > div > ul > li').size() === 66, 'correct number of elements shown');
    ok(last.find('.bfh-selectbox-option').html() === '', 'correct option selected');
    ok(last.val() === '', 'correct element value');
    ok(last.find('.bfh-selectbox-options > div > ul > li > a[data-option="CA"]').html() === 'California', 'valid state shown');
    
    first.val('CA').change();
    
    ok(last.find('.bfh-selectbox-options > div > ul > li').size() === 14, 'correct number of elements shown');
    ok(last.find('.bfh-selectbox-option').html() === '', 'correct option selected');
    ok(last.val() === '', 'correct element value');
    ok(last.find('.bfh-selectbox-options > div > ul > li > a[data-option="ON"]').html() === 'Ontario', 'valid state shown');
    
    $('#qunit-fixture').html('');
  });
  
});