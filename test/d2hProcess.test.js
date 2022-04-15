let d2hProcess = require('../d2hProcess');
describe('Test D2H Script',()=>{
    test('Welcome Message',()=>{
        const data = new d2hProcess().initD2hProcess();
        console.log("Data",data);
        expect(data).toMatch("hello");
    });
})