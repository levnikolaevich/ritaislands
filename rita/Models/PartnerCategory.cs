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
    
    public partial class PartnerCategory
    {
        public PartnerCategory()
        {
            this.Partners = new HashSet<Partners>();
            this.Partners1 = new HashSet<Partners>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        public string TrName { get; set; }
    
        public virtual ICollection<Partners> Partners { get; set; }
        public virtual ICollection<Partners> Partners1 { get; set; }
    }
}
