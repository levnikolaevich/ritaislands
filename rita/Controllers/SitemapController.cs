using Fabrik.Common.Web;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Text;
using System.Xml;
using rita.Models;

namespace rita.Controllers
{
    public class SitemapController : Controller
    {
        //
        // GET: /Sitemap/

        private BdData _data = new BdData();

        public ActionResult Main()
        {
            DateTime datePlaces = _data.GetDateIndexPlaces();
            DateTime dateMain = _data.GetDateIndex();
            DateTime dateIndex = _data.GetDateIndex();
            DateTime dateGallery = _data.GetDateGallery();
            DateTime dateSantorini = _data.GetDateSantorini();
            DateTime datePortfolio = _data.GetDatePortfolio();
            DateTime datePartners = _data.GetDatePartners();
            DateTime dateActions = _data.GetDateActions();
            DateTime dateFeedback = _data.GetDateFeedback();

            var sitemapItems = new List<SitemapItem>
            {
                new SitemapItem("http://ritaislands.ru/", new DateTime(2014,4,12,20,0,0), SitemapChangeFrequency.Monthly, priority: 1),
                new SitemapItem(Url.QualifiedAction("Blog", "Home"), dateSantorini, SitemapChangeFrequency.Weekly, priority: 0.8),
                new SitemapItem(Url.QualifiedAction("Feedback", "Home"), dateFeedback, SitemapChangeFrequency.Weekly, priority: 0.8),
                new SitemapItem(Url.QualifiedAction("Portfolio", "Home"), datePortfolio, SitemapChangeFrequency.Weekly, priority: 0.8),
                new SitemapItem(Url.QualifiedAction("Partners", "Home"), datePartners, SitemapChangeFrequency.Weekly, priority: 0.8),
                //new SitemapItem(Url.QualifiedAction("Services", "Home"), datePartners, SitemapChangeFrequency.Weekly, priority: 0.8),
                new SitemapItem(Url.QualifiedAction("Action", "Home"), dateActions, SitemapChangeFrequency.Weekly, priority: 0.8),
                new SitemapItem(Url.QualifiedAction("Main", "Rss"), new DateTime(2014,4,12,20,0,0), SitemapChangeFrequency.Weekly, priority: 0.8),

                new SitemapItem(Url.QualifiedAction("About", "Home"), new DateTime(2014,4,12,20,0,0), SitemapChangeFrequency.Monthly, priority: 0.5),
                new SitemapItem(Url.QualifiedAction("Contact", "Home"), new DateTime(2014,4,12,20,0,0), SitemapChangeFrequency.Monthly, priority: 0.8),
                new SitemapItem(Url.QualifiedAction("ContactServices", "Home"), new DateTime(2014,4,12,20,0,0), SitemapChangeFrequency.Monthly, priority: 0.5),
                new SitemapItem(Url.QualifiedAction("RitaislandsMap", "Home"), new DateTime(2014,4,12,20,0,0), SitemapChangeFrequency.Weekly, priority: 0.9),
            };

            foreach (Portfolio portfolio in _data.GetPortfoliosAllVisible())
            {
                sitemapItems.Add(new SitemapItem(Url.QualifiedAction("PortFolioIndex", "Home", new { id = portfolio.TranslitName }), portfolio.CreationDate, SitemapChangeFrequency.Weekly, priority: 0.8));
            }

            foreach (Blog santa in _data.GetAllBlogVisible())
            {
                sitemapItems.Add(new SitemapItem(Url.QualifiedAction("BlogIndex", "Home", new { id = santa.TranslitName }), santa.CreationDate, SitemapChangeFrequency.Weekly, priority: 0.8));
            }

            foreach (Direction dir in _data.GetDirections())
            {
                sitemapItems.Add(new SitemapItem(Url.QualifiedAction("Index", "Home") + "/" + dir.TrName, dir.CreationDate, SitemapChangeFrequency.Weekly, priority: 1));
                sitemapItems.Add(new SitemapItem(Url.QualifiedAction("Places", "Home") + "/" + dir.TrName, new DateTime(2014, 4, 12, 20, 0, 0), SitemapChangeFrequency.Weekly, priority: 0.8));
            }

            foreach (Partners par in _data.GetOnlyVisiblePartners())
            {
                sitemapItems.Add(new SitemapItem(Url.QualifiedAction("Partnerindex", "Home", new { id = par.TrName }), par.CreationDate, SitemapChangeFrequency.Weekly, priority: 0.8));
            }

            foreach (Places par in _data.GetAllVisiblePlaces())
            {
                sitemapItems.Add(new SitemapItem(Url.QualifiedAction("Placeindex", "Home", new { id = par.TrName }), par.CreationDate, SitemapChangeFrequency.Weekly, priority: 0.8));
            }

            foreach (Actions action in _data.GetAllVisibleActions())
            {
                sitemapItems.Add(new SitemapItem(Url.QualifiedAction("Actionindex", "Home", new { id = action.TrName }), action.CreationDate, SitemapChangeFrequency.Weekly, priority: 0.8));
            }

            SitemapGenerator generator = new SitemapGenerator();

            var response = Request.RequestContext.HttpContext.Response;

            response.ContentType = "text/xml";
            response.ContentEncoding = Encoding.UTF8;

            using (var writer = new XmlTextWriter(response.Output))
            {
                writer.Formatting = Formatting.Indented;
                var sitemap = generator.GenerateSiteMap(sitemapItems);

                sitemap.WriteTo(writer);
            }

            return Content("");
        }

        
    }
}
