'use strict';

        angular.module('myApp', [
                'ngRoute',
                'otSite'
        ])
        .controller("AppController", ($scope) => {
            $scope.areas = {
                list: [
                    "Floorplan",
                    "Combinations",
                    "Schedule",
                    "Publish"
                ],
                current: "Floorplan"
            };
            $scope.apps = {
                list: [
                    "Marketing",
                    "Planing",
                    "Reservations",
                    "Settings"
                ],
                current: "Marketing"
            };
        })
        .factory("MultiTransclude",() => {
            return {
                transclude: (iElem, transcludeFn) => {
                    this.iElem = iElem;
                    transcludeFn((clone)=>{
                        angular.forEach(clone, (cloneEl)=>{
                            if(typeof cloneEl.attributes !== 'undefined' && cloneEl.tagName !== 'VIEW'){   
                                var tId = cloneEl.attributes["transclude-to"].value;
                                var target = this.iElem.find('[transclude-id="' + tId +'"]')
                                if(target.length) {
                                    target.append(cloneEl);
                                } else {
                                    cloneEl.remove();
                                    throw new Error('Target not found. Please specyfy correct transclude-to attribute.');
                                }
                            }
                        });
                    });
                }
            };
        })

        .directive("otSiteBody",()=>{
            return {
                scope:{
                    app: '=',
                    area: '='
                },
                link: (scope)=>{
                    var allOptions = {
                        "Marketing": {
                            "Floorplan" : [
                                    'Marketing/Floorplan option1',
                                    'Marketing/Floorplan option2',
                                    'Marketing/Floorplan option3',
                                    'Marketing/Floorplan option4'
                            ],
                            "Combinations" : [
                                    'Marketing/Combinations option1',
                                    'Marketing/Combinations option2',
                                    'Marketing/Combinations option3',
                                    'Marketing/Combinations option4'
                            ],
                            "Schedule": [
                                    'Marketing/Schedule option1',
                                    'Marketing/Schedule option2',
                                    'Marketing/Schedule option3',
                                    'Marketing/Schedule option4'
                            ],
                            "Publish": [
                                    'Marketing/Publish option1',
                                    'Marketing/Publish option2',
                                    'Marketing/Publish option3',
                                    'Marketing/Publish option4'
                            ]
                        },
                        "Planing":{
                            "Floorplan" : [
                                    'Planing/Floorplan option1',
                                    'Planing/Floorplan option2',
                                    'Planing/Floorplan option3',
                                    'Planing/Floorplan option4'
                            ],
                            "Combinations" : [
                                    'Planing/Combinations option1',
                                    'Planing/Combinations option2',
                                    'Planing/Combinations option3',
                                    'Planing/Combinations option4'
                            ],
                            "Schedule": [
                                    'Planing/Schedule option1',
                                    'Planing/Schedule option2',
                                    'Planing/Schedule option3',
                                    'Planing/Schedule option4'
                            ],
                            "Publish": [
                                    'Planing/Publish option1',
                                    'Planing/Publish option2',
                                    'Planing/Publish option3',
                                    'Planing/Publish option4'
                            ]
                        },
                        "Reservations":{
                            "Floorplan" : [
                                    'Reservations/Floorplan option1',
                                    'Reservations/Floorplan option2',
                                    'Reservations/Floorplan option3',
                                    'Reservations/Floorplan option4'
                            ],
                            "Combinations" : [
                                    'Reservations/Combinations option1',
                                    'Reservations/Combinations option2',
                                    'Reservations/Combinations option3',
                                    'Reservations/Combinations option4'
                            ],
                            "Schedule": [
                                    'Reservations/Schedule option1',
                                    'Reservations/Schedule option2',
                                    'Reservations/Schedule option3',
                                    'Reservations/Schedule option4'
                            ],
                            "Publish": [
                                    'Reservations/Publish option1',
                                    'Reservations/Publish option2',
                                    'Reservations/Publish option3',
                                    'Reservations/Publish option4'
                            ]
                        },
                        "Settings":{
                            "Floorplan" : [
                                    'Settings/Floorplan option1',
                                    'Settings/Floorplan option2',
                                    'Settings/Floorplan option3',
                                    'Settings/Floorplan option4'
                            ],
                            "Combinations" : [
                                    'Settings/Combinations option1',
                                    'Settings/Combinations option2',
                                    'Settings/Combinations option3',
                                    'Settings/Combinations option4'
                            ],
                            "Schedule": [
                                    'Settings/Schedule option1',
                                    'Settings/Schedule option2',
                                    'Settings/Schedule option3',
                                    'Settings/Schedule option4'
                            ],
                            "Publish": [
                                    'Settings/Publish option1',
                                    'Settings/Publish option2',
                                    'Settings/Publish option3',
                                    'Settings/Publish option4'
                            ]
                        }
                    };
                    scope.$watch('app', function(newValue, oldValue) {
                        scope.updateOptions();
                    });
                    scope.$watch('area', function(newValue, oldValue) {
                        scope.updateOptions();
                    });
                    scope.updateOptions = () => {
                        scope.options={
                            list: allOptions[scope.app][scope.area],
                            selected: allOptions[scope.app][scope.area][0]
                        }
                    };

                },
                template: '<p id="app-info">App: {{app}}</p><p  id="area-info">Area: {{area}}</p><p><ot-list id="options-list" items="options.list" selected="options.selected"></ot-list></p>'
            }
        })
        .directive("otList", ()=>{
            return {
                scope: {
                    items: '=',
                    selected: '='
                },
                template: '<ul>\
                            <li ng-repeat="item in items"\
                            ng-bind="item"\
                            ng-class="{otSelected: item === selected}"\
                            ng-click="selectItem(item)">\
                            </li>\
                           </ul>',
                link: (scope, elem, attrs)=>{                    
                    scope.selectItem = (item)=>{
                        scope.selected = item;
                    };
                }
            };
        })
        .directive("otDropdown", ()=>{
            return {
             scope: {},
             transclude: true,
             template: '<div ng-click="toggleTarget()" ng-transclude></div>',
             link: (scope)=> {
                    scope.targetOpen = false;
                    scope.toggleTarget = () => {
                     scope.targetOpen = !scope.targetOpen;
                    }     
                }
            }
        })
        .directive("otTarget", ()=>{
            return {
                transclude: true,
                template: '<div ng-transclude ng-show="$parent.targetOpen" ></div>'
            }
        })
        .directive("otTrigger", ()=>{
            return {
                transclude: true,
                template: '<div ng-transclude "></div>'
                }
        });

