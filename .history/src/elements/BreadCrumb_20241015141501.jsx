


const BreadCrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(Boolean); // Splits the URL into parts
    
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
  
          {pathnames.map((value, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
  
            return (
              <React.Fragment key={index}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    // Display the current page without a link if it's the last item
                    <BreadcrumbLink as="span">{value.charAt(0).toUpperCase() + value.slice(1)}</BreadcrumbLink>
                  ) : (
                    // Links to all the previous pages
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
  
  export default BreadCrumb;
  