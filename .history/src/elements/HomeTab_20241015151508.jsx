import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function HomeTab() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className=" ">
        <TabsTrigger value="started">Getting Started</TabsTrigger>
        <TabsTrigger value="announcement">Announcements</TabsTrigger>
      </TabsList>
      <TabsContent value="started" className="px-32">
        <Card>
          <CardHeader>
            <CardTitle>Getting started with Ethio Inventory</CardTitle>
            <CardDescription>
              Welcome to Ethio Inventory, your go-to platform for seamless
              inventory management solutions. Whether you’re running a small
              shop or managing large warehouses, our services help you keep
              track of every product with ease. From real-time stock updates to
              automated reordering, we simplify inventory control, so you can
              focus on growing your business. With our intuitive system,
              managing your supplies becomes hassle-free, allowing you to reduce
              waste, prevent shortages, and maximize efficiency. Let Ethio
              Inventory be your reliable partner in optimizing your business
              operations!
            </CardDescription>
          </CardHeader>
          {/* <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent> */}
          <CardFooter>
            <Button>Get Started</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="announcement" className="px-32">
        <Card>
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
            {/* <CardDescription>
              
            </CardDescription> */}
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
                
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
