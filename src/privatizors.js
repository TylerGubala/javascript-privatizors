(
    function(exports){
        (typeof Proxy.prototype === 'null'? Proxy.prototype={}: null);
        class Private extends Proxy{
            constructor(object={}, handler={}, isPrivate=function(property){return property.startsWith('_');}){
                super(object, Object.assign( {}, handler, {
                    get: function(target, property, reciever){
                        if(isPrivate(property)){
                            return undefined;
                        }
                        else{
                            return ("get" in handler? handler.get(target, property, reciever) : target["property"])
                        }
                    },
                    set: function(target, property, value, reciever){
                        if(isPrivate(property)){
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
                        if (isPrivate(property)){
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
                        if(isPrivate(property)){
                            return false;
                        }
                        else{
                            return ("defineProperty" in handler? handler.defineProperty(target, property, descriptor): Object.defineProperty(target, property, descriptor));
                        }
                    },
                    deleteProperty: function(target, property){
                        if (isPrivate(property)){
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
                            return Object.keys(target).filter(function(key){return (!isPrivate(key))});
                        }
                    },
                    getOwnPropertyDescriptor: function(target, property){
                        if(isPrivate(property)){
                            return undefined;
                        }
                        else{
                            return ("getOwnPropertyDescriptor" in handler? handler.getOwnPropertyDescriptor(...arguments) : Object.getOwnPropertyDescriptor(target, property));
                        }
                    }
                }))
            }
        }
        exports.Private = Private;
    }
)(typeof exports === 'undefined' ? this['Privatizors']={} : exports);
