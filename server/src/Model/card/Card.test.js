const Card = require("./Card");

describe("Create Card", () => {
    test("Card should be 2 of Hearts", () => {
        const testCard = {
            value: 2,
            suit: "Hearts"
        };

        expect(new Card(2, "Hearts")).toEqual(testCard);
    });

    test("Card should be 5 of Spades", () => {
        const testCard = {
            value: 5,
            suit: "Spades"
        };

        expect(new Card(5, "Spades")).toEqual(testCard);
    });

    test("Card value cannot be of type String", () => {
        expect(() => {
            new Card("hel", "Spades");
        }).toThrow(TypeError);
    });

    test("Card suit cannot be of type Number", () => {
        expect(() => {
            new Card(5, 10);
        }).toThrow(TypeError);
    });

    test("Card suit should be Spades", () => {
        const testCard = new Card(5, "Spades");

        expect(testCard.suit).toEqual("Spades");
    });

    test("Card value should be 5", () => {
        const testCard = new Card(5, "Spades");

        expect(testCard.value).toEqual(5);
    });
});
