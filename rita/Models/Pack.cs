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
    
    public partial class Pack
    {
        public Pack()
        {
            this.ActionPack = new HashSet<ActionPack>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Nullable<decimal> Price { get; set; }
        public int PlaceId { get; set; }
        public Nullable<int> SortNumberTab { get; set; }
        public System.DateTime CreationDate { get; set; }
    
        public virtual ICollection<ActionPack> ActionPack { get; set; }
        public virtual Places Places { get; set; }
    }
}