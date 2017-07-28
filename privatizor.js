(
    function(exports){
        (typeof Proxy.prototype === 'undefined'? Proxy.prototype={}: null);
        class Private extends Proxy{
            constructor(object, handler){
                Object.assign(handler, {

                })
                super(object, {
                    apply: ('apply' in handler? handler.apply : undefined),
                    construct: ('construct' in handler? handler.construct : undefined),
                    defineProperty: function(target, property){

                    },
                    deleteProperty: function(target, property){

                    },
                    get: function(target, property, reciever){
                        if(property.startsWith('_')){
                            return
                        }
                        else{
                            return ('get' in handler? handler.get(target, property, handler) : target[property]);
                        }
                    }
                })
            }
        }
        exports.Private = Private;
    }
)(typeof exports === 'undefined' ? this['Privatizors']={} : exports);