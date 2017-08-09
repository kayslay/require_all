/**
 * Created by kayslay on 6/27/17.
 */
const expect = require('chai').expect;
let requireAll = require('../');
describe("Test the sync behaviour", function () {
    describe("folder is a string", function () {
        "use strict";
        it("Should return an Object", () => {
            "use strict";
            const required = requireAll(__dirname + '/../dummy_module/');
            expect(required).to.be.an('Object')
        });

        it("Should return an Error", () => {
            "use strict";
            try {
                const required = requireAll(__dirname + '/../dummy_module/')
            } catch (e) {
                expect(e).to.be.an('Error')
            }

        });
    });

    describe("folder is an array", function () {
        "use strict";
        it("Should return an Object", () => {
            "use strict";
            const required = requireAll([__dirname + '/../dummy_module/', __dirname + '/../dummy/'],{depth:true});
            expect(required).to.be.an('Object')
        });

        it("Should return an Error", () => {
            "use strict";
            try {
                const required = requireAll([__dirname + '/../dumy_module/', __dirname + '/../dummy/'])
            } catch (e) {
                expect(e).to.be.an('Error')
            }
        })
    });

    describe('Testing the values returned', function () {
        it('Should return whats my name?', () => {
            "use strict";
            const required = requireAll([__dirname + '/../dummy_module/', __dirname + '/../dummy/']);
            const deal = required['dummy_module']['deal'];
            expect(deal.what()).to.be.equal("whats my name?")
        });

        it('Should return cool bro', () => {
            "use strict";
            const required = requireAll([__dirname + '/../dummy_module/', __dirname + '/../dummy/']);

            const index = required['dummy_module']['index'];
            expect(index).to.be.equal("cool bro")
        })
    });

});

