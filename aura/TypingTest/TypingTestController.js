({
    doInit: function(component) {
        component.set('v.textADefaultplace', 'Start typing...');
        component.set('v.textADefaultvalue', '');
        //debug
        component.set('v.debugString','grays77');  
        window.clocktimer = 0;
    },
    
    handleValueChange : function (component, event, helper) {
        // handle value change
        debugger;
        console.log("old value: " + event.getParam("oldValue"));
        console.log("current value: " + event.getParam("value"));
    },
    
    onKeyUp : function(component, event, helper) {
        var setReset = false;
        // debug
        // component.set('v.debugString3',window.clocktimer);  
        var div = component.find('time').getElement();
        // var textA = component.find("textarea").getElement();
        try {
            var id = event.getSource().getLocalId();
        } catch (e) {
            var id = event.target.id;
        }
        debugger;
        console.log('event.change: ' + event.change);
        
        var	clsStopwatch = function() {
            // Private vars
            var	startAt	= startAt || 0;	// Time of last start / resume. (0 if not running)
            var	lapTime	= lapTime || 0;	// Time on the clock when last stopped in milliseconds
            
            var	now	= function() {
                return (new Date()).getTime();
            };
            
            // Public methods
            // Start or resume
            this.start = function() {
                startAt	= startAt ? startAt : now();
            };
            
            // Stop or pause
            this.stop = function() {
                // If running, update elapsed time otherwise keep it
                lapTime	= startAt ? lapTime + now() - startAt : lapTime;
                startAt	= 0; // Paused
            };
            
            // Reset
            this.reset = function() {
                lapTime = startAt = 0;
            };
            
            // Duration
            this.time = function() {
                return lapTime + (startAt ? now() - startAt : 0);
            };
        };
        
        var stopwatch = component.get('v.stopwatch');
        var x = stopwatch || new clsStopwatch();
        if (!stopwatch) {
            component.set('v.stopwatch', x);
        }
        
        function pad(num, size) {
            var s = "0000" + num;
            return s.substr(s.length - size);
        }
        
        function formatTime(time) {
            var h = 0;
            var m = 0;
            var s = 0;
            var newTime = '';
            
            h = Math.floor( time / (60 * 60 * 1000) );
            time = time % (60 * 60 * 1000);
            m = Math.floor( time / (60 * 1000) );
            time = time % (60 * 1000);
            s = Math.floor( time / 1000 );
            
            newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2); //  + ':' + pad(ms, 3);
            return newTime;
        }
        
        function update() {
            div.innerHTML = formatTime(x.time());
        }
        
        if ((id == 'isTyping') && (window.clocktimer == 0)) {
            x.start();
            window.clocktimer = setInterval(update, 1);
            //timerSet = true;
            // debug
            // component.set("v.debugString1",window.clocktimer);  
            
        }
        
        if ((id == 'resetBtn') && (window.clocktimer != 0)) {
            x.stop();
            clearInterval(window.clocktimer); 
            x.reset();
            debugger;
            var value = component.get('v.textADefaultvalue');
            console.log('value: ' + value);
            component.set('v.textADefaultvalue','');  
            
            //timerSet = false;
            div.innerHTML = formatTime(x.time());
            window.clocktimer = 0;
            // debug
            // component.set("v.debugString1", window.clocktimer); 
            /*
            var action = component.get('c.doInit');
            action.setCallback(component,
                               function(response) {
                                   var state = response.getState();
                                   if (state === 'SUCCESS'){
                                       $A.get('e.force:refreshView').fire();
                                   }        
                               }
                              );
            $A.enqueueAction(action);
            */
            
        }
        
        
    },
    doScriptLoad : function(component, event, helper) {
        
    },
    resetBtn : function(component, event, helper) {
    }
})