import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart2,
  Users,
  Package,
  Tag,
  ShoppingCart,
  Star,
  Palette,
  LayoutGrid,
} from "lucide-react";

const sections = [
  { name: "Dashboard", icon: <BarChart2 />, key: "dashboard" },
  { name: "Users", icon: <Users />, key: "users" },
  { name: "Categories", icon: <LayoutGrid />, key: "categories" },
  { name: "Products", icon: <Package />, key: "products" },
  { name: "Orders", icon: <ShoppingCart />, key: "orders" },
  { name: "Colors", icon: <Palette />, key: "colors" },
  { name: "Brands", icon: <Tag />, key: "brands" },
  { name: "Reviews", icon: <Star />, key: "reviews" },
];

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "users":
        return <div>Manage Users</div>;
      case "categories":
        return <div>Manage Categories</div>;
      case "products":
        return <div>Manage Products</div>;
      case "orders":
        return <div>Manage Orders</div>;
      case "colors":
        return <div>Manage Colors</div>;
      case "brands":
        return <div>Manage Brands</div>;
      case "reviews":
        return <div>Manage Reviews</div>;
      case "dashboard":
      default:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-bold">Total Sales</h2>
                <p className="text-2xl">$120,000</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-bold">Orders</h2>
                <p className="text-2xl">850</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-bold">Products</h2>
                <p className="text-2xl">320</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-bold">Users</h2>
                <p className="text-2xl">1,250</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <nav className="space-y-2">
          {sections.map((section) => (
            <Button
              key={section.key}
              variant={activeSection === section.key ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveSection(section.key)}
            >
              <span className="mr-2">{section.icon}</span>
              {section.name}
            </Button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">{renderSection()}</main>
    </div>
  );
}
