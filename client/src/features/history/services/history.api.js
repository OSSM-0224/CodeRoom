export const historyApi = {
  async getHistory() {
    return [
      { id: 1, user: "Asha", action: "joined the room", time: "2m ago" },
      { id: 2, user: "Mina", action: "updated the editor", time: "7m ago" },
      { id: 3, user: "Arun", action: "shared the room link", time: "10m ago" },
    ];
  },
};
