using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Api.Hubs
{
    public class GameHub : Hub
    {
        public async Task SendMessage()
        {
            await Clients.All.SendAsync("ReceiveMessage");
        }
    }
}