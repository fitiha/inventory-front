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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function HomeTab() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList >
        <Link throw new Error("");
        >
            <TabsTrigger value="started">Getting Started</TabsTrigger>
        </Link>
        <TabsTrigger value="announcement">Announcements</TabsTrigger>
      </TabsList>
      <TabsContent value="started" className="px-32">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Ethio Inventory</CardTitle>
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
          <CardFooter>
            <Button>Get Started</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="announcement" className="px-32">
        <Card>
          <CardHeader>
            
          </CardHeader>
          <CardContent className="flex justify-center pt-4 pb-16 px-32">
            <div>
              <img
                src="https://img.freepik.com/free-vector/illustrationn-megaphone-monochrome-style-isolated-white-background_1284-38767.jpg?t=st=1728994894~exp=1728998494~hmac=9a49fcd475fa09d206d506a86d790a623964a7ab1c6ab585d9e943a5d6d5a4b4&w=740"
                alt="announcement"
                className="w-64 h-64 mx-auto"
              />
              <div className=" grid text-center justify-center">
                <p className="font-semibold">Never miss an update</p>
                <p> Subscribe to our newsletter</p>
                <div className="mt-4">
                  <Input type="email" placeholder="Email" className="w-full" />
                  <Button className="mt-2 w-full">Subscribe</Button>
                </div>
              </div>
            </div>
          </CardContent>
          {/* <CardFooter>
            
          </CardFooter> */}
        </Card>
      </TabsContent>
    </Tabs>
  );
}
