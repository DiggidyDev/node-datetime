var datetime = require('../');
var assert = require('assert');
var time = '2015-01-01 00:00:00.000';
var past = '2014-11-2 00:00:00.000';
var future = '2015-03-01 00:00:00.000';
var dayOffset = 60;
var hourOffset = 25;
var hourPast = '2014-12-30 23:00:00.000';
var hourFuture = '2015-01-02 01:00:00.000';

describe('Tests node-datetime', function () {
	
	it('Can create datetime object with no argument passed', function () {
		var d = datetime.create();
		assert(d);
	});

	it('Can return timestamp in milliseconds', function () {
		var then = new Date(time).getTime();
		var d = datetime.create(time);
		assert.equal(then, d.now());
	});

	it('Can format Y-m-d H:M:S.N', function () {
		var d = datetime.create(time);
		var f = d.format('Y-m-d H:M:S.N');
		assert.equal(f, time);
	});

	it('Can format Y-m-d I:M:S.N', function () {
		var str = '2015-05-01 04:30:00.666';
		var d = datetime.create(str);
		var f = d.format('Y-m-d I:M:S.N');
		assert.equal(str, f);
	});

	it('Can return y/m/d', function () {
		var d = datetime.create(time);
		var f = d.format('y/m/d');
		assert.equal(f, '15/01/01');
	});
	
	it('Can return name of week', function () {
		var d = datetime.create(time);
		var f = d.format('w W');
		assert.equal('Thu Thursday', f);
	});

	it('Can return a short name of a month', function () {
		var d = datetime.create(time);
		var m = d.format('n');
		assert.equal('Jan', m);	
	});

	it('Can return a full name of a month', function () {
		var d = datetime.create(time);
		var m = d.format('f');
		assert.equal('January', m);	
	});

	it('Can offset ' + dayOffset + ' days in the past', function () {
		var d = datetime.create(time);
		d.offsetInDays(-1 * dayOffset);
		assert(past, d.format('Y-m-d H:M:S.N'));
	});

	it('Can offset ' + dayOffset + ' days in the future', function () {
		var d = datetime.create(time);
		d.offsetInDays(dayOffset);
		assert(future, d.format('Y-m-d H:M:S.N'));
	});

	it('Can offset ' + hourOffset + ' hours in the past', function () {
		var d = datetime.create(time);
		d.offsetInHours(-1 * hourOffset);
		assert.equal(d.format('Y-m-d H:M:S.N'), hourPast);
	});

	it('Can offset ' + hourOffset + ' hours in the future', function () {
		var d = datetime.create(time);
		d.offsetInHours(hourOffset);
		assert.equal(d.format('Y-m-d H:M:S.N'), hourFuture);
	});

	it('Can get instances of DateTime object between 2015-04-12 and 2015-05-12', function () {
		var start = datetime.create('2015-04-12');
		var end = datetime.create('2015-05-12');
		var format = 'Y-m-d H:M:S.N';
		var list = start.getDatesInRange(end);
		for (var i = 0, len = list.length; i < len; i++) {
			var day = list[i];
			var check = datetime.create(start.now());
			check.offsetInDays(i);
			assert.equal(day.format(format), check.format(format));
		}
	});

	it('Can get instances of DateTime object between 2015-05-12 and 2015-04-12', function () {
		var start = datetime.create('2015-04-12');
		var end = datetime.create('2015-05-12');
		var format = 'Y-m-d H:M:S.N';
		var list = start.getDatesInRange(end);
		for (var i = list.length - 1; i >= 0; i--) {
			var day = list[i];
			var check = datetime.create(start.now());
			check.offsetInDays(i);
			assert.equal(day.format(format), check.format(format));
		}
	});

	it('Can use default format', function () {
		var dateStr = '2015-04-30 11:59:59.999';
		var dt = datetime.create(dateStr, 'Y-m-d H:M:S.N');
		assert.equal(dateStr, dt.format());
	});

	 it('Can create an increment type timed data', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'inc'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 10);
        });

        it('Can not create an increment type timed data w/ invalid init', function () {
                var conf = {
                        init: '10',
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'inc'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

        it('Can not create an increment type timed data w/ invalid max', function () {
                var conf = {
                        init: 10,
                        max: 0,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'inc'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

	 it('Can not create an increment type timed data w/ invalid min', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: -1,
                        interval: 10,
                        step: 1,
                        type: 'inc'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

        it('Can not create an increment type timed data w/ invalid interval', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: [1, 2, 3],
                        step: 1,
                        type: 'inc'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

        it('Can not create an increment type timed data w/ invalid step', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 100,
                        type: 'inc'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

        it('Can not create an increment type timed data w/ invalid type', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'foo'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

	 it('Can create an increment type timed data and decrement', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'inc'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 10);

                var success = timedData.dec(5);

                assert.equal(success, true);
                assert.equal(timedData.getValue(), 5);
        });

        it('Can create an increment type timed data and cannot decrement beyond min', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'inc'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 10);

                var success = timedData.dec(100);

                assert.equal(success, false);
                assert.equal(timedData.getValue(), 10);
        });

        it('Can create an increment type timed data and decrement and recover by 1 after 10 milliseconds', function (done) {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'inc'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 10);

                var success = timedData.dec(5);

                assert.equal(success, true);
                assert.equal(timedData.getValue(), 5);

                setTimeout(function () {
                        assert.equal(timedData.getValue(), 6);
                        done();
                }, 10);
        });

	 it('Can create an increment type timed data and decrement and recover by 5 after 50 milliseconds', function (done) {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'inc'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 10);

                var success = timedData.dec(5);

                assert.equal(success, true);
                assert.equal(timedData.getValue(), 5);

                setTimeout(function () {
                        assert.equal(timedData.getValue(), 10);
                        done();
                }, 50);
        });

        it('Can create an increment type timed data and decrement and cannot recover beyond max after 60 milliseconds', function (done) {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'inc'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 10);

                var success = timedData.dec(5);

                assert.equal(success, true);
                assert.equal(timedData.getValue(), 5);

                setTimeout(function () {
                        assert.equal(timedData.getValue(), 10);
                        done();
                }, 60);
        });

        it('Can create an decrement type timed data', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'dec'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 10);
        });

	 it('Can not create an decrement type timed data w/ invalid init', function () {
                var conf = {
                        init: '10',
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'dec'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

        it('Can not create an deccrement type timed data w/ invalid max', function () {
                var conf = {
                        init: 10,
                        max: 0,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'dec'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

        it('Can not create an increment type timed data w/ invalid min', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: -1,
                        interval: 10,
                        step: 1,
                        type: 'dec'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

        it('Can not create an decrement type timed data w/ invalid interval', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: [1, 2, 3],
                        step: 1,
                        type: 'dec'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

	 it('Can not create an decrement type timed data w/ invalid step', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 100,
                        type: 'dec'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

        it('Can not create an decrement type timed data w/ invalid type', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'foo'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

        it('Can create an decrement type timed data and increment', function () {
                var conf = {
                        init: 9,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'dec'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 9);

                var success = timedData.inc(1);

                assert.equal(success, true);
                assert.equal(timedData.getValue(), 10);
        });

        it('Can create an decrement type timed data and cannot increment beyond max', function () {
                var conf = {
                        init: 9,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'dec'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 9);

                var success = timedData.inc(100);

                assert.equal(success, false);
                assert.equal(timedData.getValue(), 9);
        });

	it('Can create an decrement type timed data by 1 after 10 milliseconds', function (done) {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'dec'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 10);

                setTimeout(function () {
                        assert.equal(timedData.getValue(), 9);
                        done();
                }, 10);
        });

        it('Can create an decrement type timed data and decrement and derecements by 5 after 50 milliseconds', function (done) {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'dec'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 10);

                var success = timedData.dec(5);

                assert.equal(success, true);
                assert.equal(timedData.getValue(), 5);

                setTimeout(function () {
                        assert.equal(timedData.getValue(), 0);
                        done();
                }, 50);
        });

        it('Can create an decrement type timed data and decrement and cannot decrement beyond min after 60 milliseconds', function (done) {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'dec'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 10);

                var success = timedData.dec(5);

                assert.equal(success, true);
                assert.equal(timedData.getValue(), 5);

                setTimeout(function () {
                        assert.equal(timedData.getValue(), 0);
                        done();
                }, 60);
        });

});
