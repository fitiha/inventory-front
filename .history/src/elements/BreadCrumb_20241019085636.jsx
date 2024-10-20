import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

const breadcrumbStartMap = {
  "/inventory": "Inventory",
  "/customers": "Customers",
  "/analytics": "Analytics",
  "/setting": "Setting",
};

const BreadCrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);
  let baseRoute = "/";
  let baseLabel = "Home";

  for (const key in breadcrumbStartMap) {
    if (location.pathname.startsWith(key)) {
      baseRoute = key;
      baseLabel = breadcrumbStartMap[key];
      break;
    }
  }

  const pathSegments =
    baseRoute === "/"
      ? pathnames
      : pathnames.slice(baseRoute.split("/").filter(Boolean).length);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home / Root */}
        <BreadcrumbItem>
          <Link to={baseRoute}>{baseLabel}</Link>
        </BreadcrumbItem>

        {pathSegments.map((value, index) => {
          const routeTo = `${baseRoute}/${pathSegments
            .slice(0, index + 1)
            .join("/")}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <span>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </span>
                ) : (
                  <Link to={routeTo}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </Link>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
