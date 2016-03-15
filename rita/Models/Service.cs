//------------------------------------------------------------------------------
// <auto-generated>
//     Этот код создан по шаблону.
//
//     Изменения, вносимые в этот файл вручную, могут привести к непредвиденной работе приложения.
//     Изменения, вносимые в этот файл вручную, будут перезаписаны при повторном создании кода.
// </auto-generated>
//------------------------------------------------------------------------------

namespace rita.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Service
    {
        public Service()
        {
            this.PacketService = new HashSet<PacketService>();
            this.PlaceService = new HashSet<PlaceService>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ServiceTypeId { get; set; }
        public int ServiceCategoryId { get; set; }
        public System.DateTime CreationDate { get; set; }
    
        public virtual ICollection<PacketService> PacketService { get; set; }
        public virtual ICollection<PlaceService> PlaceService { get; set; }
        public virtual ServiceType ServiceType { get; set; }
        public virtual ServiceCategory ServiceCategory { get; set; }
    }
}
