import { ShoppingCart, Package, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useOrders } from "@/contexts/OrderContext";
import { Link } from "react-router-dom";

export default function Orders() {
  const { orders, addToCart } = useOrders();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const sampleAssessments = [
    { id: "1", name: "React Development Assessment", price: 99, type: "assessment" as const },
    { id: "2", name: "Node.js Backend Assessment", price: 89, type: "assessment" as const },
    { id: "3", name: "Full Stack Bundle", price: 199, type: "bundle" as const },
    { id: "4", name: "Database Design Course", price: 79, type: "course" as const },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-8 w-8" />
            My Orders
          </h1>
          <p className="text-muted-foreground">Track your assessment orders and purchases</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-brand-orange to-brand-orange-light hover:from-brand-orange-dark hover:to-brand-orange">
          <Link to="/dashboard/orders/new">Order New Assessment</Link>
        </Button>
      </div>

      {/* Quick Add to Cart Section */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Assessments</CardTitle>
          <CardDescription>Quick add popular assessments to your cart</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sampleAssessments.map((assessment) => (
              <div key={assessment.id} className="border rounded-lg p-4 space-y-3">
                <div>
                  <h4 className="font-medium">{assessment.name}</h4>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {assessment.type}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-brand-orange">
                    ${assessment.price}
                  </span>
                  <Button 
                    size="sm" 
                    onClick={() => addToCart(assessment)}
                    className="bg-gradient-to-r from-brand-orange to-brand-orange-light hover:from-brand-orange-dark hover:to-brand-orange"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>
            {orders.length === 0 ? "No orders yet" : `${orders.length} orders found`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="text-center py-8 space-y-4">
              <Package className="h-16 w-16 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">No orders yet</h3>
                <p className="text-muted-foreground">
                  When you place your first order, it will appear here.
                </p>
              </div>
              <Button asChild>
                <Link to="/dashboard/orders/new">Place Your First Order</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">Order {order.id}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Placed on {order.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-brand-orange">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Items:</h4>
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm bg-muted/50 p-2 rounded">
                        <span>{item.name}</span>
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}