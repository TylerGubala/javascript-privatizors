(
    function(exports){
        (typeof Proxy.prototype === 'undefined'? Proxy.prototype={}: null);
        class Private extends Proxy{
            constructor(object, handler){
                super(object, Object.assign( {}, handler, {
                    get: function(target, property, reciever){
                        if(property.startsWith("_")){
                            return undefined;
                        }
                        else{
                            return ("get" in handler? handler.get(target, property, reciever) : target["property"])
                        }
                    },
                    set: function(target, property, value, reciever){
                        if(property.startsWith("_")){
                            return false;
                        }
                        else{
                            if("set" in handler){
                                return handler.set(target, property, value, reciever)
                            }
                            else{
                                target[property] = value;
                                return true;
                            }
                        }
                    },
                    has: function(target, property){
                        if (property.startsWith("_")){
                            return false;
                        }
                        else{
                            if ("has" in handler){
                                return handler.has(target, property);
                            }
                            else{
                                return property in handler;
                            }
                        }
                    },
                    defineProperty: function(target, property, descriptor){
                        if(property.startsWith("_")){
                            return false;
                        }
                        else{
                            return ("defineProperty" in handler? handler.defineProperty(target, property, descriptor): Object.defineProperty(target, property, descriptor));
                        }
                    },
                    deleteProperty: function(target, property){
                        if (property.startsWith("_")){
                            return false;
                        }
                        else{
                            if ("deleteProperty" in handler){
                                return handler.deleteProperty(target, property);
                            }
                            else{
                                delete target[property];
                                return true;
                            }
                        }
                    },
                    ownKeys: function(target){
                        if ("ownKeys" in handler){
                            return handler.ownKeys(target);
                        }
                        else{
                            return Object.keys(target).filter(function(key){return (!key.startsWith("_"))});
                        }
                    }
                }))
            }
        }
        exports.Private = Private;
    }
)(typeof exports === 'undefined' ? this['Privatizors']={} : exports);
