var Model = require('../fixtures/crud'),
    assert = require('assert');

describe('Collection', function() {
  var User;

  before(function(done) {
    User = new Model({ adapters: { test: Adapter }}, function(err) {
      if(err) return done(err);
      done();
    });
  });

  describe('.findOne()', function() {

    // Insert a record to find
    before(function(done) {
      User.create({ first_name: 'findOne test'}, function(err) {
        if(err) return done(err);
        done();
      });
    });

    it('should return a single record', function(done) {
      User.findOne({ first_name: 'findOne test' }, function(err, user) {
        assert(!err);
        assert(user.first_name === 'findOne test');
        done();
      });
    });

    it('should return a model instance', function(done) {
      User.findOne({ first_name: 'findOne test' }, function(err, user) {
        assert(user.id);
        assert(typeof user.fullName === 'function');
        assert(toString.call(user.createdAt) == '[object Date]');
        assert(toString.call(user.updatedAt) == '[object Date]');
        done();
      });
    });

    it('should work with no criteria passed in', function(done) {
      User.findOne(function(err, user) {
        assert(!err);
        assert(typeof user.first_name === 'string');
        done();
      });
    });

  });
});
