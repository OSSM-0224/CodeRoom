import { Loader2 } from "lucide-react";

function Spinner({ className = "" }) {
  return <Loader2 className={`h-5 w-5 animate-spin text-[#57F287] ${className}`} />;
}

export default Spinner;
