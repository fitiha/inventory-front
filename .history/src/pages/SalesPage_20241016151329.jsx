import { Button } from "@/components/ui/button"


const SalesPage = () => {
  return (
    <>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div
           
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no Sales right now
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start selling as soon as you add a product.
              </p>
              <Button className="mt-4">Make Sales</Button>
            </div>
          </div>
        </main>
    </>
  )
}

export default SalesPage;