using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace API.Entities.OrderAggregate
{
    public class Order
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }

        [Required]
        public ShippingAddress shippingAddress { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public List<OrderItem> orderItems { get; set; }
        public long SubTotal { get; set; }
        public int DeliveryFee { get; set; }
        public OrderStatus orderStatus { get; set; } = OrderStatus.Pending;
        public long GetTotal() 
        { 
            return SubTotal + DeliveryFee;
        }
    }
}