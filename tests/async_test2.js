/**
 * Created by kayslay on 6/27/17.
 */
const expect = require('chai').expect;
const requireAll = require('../');

describe('Test the async behaviour when a Promise Object is returned', function () {
    it('Should return an Object', (done) => {
        "use strict";
        requireAll([__dirname + '/../dummy_module/', __dirname + '/../dummy/'], 'async')
            .then(obj => {
                expect(obj).to.be.an('Object');
                done()
            })
    });

    it('Should return an Error', (done) => {
        "use strict";
        requireAll([__dirname + '/../dumy_module/', __dirname + '/../dummy/'], 'async')
            .catch(err => {
                expect(err).to.be.an('Error');
                done()
            })
    });

    it('Should return an Object', (done) => {
        "use strict";
        requireAll(__dirname + '/../dummy_module/', 'async')
            .then(obj => {
                expect(obj).to.be.an('Object');
                done()
            })
    });

    it('Should return an Error', (done) => {
        "use strict";
        requireAll([__dirname + '/../dummy_mdule/', __dirname + '/../dummy/'], 'async')
            .catch(err => {
                expect(err).to.be.an('Error');
                done()
            })
    });
});

describe("Testing the value returned: async Promise test", function () {
    it('Should return whats my name?', (done) => {
        "use strict";
        requireAll(__dirname + '/../dummy_module/', 'async')
            .then(obj => {
                const deal = obj.dummy_module['deal'];
                expect(deal.what()).to.be.equal('whats my name?');
                done()
            })
    });

    it('Should return cool bro', (done) => {
        "use strict";
        requireAll(__dirname + '/../dummy_module/', 'async')
            .then(obj => {
                const index = obj['dummy_module']['index'];
                expect(index).to.be.equal("cool bro");
                done()
            })
    })
});