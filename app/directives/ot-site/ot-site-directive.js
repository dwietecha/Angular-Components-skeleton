'use strict';

angular.module('otSite', [])
    .directive("otSite", (MultiTransclude) => {
        return {
            scope:{},
            transclude: true,
            link: (scope, iElem, iAttrs, ctrl, transclude)=>{
                MultiTransclude.transclude(iElem, transclude);
            },
            templateUrl: 'directives/ot-site/ot-site-directive.html'
        };
    })
    .factory("MultiTransclude",() => {
        return {
            transclude: (iElem, transcludeFn) => {
                this.iElem = iElem;
                transcludeFn((clone)=>{
                    angular.forEach(clone, (cloneEl)=>{
                        if(typeof cloneEl.attributes !== 'undefined'){   
                            debugger; 
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


