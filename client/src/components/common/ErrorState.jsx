import { AlertCircle } from "lucide-react";
import Button from "../ui/Button";

function ErrorState({ title = "Something went wrong", description, onRetry }) {
  return (
    <div className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-8 text-center text-rose-200 shadow-2xl">
      <div className="mb-4 flex justify-center">
        <AlertCircle className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-rose-100/70">{description}</p>
      {onRetry ? (
        <div className="mt-6 flex justify-center">
          <Button variant="danger" onClick={onRetry}>
            Try again
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default ErrorState;
