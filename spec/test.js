//测试ajax()函数是否能正常运行
describe("ajax", function() {
    it("ajax() works well.", function() {
          var result = ajax();
          expect(result).not.toThrow;
    });
});

//测试不同情况下wordladder()的返回结果
describe("wordladder", function() {
    it("Word1 and Word2 are the same.", function() {
        var dic = new Set(["data","date","cate","cade","code", "have", "fun"]);
        var word1 = "code";
        var word2 = "code";
        var result = wordladder(dic, word1, word2 );
        expect(result).toEqual("Word1 and Word2 are the same.");
    });
    it("Word1 and Word2 are of different length.", function() {
        var dic = new Set(["data","date","cate","cade","code","fun","have"]);
        var word1 = "code";
        var word2 = "fun";
        var result = wordladder(dic, word1, word2 );
        expect(result).toEqual("Word1 and Word2 are of different length.");
    });
    it("Invalid Word1.", function() {
        var dic = new Set(["data","date","cate","cade","code","have", "fun"]);
        var word1 = "home";
        var word2 = "code";
        var result = wordladder(dic, word1, word2 );
        expect(result).toEqual("Invalid Word1.");
    });
    it("Invalid Word2.", function() {
        var dic = new Set(["data","date","cate","cade","code","have","fun"]);
        var word1 = "code";
        var word2 = "doom";
        var result = wordladder(dic, word1, word2 );
        expect(result).toEqual("Invalid Word2.");
    });
    it("Invalid Word1 and Word2.", function() {
        var dic = new Set(["data","date","cate","cade","code","fun","have"]);
        var word1 = "make";
        var word2 = "work";
        var result = wordladder(dic, word1, word2 );
        expect(result).toEqual("Invalid Word1 and Word2.");
    });
    it("There is no way.", function() {
        var dic = new Set(["data","date","cate","cade","code","fun","have"]);
        var word1 = "have";
        var word2 = "data";
        var result = wordladder(dic, word1, word2 );
        expect(result).toEqual("There is no way.");
    });
    it("data => date => cate => cade => code", function() {
        var dic = new Set(["data","date","cate","cade","code","fun","have"]);
        var word1 = "code";
        var word2 = "data";
        var result = wordladder(dic, word1, word2 );
        expect(result).toEqual("data => date => cate => cade => code");
    });
});


