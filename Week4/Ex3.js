class Item {
    constructor(name, discount) {
        this.name = name;
        this.discount = discount;
    }
    calcPrice() {
        return Item.prototype.getBasePrice() * (100 - this.discount ) / 100;
    }
}

Item.prototype.getBasePrice = function() {return 1000;};

let i1 = new Item("Продук1", 30);

console.log(i1.calcPrice());