
// productId,userId,quantity 

export default class CartItemModel{
    constructor(productID,userID,quantity){
        this.productID = productID;
        this.userID = userID;
        this.quantity= quantity
    }
    static add (productID,userID,quantity){
        const cartItem = new CartItemModel(productID,userID,quantity);
        cartItem.id = cartItems.length+1;
        cartItems.push(cartItem);
        return cartItems;
    }
    static get(userID){
        return cartItems.filter((i)=>i.userID == userID);
    }
    static delete(cartItemID,userID){
        const cartItemIndex = cartItems.findIndex((i)=>i.id == cartItemID && i.userID == userID);
        if(cartItemIndex == -1){
            return 'Item not found'
        }else{
            cartItems.splice(cartItemIndex,1);
        }
    }

   
}
let cartItems = [
        new CartItemModel(1,2,1,1),
        new CartItemModel(1,1,2,2),
]