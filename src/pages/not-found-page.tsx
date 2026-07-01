import { Link } from "react-router-dom";

import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <PageContainer>
      <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-sm font-medium text-blue-600">
          404
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          Page not found
        </h1>

        <p className="mt-3 max-w-md text-muted-foreground">
          The page you are looking for doesn't exist or may have been moved.
        </p>

        <Button
          asChild
          className="mt-8"
        >
          <Link to="/">
            Back to home
          </Link>
        </Button>
      </section>
    </PageContainer>
  );
};

export default NotFoundPage;
