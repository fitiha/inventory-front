import { useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const breadcrumbStartMap = {
  "/orders": "Orders",
  "/products": "Products",
    "/customers": "Customers",
    "/analytics": "Analytics",
  "/setting": "Profile",
};

const BreadcrumbDemo = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);
  let baseRoute = "/";
  let baseLabel = "Home";

  // Check if the route should start from a different root
  for (const key in breadcrumbStartMap) {
    if (location.pathname.startsWith(key)) {
      baseRoute = key;
      baseLabel = breadcrumbStartMap[key];
      break;
    }
  }

  // Adjust pathnames for routes that start from custom roots
  const pathSegments = baseRoute === "/" ? pathnames : pathnames.slice(baseRoute.split("/").filter(Boolean).length);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Dynamic Root Link */}
        <BreadcrumbItem>
          <BreadcrumbLink href={baseRoute}>{baseLabel}</BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.map((value, index) => {
          const routeTo = `${baseRoute}/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbLink as="span">{value.charAt(0).toUpperCase() + value.slice(1)}</BreadcrumbLink>
                ) : (
                  <BreadcrumbLink href={routeTo}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbDemo;
