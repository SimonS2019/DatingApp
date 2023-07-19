using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class MessageHub : Hub
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IUserRepository _userRepository;

        public MessageHub(IMessageRepository messageRepository, IUserRepository userRepository,
                   IMapper mapper, IHubContext<PresenceHub> presenceHub)
        {
            _userRepository = userRepository;
            _messageRepository = messageRepository;

        }
        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var otherUser = httpContext.Request.Query["user"];
            var groupName = GetGroupName(Context.User.GetUsername(), otherUser);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            // var group = await AddToGroup(groupName);

            // await Clients.Group(groupName).SendAsync("UpdatedGroup", group);

            var messages = await _messageRepository
                .GetMessageThread(Context.User.GetUsername(), otherUser);

            await Clients.Caller.SendAsync("ReceiveMessageThread", messages);
        }
        // public override async Task OnDisconnectedAsync(Exception exception)
        public override  Task OnDisconnectedAsync(Exception exception)
        {
            // var group = await RemoveFromMessageGroup();
            // await Clients.Group(group.Name).SendAsync("UpdatedGroup");
            // await base.OnDisconnectedAsync(exception);
            return base.OnDisconnectedAsync(exception);
        }
        private string GetGroupName(string caller, string other)
        {
            var stringCompare = string.CompareOrdinal(caller, other) < 0;
            return stringCompare ? $"{caller}-{other}" : $"{other}-{caller}";
        }
    }
}