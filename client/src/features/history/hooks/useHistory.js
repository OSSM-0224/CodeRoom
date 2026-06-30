import { useEffect, useState } from "react";

export function useHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setHistory([
        { id: 1, user: "Asha", action: "joined the room", time: "2m ago" },
        { id: 2, user: "Mina", action: "updated the editor", time: "7m ago" },
        { id: 3, user: "Arun", action: "shared the room link", time: "10m ago" },
      ]);
      setLoading(false);
    }, 300);

    return () => window.clearTimeout(timeout);
  }, []);

  return { history, loading };
}
