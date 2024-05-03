import { ErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError() as ErrorResponse;

  return (
    <div className="grid min-h-[100dvh] place-content-center">
      <h1 className="text-center text-4xl font-semibold">{error.status}</h1>
      <p className="mt-4">{error.data}</p>
    </div>
  );
};

export default ErrorPage;
