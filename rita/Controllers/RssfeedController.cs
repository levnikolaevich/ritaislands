using Fabrik.Common.Web;
using System.Text;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Syndication;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using Microsoft.Ajax.Utilities;
using rita.Models;


namespace rita.Controllers
{
    public class RssController : Controller
    {
        //
        // GET: /Rssfeed/

        
        private BdData _data = new BdData();
        public ActionResult Main()
        {
            List<SyndicationItem> items = new List<SyndicationItem>();

            List<Portfolio> portfoliolist = _data.GetPortfoliosTopX(2);
            List<Blog> bloglist = _data.GetBlogTopX(2);
            List<Places> placelist = _data.GetPlacesTopX(2);
            List<Partners> partnerlist = _data.GetPartnersTopX(2);
            List<Actions> actionlist = _data.GetActionsTopX(2);
            List<Direction> directionlist = _data.GetDirectionTopX(2);


            foreach (Portfolio portfolio in portfoliolist)
            {
                string str = "Новое в портфолио! " + portfolio.Name;

                items.Add(new SyndicationItem(str,
                                     portfolio.ShortText,
                                     new Uri(Url.QualifiedAction("PortFolioIndex", "Home", new { id = portfolio.TranslitName })),
                                     "",
                                     portfolio.CreationDate)); 
            }

            foreach (Blog blog in bloglist)
            {
                string str = "Новая статья: " + blog.Name;

                items.Add(new SyndicationItem(str,
                                    blog.ShortText,
                                    new Uri(Url.QualifiedAction("BlogIndex", "Home", new { id = blog.TranslitName })),
                                    "",
                                    blog.CreationDate));
}

            foreach (Places place in placelist)
            {
                string str = place.PlaceType.Name + " " + place.Name;


                items.Add(new SyndicationItem(str,
                                    place.ShortDescription,
                                    new Uri(Url.QualifiedAction("PlaceIndex", "Home", new { id = place.TrName })),
                                    "",
                                    place.CreationDate));
    }

            foreach (Partners partner in partnerlist)
            {
                string str = partner.PartnerCategory.Name + " " + partner.FirstName + " " + partner.LastName;

                items.Add(new SyndicationItem(str,
                                    partner.ShortDescription,
                                    new Uri(Url.QualifiedAction("PartnerIndex", "Home", new { id = partner.TrName })),
                                    "",
                                    partner.CreationDate));
        }

            foreach (Actions action in actionlist)
            {

                string str = "Акция на RitaIslands! " + action.Name;

                items.Add(new SyndicationItem(str,
                                    action.ShortDescription,
                                    new Uri(Url.QualifiedAction("ActionIndex", "Home", new { id = action.TrName })),
                                    "",
                                    action.CreationDate));
            }

            foreach (Direction direction in directionlist)
            {

                string str = "Новое направление!!! Теперь у нас есть: " + direction.Name;

                items.Add(new SyndicationItem(str,
                                    direction.ShortDescription,
                                    new Uri(Url.QualifiedAction("Index", "Home", new { id = direction.TrName })),
                                    "",
                                    direction.CreationDate));
            }

            SyndicationFeed rss =
                new SyndicationFeed("Новое на сайте | Ritaislands - свадьба за границей",
                                    "Обновления на сайте \"Ritaislands - свадьба за границей\": новости, статьи, партнёры, площадки для свадебных церемоний, услуги",
                                    new Uri("http://ritaislands.ru/rss"),
                                    "RitaislandsFeed",
                                    items.OrderByDescending(u => u.LastUpdatedTime).FirstOrDefault().LastUpdatedTime);
            rss.Language = "ru-ru";
            rss.Authors.Add(new SyndicationPerson("rita@ritaislands.ru", "Ritaislands", "http://ritaislands.ru"));

            rss.Items = items.OrderByDescending(u => u.LastUpdatedTime);

            return new RssActionResult() { Rss = rss };
        }

    }

    public class RssActionResult : ActionResult
    {
        public SyndicationFeed Rss { get; set; }

        public override void ExecuteResult(ControllerContext context)
        {

            //context.HttpContext.Response.ContentType = "application/rss+xml";
            context.HttpContext.Response.ContentType = "text/xml";
            context.HttpContext.Response.ContentEncoding = Encoding.UTF8;

            Rss20FeedFormatter rssFormatter = new Rss20FeedFormatter(Rss);

            using (var writer = new XmlTextWriter(context.HttpContext.Response.Output))
            {
                writer.Formatting = Formatting.Indented;
          
                rssFormatter.WriteTo(writer);
                writer.Close();
            }
        }
    }

    //var response = Request.RequestContext.HttpContext.Response;

    //        response.ContentType = "text/xml";
    //        response.ContentEncoding = Encoding.UTF8;

    //        using (var writer = new XmlTextWriter(response.Output))
    //        {
    //            writer.Formatting = Formatting.Indented;
    //            var sitemap = generator.GenerateSiteMap(sitemapItems);

    //            sitemap.WriteTo(writer);
    //        }

   

}
