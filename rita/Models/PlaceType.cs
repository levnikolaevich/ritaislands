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
    
    public partial class PlaceType
    {
        public PlaceType()
        {
            this.Places = new HashSet<Places>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
    
        public virtual ICollection<Places> Places { get; set; }
    }
}
