using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Extensions
{
    public static class ProductExtensions 
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> quary, string orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy)) return quary.OrderBy(p=>p.Name);

            quary = orderBy switch
            {
                "price" => quary.OrderBy(p=>p.Price),
                "priceDesc" => quary.OrderByDescending(p=>p.Price),
                _=> quary.OrderBy(p=>p.Name)
            };
            return quary;
        }

        public static IQueryable<Product> Search(this IQueryable<Product> quary, string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm)) return quary;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return quary.Where(p=>p.Name.ToLower().Contains(lowerCaseSearchTerm));
        }

        public static IQueryable<Product> Filter(this IQueryable<Product> quary, string brands, string types )
        {
            var brandList = new List<string>();
            var typeList = new List<string>();

            if(!string.IsNullOrEmpty(brands))
                brandList.AddRange(brands.ToLower().Split(",").ToList());
            
            if(!string.IsNullOrEmpty(types))
                typeList.AddRange(types.ToLower().Split(",").ToList());
            
            quary = quary.Where(p=>brandList.Count==0 || brandList.Contains(p.Brand.ToLower()));
            quary = quary.Where(p=>typeList.Count==0 || typeList.Contains(p.Type.ToLower()));

            return quary;
        }
    }
}