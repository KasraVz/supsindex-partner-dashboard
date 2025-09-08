import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useOrders } from "@/contexts/OrderContext";
import { useToast } from "@/hooks/use-toast";

export function Cart() {
  const { cartItems, removeFromCart, addToCart, clearCart, createOrder } = useOrders();
  const { toast } = useToast();

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const handleQuantityChange = (item: any, change: number) => {
    if (change > 0) {
      addToCart({ ...item, quantity: 1 });
    } else {
      // Remove one quantity or remove item completely
      const currentQuantity = item.quantity || 1;
      if (currentQuantity <= 1) {
        removeFromCart(item.id);
      } else {
        // We'd need to modify the context to handle quantity decrease
        // For now, just remove the item
        removeFromCart(item.id);
        addToCart({ ...item, quantity: currentQuantity - 1 });
      }
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    const orderId = createOrder();
    toast({
      title: "Order Created",
      description: `Order ${orderId} has been created successfully.`,
    });
  };

  // Group items by bundle
  const groupedItems = cartItems.reduce((acc, item) => {
    if (item.bundleId) {
      if (!acc.bundles[item.bundleId]) {
        acc.bundles[item.bundleId] = [];
      }
      acc.bundles[item.bundleId].push(item);
    } else {
      acc.individual.push(item);
    }
    return acc;
  }, { bundles: {} as Record<string, any[]>, individual: [] as any[] });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-4 w-4" />
          <h3 className="font-semibold">Shopping Cart</h3>
          {cartItems.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {cartItems.length}
            </Badge>
          )}
        </div>
        {cartItems.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearCart}>
            Clear all
          </Button>
        )}
      </div>

      <ScrollArea className="h-80">
        {cartItems.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            Your cart is empty
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {/* Individual Items */}
            {groupedItems.individual.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                  <p className="text-sm font-semibold text-brand-orange">${item.price}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleQuantityChange(item, -1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm w-6 text-center">{item.quantity || 1}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleQuantityChange(item, 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-destructive hover:text-destructive"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}

            {/* Bundle Items */}
            {Object.entries(groupedItems.bundles).map(([bundleId, items]) => (
              <div key={bundleId} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">Bundle</Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive hover:text-destructive"
                    onClick={() => items.forEach(item => removeFromCart(item.id))}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                {items.map((item, index) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span>{item.name}</span>
                    <span className="font-medium">${item.price}</span>
                  </div>
                ))}
                <Separator className="my-2" />
                <div className="flex justify-between items-center font-semibold text-sm">
                  <span>Bundle Total:</span>
                  <span className="text-brand-orange">
                    ${items.reduce((sum, item) => sum + item.price, 0)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {cartItems.length > 0 && (
        <div className="p-4 border-t space-y-3">
          <div className="flex justify-between items-center font-semibold">
            <span>Total:</span>
            <span className="text-lg text-brand-orange">${getCartTotal()}</span>
          </div>
          <Button 
            className="w-full bg-gradient-to-r from-brand-orange to-brand-orange-light hover:from-brand-orange-dark hover:to-brand-orange"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
}