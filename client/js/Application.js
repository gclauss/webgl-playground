var playgound = {};
playgound.Application = function() {
    
    var self = {};
    
    self.start = function() {
        document.body.textContent = 'Hello world app';
    }
    
    return self;
}