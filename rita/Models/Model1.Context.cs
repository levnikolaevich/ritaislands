﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class user1109194_bdEntities10 : DbContext
    {
        public user1109194_bdEntities10()
            : base("name=user1109194_bdEntities10")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<ActionDirection> ActionDirection { get; set; }
        public virtual DbSet<ActionPack> ActionPack { get; set; }
        public virtual DbSet<ActionPartner> ActionPartner { get; set; }
        public virtual DbSet<ActionPlace> ActionPlace { get; set; }
        public virtual DbSet<Actions> Actions { get; set; }
        public virtual DbSet<ActionType> ActionType { get; set; }
        public virtual DbSet<Cookie> Cookie { get; set; }
        public virtual DbSet<CookieLog> CookieLog { get; set; }
        public virtual DbSet<Currency> Currency { get; set; }
        public virtual DbSet<Notification> Notification { get; set; }
        public virtual DbSet<Packet> Packet { get; set; }
        public virtual DbSet<PacketService> PacketService { get; set; }
        public virtual DbSet<PartnersRating> PartnersRating { get; set; }
        public virtual DbSet<Permission> Permission { get; set; }
        public virtual DbSet<PlaceService> PlaceService { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<Service> Service { get; set; }
        public virtual DbSet<ServiceCategory> ServiceCategory { get; set; }
        public virtual DbSet<ServiceType> ServiceType { get; set; }
        public virtual DbSet<UrlRecoveryPassword> UrlRecoveryPassword { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Wedding> Wedding { get; set; }
        public virtual DbSet<Blog> Blog { get; set; }
        public virtual DbSet<Country> Country { get; set; }
        public virtual DbSet<Direction> Direction { get; set; }
        public virtual DbSet<Gallery> Gallery { get; set; }
        public virtual DbSet<Image> Image { get; set; }
        public virtual DbSet<Logs> Logs { get; set; }
        public virtual DbSet<MainImages> MainImages { get; set; }
        public virtual DbSet<Pack> Pack { get; set; }
        public virtual DbSet<Partner_old> Partner_old { get; set; }
        public virtual DbSet<PartnerCategory> PartnerCategory { get; set; }
        public virtual DbSet<Partners> Partners { get; set; }
        public virtual DbSet<PartnersImage> PartnersImage { get; set; }
        public virtual DbSet<Places> Places { get; set; }
        public virtual DbSet<PlacesImage> PlacesImage { get; set; }
        public virtual DbSet<PlaceType> PlaceType { get; set; }
        public virtual DbSet<Portfolio> Portfolio { get; set; }
        public virtual DbSet<Slider> Slider { get; set; }
        public virtual DbSet<Feedback> Feedback { get; set; }
    
        public virtual int MoveToBlob()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("MoveToBlob");
        }
    
        public virtual int MoveToBlob2()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("MoveToBlob2");
        }
    
        public virtual int MoveToBlob3()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("MoveToBlob3");
        }
    
        public virtual int Replace_HOME()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("Replace_HOME");
        }
    }
}
