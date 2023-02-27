using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> ProjectOrderToOrderDto(this IQueryable<Order> query)
        {
            return query
                   .Select(order=> new OrderDto{
                    Id=order.Id,
                    BuyerId=order.BuyerId,
                    OrderDate=order.OrderDate,
                    shippingAddress=order.shippingAddress,
                    DeliveryFee=order.DeliveryFee,
                    SubTotal=order.SubTotal,
                    OrderStatus=order.orderStatus.ToString(),
                    Total = order.GetTotal(),
                    orderItems = order.orderItems.Select(item => new OrderItemDto
                    {
                        ProductId = item.ItemOrdered.ProductId,
                        Name = item.ItemOrdered.Name,
                        PitureUrl= item.ItemOrdered.PictureUrl,
                        Price = item.Price,
                        Quantity=item.Quantity
                    }).ToList()
                   }).AsNoTracking();
                   
        }
    }
}