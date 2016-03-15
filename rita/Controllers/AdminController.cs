using System.Linq;
using System.Runtime.InteropServices;
using System.ServiceModel;
using System.Web.Routing;
using rita.Models;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using rita.Helpers;
using System.Globalization;


namespace rita.Controllers
{
    [Authorize]
    public class AdminController : Controller
    {
        private BdData _data;

        public AdminController()
        {
            _data = new BdData();
        }

        //public ActionResult Test(string login, string pas)
        //{
        //    _data.AddUser(new User() { Email = login, Password = pas});
        //    return Content("");
        //}

        [AllowAnonymous]
        public ActionResult StartRatingCalculate(string login, string password)
        {
            _data.WriteLog(String.Format("StartRatingCalculate Login={0} ; Password={1}", login, password));
            if (login == @"gmcoolsr@gmail.com" && password == @"4866543")
            {
                _data.CalculateRatingPartners(DateTime.Now.AddDays(-1));
            }
            return Content("Ok");
        }

        [RoleUser(AccessLevel = (int)Permissions.AdminMenu)]
        public ActionResult Main()
        {
            bool result = User.IsInRole("1");
            return View("Index");
        }

        [RoleUser(AccessLevel = (int)Permissions.AdminMenu)]
        public ActionResult Index()
        {
            return View();
        }

        #region Packets
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Services)]
        public ActionResult Packets()
        {
            ViewBag.List = _data.GetDirections();
            //ViewBag.Types = _data.GetServiceTypes();
            //ViewBag.Categories = _data.GetServiceCategorys();
            return View();
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Services)]
        public ActionResult AddPacket(int id)
        {
            ViewBag.PlaceId = id;
            return View();
        }

        [HttpPost]
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Services)]
        public ActionResult AddPacket(string name, string description, decimal price, int placeId, int sortNumberTab, decimal economy)
        {
            _data.AddPacket(name, description, price, placeId, sortNumberTab, economy);
            return Redirect(Url.Action("Packets", "Admin"));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Services)]
        public ActionResult EditPacket(int id)
        {
            ViewBag.Packet = _data.GetPacket(id);
            ViewBag.Service = _data.GetPacketService(id);
            return View();
        }

        [HttpPost]
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Services)]
        public ActionResult EditPacket(int id, string name, string description, decimal price, int placeId, int sortNumberTab, decimal economy)
        {
            _data.EditPacket(id, name, description, price, placeId, sortNumberTab, economy);
            return Redirect(Url.Action("Packets", "Admin"));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Services)]
        public ActionResult DelPacket(int id)
        {
            _data.DelPacket(id);
            return Redirect(Url.Action("Packets", "Admin"));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Services)]
        public ActionResult PlaceService(int id)
        {
            ViewBag.Place = _data.GetPlace(id);
            ViewBag.Service = _data.GetServices().Where(x=> x.PlaceService.Count(y=> y.PlaceId == id) == 0);
            ViewBag.PlaceService = _data.GetPlaceServices(id);
            return View();
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Services)]
        public ActionResult AddPlaceService(int placeId, int serviceId, decimal? price)
        {
            if (price == null)
            {
                price = 0;
            }
            _data.AddPlaceService(placeId, serviceId, price.Value);
            return Redirect(Url.Action("PlaceService", "Admin", new { id = placeId }));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Services)]
        public ActionResult DelPlaceService(int placeId, int serviceId)
        {
            _data.PlaceServiceDel(placeId, serviceId);
            return Redirect(Url.Action("PlaceService", "Admin", new { id = placeId }));
        }
         
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Services)]
        public ActionResult AddPacketService(int packetId, int serviceId, int? count)
        {
            _data.AddPacketService(packetId, serviceId, count);
            return Redirect(Url.Action("EditPacket", "Admin", new { id = packetId }));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Services)]
        public ActionResult DelPacketService(int packetId, int serviceId)
        {
            _data.DelPacketService(packetId, serviceId);
            return Redirect(Url.Action("EditPacket", "Admin", new { id = packetId }));
        }
        #endregion

        #region Service
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Services)]
        public ActionResult Services()
        {
            ViewBag.List = _data.GetServices();
            ViewBag.Types = _data.GetServiceTypes();
            ViewBag.Categories = _data.GetServiceCategorys();
            return View();
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Services)]
        public ActionResult ServiceEdit(int id)
        {
            ViewBag.Service = _data.GetService(id);
            ViewBag.Types = _data.GetServiceTypes();
            ViewBag.Categories = _data.GetServiceCategorys();
            return View();
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Services)]
        [HttpPost]
        public ActionResult ServiceEdit(int id, string name, string description, int serviceTypeId, int serviceCategoryId)
        {
            _data.ServiceEdit(id, name, description, serviceTypeId, serviceCategoryId);
            return Redirect(Url.Action("Services", "Admin"));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Services)]
        [HttpPost]
        public ActionResult ServiceAdd(string name, string description, int serviceTypeId, int serviceCategoryId)
        {
            _data.ServiceAdd(name, description, serviceTypeId, serviceCategoryId);
            return Redirect(Url.Action("Services", "Admin"));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Services)]
        public ActionResult ServiceDel(int id)
        {
            _data.ServiceDel(id);
            return Redirect(Url.Action("Services", "Admin"));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Services)]
        public ActionResult ServicePlace(int id)
        {
            ViewBag.Place = _data.GetPlace(id);
            ViewBag.Service = _data.GetServices();
            ViewBag.Types = _data.GetServiceTypes();
            ViewBag.Categories = _data.GetServiceCategorys();
            return View();
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Services)]
        [HttpPost]
        public ActionResult ServicePlaceEdit(int id, string txt)
        {
            Dictionary<int, decimal?> dictionary = new Dictionary<int, decimal?>();

            if (!String.IsNullOrEmpty(txt))
            {
                foreach (string s in txt.Split('&'))
                {
                    int x;
                    decimal y;
                    if (s.Contains("serv_") && int.TryParse(s.Split('=')[0].Split('_')[1], out x))
                    {
                        if (!dictionary.ContainsKey(x))
                        {
                            dictionary.Add(x, null);
                        }
                    }
                    else if (s.Contains("txt_") && decimal.TryParse(s.Split('=')[1], out y) && int.TryParse(s.Split('=')[0].Split('_')[1], out x))
                    {
                        if (dictionary.ContainsKey(x))
                        {
                            dictionary[x] = y;
                        }
                    }
                }
            }
            _data.SavePlayService(id, dictionary);
            return Redirect(Url.Action("ServicePlace", "Admin", new { id = id }));
        }
        #endregion

        #region Action
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Action)]
        public ActionResult AddAction()
        {
            ViewBag.ActionTypes = _data.GetActionType();
            return View();
        }

        //public ActionResult UpdateAction(int id)
        //{
        //    ViewBag.Action = _data.GetActionId(id);
        //    ViewBag.ActionTypes = _data.GetActionType();
        //    return View();
        //}

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Action)]
        public ActionResult DelAction(int id)
        {
            _data.DelAction(id);
            return Redirect(Url.Action("Action", "Home"));
        }

        [ValidateInput(false)]
        [HttpPost]
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Action)]
        public ActionResult AddAction(HttpPostedFileBase file, string tag, string name, string actionType, string actionDateTo, string dateTo, string dateFrom, string shortdescription, string description, decimal? perc, decimal? cost, string gift, string isEnabled)
        {
            try
            {
                DateTime dT = DateTime.Parse(dateTo, new System.Globalization.CultureInfo("ru-RU"));
                DateTime dF = DateTime.Parse(dateFrom, new System.Globalization.CultureInfo("ru-RU"));
                DateTime dA = DateTime.Parse(actionDateTo, new System.Globalization.CultureInfo("ru-RU"));

                int actionTypeId = 1;

                try
                {
                    actionTypeId = int.Parse(actionType);
                }
                catch (Exception)
                {
                }

                if (String.IsNullOrEmpty(description))
                {
                    description = "";
                }

                Actions actions = new Actions();
                actions.DateFrom = dF;
                actions.DateTo = dT;
                actions.ActionDateTo = dA;
                actions.Name = name;
                actions.Description = description;
                actions.ShortDescription = shortdescription;
                actions.ActionTypeId = _data.GetActionType(actionTypeId).Id;
                actions.Cost = cost;
                actions.Percent = perc;
                actions.Gift = gift;
                actions.Tag = tag;

                if (file != null)
                {
                    byte[] b = new byte[file.ContentLength];
                    file.InputStream.Read(b, 0, file.ContentLength);
                    actions.ImageId = _data.UploadImageRet(new Image() { Data = b });
                }

                if (isEnabled != null && isEnabled.Trim() == "on")
                {
                    actions.IsVisible = true;
                }
                else
                {
                    actions.IsVisible = false;
                }

                _data.AddAction(actions);
                return Redirect(Url.Action("UpdateAction", "Admin", new { id = actions.Id }));
            }
            catch (Exception exception)
            {
                _data.WriteLog(exception.Message);
            }
            return Redirect(Url.Action("Index", "Admin"));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Action)]
        public ActionResult UpdateAction(int id)
        {
            ViewBag.Directions = _data.GetDirectionsWithout(id);
            ViewBag.Places = _data.GetAllPlacesIds(id);
            ViewBag.Packs = _data.GetAllPacksIds(id);
            ViewBag.ActionDirections = _data.GetActionDirections(id);
            ViewBag.Action = _data.GetAction(id);
            ViewBag.ActionTypes = _data.GetActionType();
            return View();
        }

        [ValidateInput(false)]
        [HttpPost]
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Action)]
        public ActionResult UpdateAction(HttpPostedFileBase file, string tag, string name, string actionType, string trName, string shortdescription, DateTime actionDateTo, DateTime dateTo, DateTime dateFrom, string description, decimal? perc, decimal? cost, string gift, string isEnabled, int id)
        {
            int actionTypeId = 1;

            try
            {
                actionTypeId = int.Parse(actionType);
            }
            catch (Exception)
            {
            }

            if (String.IsNullOrEmpty(description))
            {
                description = "";
            }

            Actions actions = _data.GetAction(id);
            actions.DateFrom = dateFrom;
            actions.DateTo = dateTo;
            actions.Name = name;
            actions.Description = description;
            actions.ActionTypeId = _data.GetActionType(actionTypeId).Id;
            actions.Cost = cost;
            actions.Percent = perc;
            actions.Gift = gift;
            actions.TrName = trName;
            actions.ShortDescription = shortdescription;
            actions.ActionDateTo = actionDateTo;
            actions.Tag = tag;

            if (file != null)
            {
                byte[] b = new byte[file.ContentLength];
                file.InputStream.Read(b, 0, file.ContentLength);
                actions.ImageId = _data.UploadImageRet(new Image() { Data = b });
            }

            if (isEnabled != null && isEnabled.Trim() == "on")
            {
                actions.IsVisible = true;
            }
            else
            {
                actions.IsVisible = false;
            }

            _data.UpdateAction(actions);
            return Redirect(Url.Action("Action", "Home"));
        }

        [HttpPost]
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Action)]
        public ActionResult AddActionDirection(int actionId, int directionId)
        {
            ActionDirection action = _data.AddActionDirection(actionId, directionId);
            return Redirect(Url.Action("UpdateAction", "Admin", new { id = action.ActionId }));
        }

        [HttpPost]
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Action)]
        public ActionResult AddActionPlace(int actionId, int placeId)
        {
            ActionPlace action = _data.AddActionPlace(actionId, placeId);
            return Redirect(Url.Action("UpdateAction", "Admin", new { id = action.ActionId }));
        }

        [HttpPost]
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Action)]
        public ActionResult AddActionPack(int actionId, int packId)
        {
            ActionPack action = _data.AddActionPack(actionId, packId);
            return Redirect(Url.Action("UpdateAction", "Admin", new { id = action.ActionId }));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Action)]
        public ActionResult DelActionPack(int actionId, int packId)
        {
            _data.DelActionPack(actionId, packId);
            return Redirect(Url.Action("UpdateAction", "Admin", new { id = actionId }));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Action)]
        public ActionResult DelActionPlace(int actionId, int packId)
        {
            _data.DelActionPlace(actionId, packId);
            return Redirect(Url.Action("UpdateAction", "Admin", new { id = actionId }));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Action)]
        public ActionResult DelActionDirection(int actionId, int packId)
        {
            _data.DelActionDirection(actionId, packId);
            return Redirect(Url.Action("UpdateAction", "Admin", new { id = actionId }));
        }

        #endregion

        #region Direction
        //public ActionResult AddDirection()
        //{
        //    return View();
        //}

        //public ActionResult UpdateDirection()
        //{
        //    return View();
        //}
        #endregion

        #region Gallery
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Gallery)]
        public ActionResult AddGallery()
        {
            ViewBag.Directions = _data.GetDirections();
            return View();
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Gallery)]
        public ActionResult UpdateGallery(int id)
        {
            ViewBag.Directions = _data.GetDirections();
            ViewBag.Gallery = _data.GetGalleryUpdate(id);
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Gallery)]
        public ActionResult UpdateGallery(int id, string name, HttpPostedFileBase file, int directionId)
        {
            Gallery gallery = _data.GetGalleryUpdate(id);

            if (file != null)
            {
                byte[] b = new byte[file.ContentLength];
                file.InputStream.Read(b, 0, file.ContentLength);
                gallery.Data = b;

            }

            gallery.Name = name;
            gallery.DirectionId = directionId;
            _data.UpdateGallery(gallery);
            return Redirect(Url.Action("Gallery", "Home"));
        }

        [HttpPost]
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Gallery)]
        public ActionResult AddPhoto(HttpPostedFileBase file, string name, string category, int directionId)
        {
            if (directionId == 0)
                directionId = 1;
            byte[] b = new byte[file.ContentLength];
            file.InputStream.Read(b, 0, file.ContentLength);
            Gallery gallery = new Gallery();
            gallery.Data = b;
            gallery.Name = name;
            //gallery.CategoryId = int.Parse(category);
            gallery.DirectionId = directionId;
            gallery.CreationDate = DateTime.Now;
            _data.AddGallery(gallery);
            return Redirect(Url.Action("AddGallery", "Admin"));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Gallery)]
        public ActionResult DelPhoto(int id)
        {
            _data.DelGallery(id);
            return Redirect(Url.Action("Gallery", "Home"));
        }
        #endregion

        #region Feedback
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Places)]
        public ActionResult AddFeedback()
        {
            Feedback feedback = new Feedback();

            feedback.Client = "Новый отзыв";
            feedback.AvaId = 0;
            feedback.IsVisibled = false;
            feedback.Portfolio = "";
            feedback.Text = "Текст отзыва";

            _data.AddFeedback(feedback);

            return Redirect(Url.Action("updatefeedback", "admin", new { idFeedback = feedback.Id }));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Places)]
        public ActionResult UpdateFeedback(int idFeedback)
        {
            ViewBag.Feedback = _data.GetFeedbackId(idFeedback);   

            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Places)]
        public ActionResult UpdateFeedback(int id, HttpPostedFileBase file, string dateFeedback, string IsVisibled, string name, string text, string PortfolioS, string VK, string FB)
        {
            Feedback feedback = _data.GetFeedbackId(id);
               
            feedback.Client = name.Trim();
            feedback.Text = text.Trim();
            feedback.Portfolio = PortfolioS.Trim();
            feedback.VK = VK.Trim();
            feedback.FB = FB.Trim();
            feedback.CreationDate = Convert.ToDateTime(dateFeedback, CultureInfo.CreateSpecificCulture("ru-RU"));

            if (file != null)
            {
                byte[] b = new byte[file.ContentLength];
                file.InputStream.Read(b, 0, file.ContentLength);
                feedback.AvaId = _data.UploadImageRet(new Image() { Data = b });
            }


            if (IsVisibled != null && IsVisibled.Trim() == "on")
            {
                feedback.IsVisibled = true;
            }
            else
            {
                feedback.IsVisibled = false;
            }

            _data.UpdateFeedback(feedback);  

            return Redirect(Url.Action("Feedback", "Home"));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Places)]
        public ActionResult DelFeedback(int idFeedback)
        {
            _data.DelFeedback(_data.GetFeedbackId(idFeedback));

            return Redirect(Url.Action("Feedback", "Home"));
        }

        #endregion

        #region Place
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Places)]
        public ActionResult AddPlace()
        {
            ViewBag.PartnerCategories = _data.GetPlaceCategories();
            return View();
        }

        [ValidateInput(false)]
        [HttpPost]
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Places)]
        public ActionResult AddPlace(string name, int dirId, int? countGuests, string Map, int Type, string PacketsEnable, string Banket, string Panorama, string PlaceView, string City, string daysWedding, string shortText, string text, string isEnabled, HttpPostedFileBase file, HttpPostedFileBase file1)
        {
            Places place = new Places();
            byte[] b = new byte[file.ContentLength];
            file.InputStream.Read(b, 0, file.ContentLength);

            place.Image = _data.UploadImageRet(new Image() { Data = b });
            place.CreationDate = DateTime.Now;
            place.ShortDescription = shortText;
            place.Description = text;
            place.Name = name;
            place.DirectionId = dirId;
            place.DaysWedding = daysWedding;
            place.CountGuests = (countGuests == null ? 0 : countGuests);

            place.Map = Map;
            place.Banket = Banket;
            place.Panorama = Panorama;
            place.PlaceView = PlaceView;
            place.City = City;
            place.PlaceTypeId = Type;

            if (isEnabled != null && isEnabled.Trim() == "on")
            {
                place.IsEnabled = true;
            }



            if (file1 != null)
            {
                byte[] b1 = new byte[file1.ContentLength];
                file1.InputStream.Read(b1, 0, file1.ContentLength);
                place.SmallImage = _data.UploadImageRet(new Image() { Data = b1 }); ;
            }

            _data.AddPlace(place);

            return Redirect(Url.Action("Places", "Home"));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Places)]
        public ActionResult DelPlace(int id)
        {
            _data.DelPlace(id);
            return Redirect(Url.Action("Places", "Home"));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Places)]
        public ActionResult UpdatePlace(int id)
        {
            ViewBag.PartnerCategories = _data.GetPlaceCategories();
            ViewBag.Partner = _data.GetPlace(id);
            ViewBag.PartnerImages = _data.GetPlaceImages(id);
            return View();
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Places)]
        public ActionResult DelPlacePhoto(int id, int partnerId)
        {
            _data.DelPlacePhoto(id);
            return Redirect(Url.Action("UpdatePlace", "Admin", new { id = partnerId }));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Places)]
        public ActionResult DelPlaceAllPhoto(int partnerId)
        {
            _data.DelPlaceAllPhoto(partnerId);
            return Redirect(Url.Action("UpdatePlace", "Admin", new { id = partnerId }));
        }

        [HttpPost]
        [ValidateInput(false)]
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Places)]
        public ActionResult AddPlacePhoto(int id, IEnumerable<HttpPostedFileBase> file, string video)
        {
            foreach (HttpPostedFileBase f in file)
            {
                PlacesImage partnerImage = new PlacesImage();
                byte[] b = new byte[f.ContentLength];
                f.InputStream.Read(b, 0, f.ContentLength);
                partnerImage.Image = _data.UploadImageRet(new Image() { Data = b });
                partnerImage.PlaceId = id;
                if (!string.IsNullOrEmpty(video))
                {
                    partnerImage.VideoUrl = video;
                }
                _data.AddPlacePhoto(partnerImage);
            }
            return Redirect(Url.Action("UpdatePlace", "Admin", new { id = id }));
        }

        [HttpPost]
        [ValidateInput(false)]
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Places)]
        public ActionResult UpdatePlace(string isEnabled, string trName, string Map, int Type, string PacketsEnable, string Banket, string Panorama, string PlaceView, string City, int dirId, int? countGuests, string daysWedding, int id, int rate, string text, string name, string shortText, HttpPostedFileBase file, HttpPostedFileBase file1, string isBeach)
        {
            Places place = _data.GetPlace(id);

            place.CreationDate = DateTime.Now;
            place.ShortDescription = shortText;
            place.Description = text;
            place.TrName = trName;
            place.Name = name;
            place.DirectionId = dirId;
            place.CountGuests = (countGuests == null) ? 0 : countGuests;
            place.DaysWedding = daysWedding;
            place.Rate = rate;
            place.Map = Map;
            place.Banket = Banket;
            place.Panorama = Panorama;
            place.PlaceView = PlaceView;
            place.City = City;
            place.PlaceTypeId = Type;

            if (file != null)
            {
                byte[] b = new byte[file.ContentLength];
                file.InputStream.Read(b, 0, file.ContentLength);
                place.Image = _data.UploadImageRet(new Image() { Data = b });
            }

            if (file1 != null)
            {
                byte[] b1 = new byte[file1.ContentLength];
                file1.InputStream.Read(b1, 0, file1.ContentLength);
                place.SmallImage = _data.UploadImageRet(new Image() { Data = b1 }); ;
            }

            if (isEnabled != null && isEnabled.Trim() == "on")
            {
                place.IsEnabled = true;
            }
            else
            {
                place.IsEnabled = false;
            }

            if (isBeach != null && isBeach.Trim() == "on")
            {
                place.IsBeach = true;
            }
            else
            {
                place.IsBeach = false;
            }

            _data.UpdatePlace(place);
            return Redirect(Url.Action("Places", "Home"));
        }

        #endregion

        #region Packets
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Pack)]
        public ActionResult AddPack(int id)
        {
            ViewBag.Place = _data.GetPlace(id);
            return View();
        }

        [ValidateInput(false)]
        [HttpPost]
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Pack)]
        public ActionResult AddPack(string name, int? price, int PlaceId, int? SortNumberTab, string Description)
        {
            Pack packet = new Pack();
            Places place = _data.GetPlace(PlaceId);

            packet.CreationDate = DateTime.Now;
            packet.Name = name;
            packet.Description = Description;
            packet.PlaceId = PlaceId;
            packet.Price = price;
            packet.SortNumberTab = SortNumberTab;


            _data.AddPack(packet);

            return Redirect(Url.Action("PlaceIndex", "Home", new { id = place.TrName }));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Pack)]
        public ActionResult UpdatePack(int id)
        {

            ViewBag.Pack = _data.GetPack(id);
            ViewBag.Place = _data.GetPlace(ViewBag.Pack.PlaceId);


            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Pack)]
        public ActionResult UpdatePack(string name, int? price, int PlaceId, int? SortNumberTab, string Description, int PackId)
        {
            Pack packet = _data.GetPack(PackId);
            Places place = _data.GetPlace(PlaceId);

            packet.CreationDate = DateTime.Now;
            packet.Name = name;
            packet.Description = Description;
            packet.PlaceId = PlaceId;
            packet.Price = price;
            packet.SortNumberTab = SortNumberTab;

            place.CreationDate = DateTime.Now;
            _data.UpdatePack(packet);
            _data.UpdatePlace(place);

            return Redirect(Url.Action("PlaceIndex", "Home", new { id = place.TrName }));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Pack)]
        public ActionResult DelPack(int id)
        {

            Pack packet = _data.GetPack(id);
            Places place = packet.Places;
            _data.DelPack(id);
            return Redirect(Url.Action("PlaceIndex", "Home", new { id = place.TrName }));
        }
        #endregion

        #region Разное
        //После
        [ValidateInput(false)]
        [HttpPost]
        public ActionResult UploadImage(HttpPostedFileBase file)
        {
            Image images = new Image();
            byte[] b = new byte[file.ContentLength];
            file.InputStream.Read(b, 0, file.ContentLength);

            images.Data = b;

            int id = _data.UploadImageRet(images);

            return Content(@"{ ""filelink"": """ + Url.Action("GetImage", "Home", new { id = id }) + @""" }");
        }

        [ValidateInput(false)]
        [HttpPost]
        public ActionResult UploadImages(HttpPostedFileBase file)
        {
            Image images = new Image();
            byte[] b = new byte[file.ContentLength];
            file.InputStream.Read(b, 0, file.ContentLength);

            images.Data = b;

            int id = _data.UploadImageRet(images);

            return Content(@"{ ""filelink"": """ + Url.Action("GetImage", "Home", new { id = id }) + @""" }");
        }

        [AllowAnonymous]
        public ActionResult Send(string contact, string comment)
        {
            string str = @"
            Контакт: " + contact + @"
            Комментарий: " + comment;

            _data.WriteEmail(str,"client");

            SendEmail send = new SendEmail();

            try
            {
            send.SendMail("rita@ritaislands.ru", new string[1] { "rita@ritaislands.ru" }, new string[0], new string[0],
                          "client", str, false, MailPriority.High);

            }
            catch
            {

            }

            if (contact.Contains("@"))
            {
                try
                {
                    send.SendMail("rita@ritaislands.ru", new string[1] { contact }, new string[0], new string[0],
                     "RitaIslands", @"Спасибо за то, что обратились к нам! Мы свяжемся с Вами в течение 24 часов. Если нет - требуйте скидку 50% !",
                     false, MailPriority.High);
                }
                catch
                {

                }
            }

            return Redirect(Url.Action("Thanks", "Home"));
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult SendPacket(string contact, string comment, string packet, string calc)
        {
            string str = @"
            Контакт: " + contact + @"
            Комментарий: " + comment + @"
            Пакет: " + packet + @"
            ";
            if (!string.IsNullOrEmpty(calc))
            {
                str += "Услуги " + calc;
            }

            _data.WriteEmail(str, "client");

            SendEmail send = new SendEmail();

            try
            {
            send.SendMail("rita@ritaislands.ru", new string[1] { "rita@ritaislands.ru" }, new string[0], new string[0],
                          "client", str, false, MailPriority.High);
            }
            catch(Exception exception)
            {
                return Redirect(Url.Action("Thanks", "Home"));
            }

            return Redirect(Url.Action("Thanks", "Home"));
        }

        //public ActionResult MainImages()
        //{
        //    return View();
        //}
        #endregion

        #region Wedding
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Partners)]
        public ActionResult AddWedding()
        {
            ViewBag.List = _data.GetDirections();
            return View();
        }

        [ValidateInput(false)]
        [HttpPost]
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Partners)]
        public ActionResult AddWedding(string name, string date, int placeId, string shortText, string longText, string city, string isEnabled, HttpPostedFileBase file, HttpPostedFileBase file1, HttpPostedFileBase file2)
        {
            Wedding partner = new Wedding();
            byte[] b = new byte[file.ContentLength];
            file.InputStream.Read(b, 0, file.ContentLength);

            partner.Image = _data.UploadImageRet(new Image() { Data = b });
            partner.CreationDate = DateTime.Now;
            partner.ShortDescription = shortText;
            partner.Description = longText;
            partner.Name = name.Trim();
            partner.City = city;
            partner.PlacesId = placeId;

            if (isEnabled != null && isEnabled.Trim() == "on")
            {
                partner.IsEnabled = true;
            }

            if (file1 != null)
            {
                byte[] b1 = new byte[file1.ContentLength];
                file1.InputStream.Read(b1, 0, file1.ContentLength);
                partner.Avatar = _data.UploadImageRet(new Image() { Data = b1 });
            }
            else
            {
                partner.Avatar = 8252;
            }

            if (file2 != null)
            {
                byte[] b2 = new byte[file2.ContentLength];
                file2.InputStream.Read(b2, 0, file2.ContentLength);
                partner.ImageProfile = _data.UploadImageRet(new Image() { Data = b2 });
            }
            else
            {
                partner.ImageProfile = 8280;
            }

            _data.AddWedding(partner);

            return Redirect(Url.Action("AddWedding", "Admin"));
        }
        #endregion

        #region Partner
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Partners)]
        public ActionResult AddPartner()
        {
            ViewBag.PartnerCategories = _data.GetPartnerCategories();
            return View();
        }

        [ValidateInput(false)]
        [HttpPost]
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Partners)]
        public ActionResult AddPartner(string name, int prId, string shortText, string longText, decimal? price, string text, string city, string firstName, string lastName, string profession, string viezd, string phone, string site, string email, string skype, string facebook, string vk, string isEnabled, HttpPostedFileBase file, HttpPostedFileBase file1, HttpPostedFileBase file2)
        {
            Partners partner = new Partners();
            byte[] b = new byte[file.ContentLength];
            file.InputStream.Read(b, 0, file.ContentLength);

            partner.Image = _data.UploadImageRet(new Image() { Data = b });
            partner.CreationDate = DateTime.Now;
            partner.ShortDescription = shortText;
            partner.Description = longText;
            partner.Name = name.Trim();
            partner.CategoryId = prId;
            partner.City = city;
            partner.FirstName = firstName.Trim();
            partner.LastName = lastName.Trim();
            partner.Profession = profession;
            partner.Viezd = viezd.Trim();
            partner.Phone = phone;
            partner.Site = site.Contains(@"http:") ? site.Remove(0, 7) : site;
            partner.Email = email;
            partner.Skype = skype;
            partner.Facebook = facebook.Contains(@"https:") ? facebook.Remove(0, 21) : facebook;
            partner.Vk = vk.Contains(@"http:") ? vk.Remove(0, 14) : vk;



            partner.Price = price;


            if (isEnabled != null && isEnabled.Trim() == "on")
            {
                partner.IsEnabled = true;
            }

            if (file1 != null)
            {
                byte[] b1 = new byte[file1.ContentLength];
                file1.InputStream.Read(b1, 0, file1.ContentLength);
                partner.Avatar = _data.UploadImageRet(new Image() { Data = b1 });
            }

            if (file2 != null)
            {
                byte[] b2 = new byte[file2.ContentLength];
                file2.InputStream.Read(b2, 0, file2.ContentLength);
                partner.ImageProfile = _data.UploadImageRet(new Image() { Data = b2 });
            }

            _data.AddPartner(partner);

            return Redirect(Url.Action("AddPartner", "Admin"));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Partners)]
        public ActionResult DelPartner(int id)
        {
            Partners partners = _data.GetPartner(id);
            if (partners.User != null && partners.User.Any())
            {
                _data.DeleteUser(partners.User.First().Id);
            }
            _data.DelPartner(id);
            return Redirect(Url.Action("Partners", "Home"));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Partners)]
        public ActionResult DelPartnerPhoto(int id, int partnerId)
        {
            _data.DelPartnerPhoto(id);
            return Redirect(Url.Action("UpdatePartnerPhoto", "Admin", new { id = partnerId }));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Partners)]
        public ActionResult DelPartnerAllPhoto(int partnerId)
        {
            _data.DelPartnerAllPhoto(partnerId);
            return Redirect(Url.Action("UpdatePartnerPhoto", "Admin", new { id = partnerId }));
        }

        [HttpPost]
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Partners)]
        public ActionResult AddPartnerPhoto(int id, IEnumerable<HttpPostedFileBase> file, string video)
        {
            foreach (HttpPostedFileBase f in file)
            {
                PartnersImage partnerImage = new PartnersImage();
                byte[] b = new byte[f.ContentLength];
                f.InputStream.Read(b, 0, f.ContentLength);
                partnerImage.Image = _data.UploadImageRet(new Image() { Data = b });
                partnerImage.PartnerId = id;
                if (!string.IsNullOrEmpty(video))
                {
                    partnerImage.VideoUrl = video;
                }
                _data.AddPartnerPhoto(partnerImage);
            }
            return Redirect(Url.Action("UpdatePartnerPhoto", "Admin", new { id = id }));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Partners)]
        public ActionResult UpdatePartner(int id)
        {
            ViewBag.PartnerCategories = _data.GetPartnerCategories();
            ViewBag.Partner = _data.GetPartner(id);

            if (ViewBag.Partner.Price != null)
            {
                ViewBag.Partner.Price = (int)ViewBag.Partner.Price;
            }

            ViewBag.PartnerImages = _data.GetPartnerImages(id);
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Partners)]
        public ActionResult UpdatePartner(string city, string trName, string rating, string firstName, string lastName, decimal? price, string profession, string viezd, string phone, string site, string email, string skype, string facebook, string vk, string isEnabled, int id, int prId, string text, string name, string shortText, string longText, HttpPostedFileBase file, HttpPostedFileBase file1, HttpPostedFileBase file2)
        {
            Partners partner = _data.GetPartner(id);

            partner.ShortDescription = shortText;
            partner.Description = longText;
            partner.Name = name.Trim();
            partner.CategoryId = prId;
            partner.City = city;
            partner.FirstName = firstName.Trim();
            partner.LastName = lastName.Trim();
            partner.TrName = trName.Trim();
            partner.Profession = profession;
            partner.Viezd = viezd.Trim();
            partner.Phone = phone;
            partner.Site = site.Contains(@"http:") ? site.Remove(0, 7) : site;
            partner.Email = email;
            partner.Skype = skype;
            partner.Facebook = facebook.Contains(@"https:") ? facebook.Remove(0, 21) : facebook;
            partner.Vk = vk.Contains(@"http:") ? vk.Remove(0, 14) : vk;
            partner.Rating = Convert.ToInt32(rating);

            partner.Price = price;



            if (file != null)
            {
                byte[] b = new byte[file.ContentLength];
                file.InputStream.Read(b, 0, file.ContentLength);
                partner.Image = _data.UploadImageRet(new Image() { Data = b });
            }

            if (file1 != null)
            {
                byte[] b1 = new byte[file1.ContentLength];
                file1.InputStream.Read(b1, 0, file1.ContentLength);
                partner.Avatar = _data.UploadImageRet(new Image() { Data = b1 });
            }

            if (file2 != null)
            {
                byte[] b2 = new byte[file2.ContentLength];
                file2.InputStream.Read(b2, 0, file2.ContentLength);
                partner.ImageProfile = _data.UploadImageRet(new Image() { Data = b2 });
            }

            if (isEnabled != null && isEnabled.Trim() == "on")
            {
                partner.IsEnabled = true;
            }
            else
            {
                partner.IsEnabled = false;
            }

            _data.UpdatePartner(partner);
            return Redirect(Url.Action("PartnerIndex", "Home", new { id = partner.TrName }));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Partners)]
        public ActionResult UpdatePartnerPhoto(int id)
        {
            ViewBag.Partner = _data.GetPartner(id);
            ViewBag.PartnerImages = _data.GetPartnerImages(id);

            return View();
        }


        #endregion

        #region Portfolio
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Portfolio)]
        public ActionResult AddPortfolio()
        {
            ViewBag.AllDirection = _data.GetDirections();
            return View();
        }

        [ValidateInput(false)]
        [HttpPost]
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Portfolio)]
        public ActionResult AddPortfolio(string name, string shortText, string longText, string text, HttpPostedFileBase file, HttpPostedFileBase file1, HttpPostedFileBase file2, HttpPostedFileBase file3, HttpPostedFileBase file4, HttpPostedFileBase file5, HttpPostedFileBase file6, HttpPostedFileBase file7, HttpPostedFileBase file8, HttpPostedFileBase file9, HttpPostedFileBase smallFile, string tag, string vis, string dir)
        {
            Portfolio portfolio = new Portfolio();
            byte[] b = new byte[file.ContentLength];
            file.InputStream.Read(b, 0, file.ContentLength);

            portfolio.Image = _data.UploadImageRet(new Image() { Data = b });
            portfolio.CreationDate = DateTime.Now;
            portfolio.ShortText = shortText;
            portfolio.LongText = longText;
            portfolio.Text = text;
            portfolio.Name = name.Trim();
            portfolio.DirectionId = int.Parse(dir);
            portfolio.Tag = tag;

            if (vis != null && vis.Trim() == "on")
            {
                portfolio.IsVisible = true;
            }
            else
            {
                portfolio.IsVisible = false;
            }

            if (file1 != null)
            {
                byte[] b1 = new byte[file1.ContentLength];
                file1.InputStream.Read(b1, 0, file1.ContentLength);
                portfolio.Image1 = _data.UploadImageRet(new Image() { Data = b1 });
            }

            if (file2 != null)
            {
                byte[] b2 = new byte[file2.ContentLength];
                file2.InputStream.Read(b2, 0, file2.ContentLength);
                portfolio.Image2 = _data.UploadImageRet(new Image() { Data = b2 });
            }

            if (file3 != null)
            {
                byte[] b3 = new byte[file3.ContentLength];
                file3.InputStream.Read(b3, 0, file3.ContentLength);
                portfolio.Image3 = _data.UploadImageRet(new Image() { Data = b3 });
            }

            if (file4 != null)
            {
                byte[] b4 = new byte[file4.ContentLength];
                file4.InputStream.Read(b4, 0, file4.ContentLength);
                portfolio.Image4 = _data.UploadImageRet(new Image() { Data = b4 });
            }

            if (file5 != null)
            {
                byte[] b5 = new byte[file5.ContentLength];
                file5.InputStream.Read(b5, 0, file5.ContentLength);
                portfolio.Image5 = _data.UploadImageRet(new Image() { Data = b5 });
            }

            if (file6 != null)
            {
                byte[] b6 = new byte[file6.ContentLength];
                file6.InputStream.Read(b6, 0, file6.ContentLength);
                portfolio.Image6 = _data.UploadImageRet(new Image() { Data = b6 });
            }

            if (file7 != null)
            {
                byte[] b7 = new byte[file7.ContentLength];
                file7.InputStream.Read(b7, 0, file7.ContentLength);
                portfolio.Image7 = _data.UploadImageRet(new Image() { Data = b7 });
            }

            if (file8 != null)
            {
                byte[] b8 = new byte[file8.ContentLength];
                file8.InputStream.Read(b8, 0, file8.ContentLength);
                portfolio.Image8 = _data.UploadImageRet(new Image() { Data = b8 });
            }

            if (file9 != null)
            {
                byte[] b9 = new byte[file9.ContentLength];
                file9.InputStream.Read(b9, 0, file9.ContentLength);
                portfolio.Image9 = _data.UploadImageRet(new Image() { Data = b9 });
            }

            if (smallFile != null)
            {
                byte[] b10 = new byte[smallFile.ContentLength];
                smallFile.InputStream.Read(b10, 0, smallFile.ContentLength);
                portfolio.SmallImage = _data.UploadImageRet(new Image() { Data = b10 });
            }

            _data.AddPortfolio(portfolio);

            return Redirect(Url.Action("AddPortfolio", "Admin"));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Portfolio)]
        public ActionResult DelPortfolio(int id)
        {
            _data.DelPortfolio(id);
            return Redirect(Url.Action("Portfolio", "Home"));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Portfolio)]
        public ActionResult UpdatePortfolio(int id)
        {
            ViewBag.Portfolio = _data.GetPortfolio(id);
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Portfolio)]
        public ActionResult UpdatePortfolio(int id, string text, string name, string shortText, string longText, HttpPostedFileBase file, HttpPostedFileBase file1, HttpPostedFileBase file2, HttpPostedFileBase file3, HttpPostedFileBase file4, HttpPostedFileBase file5, HttpPostedFileBase file6, HttpPostedFileBase file7, HttpPostedFileBase file8, HttpPostedFileBase file9, HttpPostedFileBase smallFile, string filedel1, string filedel2, string filedel3, string filedel4, string filedel5, string filedel6, string filedel7, string filedel8, string filedel9, string smallFiledel, string tag, string vis)
        {
            Portfolio portfolio = new Portfolio();
            portfolio.DirectionId = 1;
            if (file != null)
            {
                byte[] b = new byte[file.ContentLength];
                file.InputStream.Read(b, 0, file.ContentLength);
                portfolio.Image = _data.UploadImageRet(new Image() { Data = b });
            }

            if (file1 != null)
            {
                byte[] b1 = new byte[file1.ContentLength];
                file1.InputStream.Read(b1, 0, file1.ContentLength);
                portfolio.Image1 = _data.UploadImageRet(new Image() { Data = b1 });
            }

            if (file2 != null)
            {
                byte[] b2 = new byte[file2.ContentLength];
                file2.InputStream.Read(b2, 0, file2.ContentLength);
                portfolio.Image2 = _data.UploadImageRet(new Image() { Data = b2 });
            }

            if (file3 != null)
            {
                byte[] b3 = new byte[file3.ContentLength];
                file3.InputStream.Read(b3, 0, file3.ContentLength);
                portfolio.Image3 = _data.UploadImageRet(new Image() { Data = b3 });
            }

            if (file4 != null)
            {
                byte[] b4 = new byte[file4.ContentLength];
                file4.InputStream.Read(b4, 0, file4.ContentLength);
                portfolio.Image4 = _data.UploadImageRet(new Image() { Data = b4 });
            }

            if (file5 != null)
            {
                byte[] b5 = new byte[file5.ContentLength];
                file5.InputStream.Read(b5, 0, file5.ContentLength);
                portfolio.Image5 = _data.UploadImageRet(new Image() { Data = b5 });
            }

            if (file6 != null)
            {
                byte[] b6 = new byte[file6.ContentLength];
                file6.InputStream.Read(b6, 0, file6.ContentLength);
                portfolio.Image6 = _data.UploadImageRet(new Image() { Data = b6 });
            }

            if (file7 != null)
            {
                byte[] b7 = new byte[file7.ContentLength];
                file7.InputStream.Read(b7, 0, file7.ContentLength);
                portfolio.Image7 = _data.UploadImageRet(new Image() { Data = b7 });
            }

            if (file8 != null)
            {
                byte[] b8 = new byte[file8.ContentLength];
                file8.InputStream.Read(b8, 0, file8.ContentLength);
                portfolio.Image8 = _data.UploadImageRet(new Image() { Data = b8 });
            }

            if (file9 != null)
            {
                byte[] b9 = new byte[file9.ContentLength];
                file9.InputStream.Read(b9, 0, file9.ContentLength);
                portfolio.Image9 = _data.UploadImageRet(new Image() { Data = b9 });
            }

            if (smallFile != null)
            {
                byte[] b10 = new byte[smallFile.ContentLength];
                smallFile.InputStream.Read(b10, 0, smallFile.ContentLength);
                portfolio.SmallImage = _data.UploadImageRet(new Image() { Data = b10 });
            }

            if (vis != null && vis.Trim() == "on")
            {
                portfolio.IsVisible = true;
            }
            else
            {
                portfolio.IsVisible = false;
            }

            _data.UpdatePortfolio(id, text, name, shortText, longText, portfolio, filedel1, filedel2, filedel3, filedel4, filedel5, filedel6, filedel7, filedel8, filedel9, smallFiledel, tag);
            return Redirect(Url.Action("Portfolio", "Home"));
        }
        #endregion

        #region Blog
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Blog)]
        public ActionResult AddSanta()
        {

            return View();
        }

        [ValidateInput(false)]
        [HttpPost]
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Blog)]
        public ActionResult AddSanta(string name, string shortText, string longText, string text, HttpPostedFileBase file, HttpPostedFileBase file1, HttpPostedFileBase file2, HttpPostedFileBase file3, HttpPostedFileBase file4, HttpPostedFileBase file5, HttpPostedFileBase file6, HttpPostedFileBase file7, HttpPostedFileBase file8, HttpPostedFileBase file9, HttpPostedFileBase smallFile, string tag, string vis)
        {
            Blog portfolio = new Blog();
            byte[] b = new byte[file.ContentLength];
            file.InputStream.Read(b, 0, file.ContentLength);

            portfolio.Image = _data.UploadImageRet(new Image() { Data = b });
            portfolio.CreationDate = DateTime.Now;
            portfolio.ShortText = shortText;
            portfolio.LongText = longText;
            portfolio.Text = text;
            portfolio.Name = name.Trim();
            portfolio.Tag = tag;

            if (vis != null && vis.Trim() == "on")
            {
                portfolio.IsVisible = true;
            }
            else
            {
                portfolio.IsVisible = false;
            }

            if (file1 != null)
            {
                byte[] b1 = new byte[file1.ContentLength];
                file1.InputStream.Read(b1, 0, file1.ContentLength);
                portfolio.Image1 = _data.UploadImageRet(new Image() { Data = b1 });
            }

            if (file2 != null)
            {
                byte[] b2 = new byte[file2.ContentLength];
                file2.InputStream.Read(b2, 0, file2.ContentLength);
                portfolio.Image2 = _data.UploadImageRet(new Image() { Data = b2 });
            }

            if (file3 != null)
            {
                byte[] b3 = new byte[file3.ContentLength];
                file3.InputStream.Read(b3, 0, file3.ContentLength);
                portfolio.Image3 = _data.UploadImageRet(new Image() { Data = b3 });
            }

            if (file4 != null)
            {
                byte[] b4 = new byte[file4.ContentLength];
                file4.InputStream.Read(b4, 0, file4.ContentLength);
                portfolio.Image4 = _data.UploadImageRet(new Image() { Data = b4 });
            }

            if (file5 != null)
            {
                byte[] b5 = new byte[file5.ContentLength];
                file5.InputStream.Read(b5, 0, file5.ContentLength);
                portfolio.Image5 = _data.UploadImageRet(new Image() { Data = b5 });
            }

            if (file6 != null)
            {
                byte[] b6 = new byte[file6.ContentLength];
                file6.InputStream.Read(b6, 0, file6.ContentLength);
                portfolio.Image6 = _data.UploadImageRet(new Image() { Data = b6 });
            }

            if (file7 != null)
            {
                byte[] b7 = new byte[file7.ContentLength];
                file7.InputStream.Read(b7, 0, file7.ContentLength);
                portfolio.Image7 = _data.UploadImageRet(new Image() { Data = b7 });
            }

            if (file8 != null)
            {
                byte[] b8 = new byte[file8.ContentLength];
                file8.InputStream.Read(b8, 0, file8.ContentLength);
                portfolio.Image8 = _data.UploadImageRet(new Image() { Data = b8 });
            }

            if (file9 != null)
            {
                byte[] b9 = new byte[file9.ContentLength];
                file9.InputStream.Read(b9, 0, file9.ContentLength);
                portfolio.Image9 = _data.UploadImageRet(new Image() { Data = b9 });
            }

            if (smallFile != null)
            {
                byte[] b10 = new byte[smallFile.ContentLength];
                smallFile.InputStream.Read(b10, 0, smallFile.ContentLength);
                portfolio.SmallImage = _data.UploadImageRet(new Image() { Data = b10 });
            }

            _data.AddSanta(portfolio);

            return Redirect(Url.Action("AddSanta", "Admin"));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Blog)]
        public ActionResult DelSanta(int id)
        {
            _data.DelSanta(id);
            return Redirect(Url.Action("Blog", "Home"));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Blog)]
        public ActionResult UpdateSanta(int id)
        {
            ViewBag.Portfolio = _data.GetSanta(id);
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Blog)]
        public ActionResult UpdateSanta(int id, string text, string name, string shortText, string longText, HttpPostedFileBase file, HttpPostedFileBase file1, HttpPostedFileBase file2, HttpPostedFileBase file3, HttpPostedFileBase file4, HttpPostedFileBase file5, HttpPostedFileBase file6, HttpPostedFileBase file7, HttpPostedFileBase file8, HttpPostedFileBase file9, HttpPostedFileBase smallFile, string filedel1, string filedel2, string filedel3, string filedel4, string filedel5, string filedel6, string filedel7, string filedel8, string filedel9, string tag, string vis, string smallFiledel)
        {
            Blog portfolio = new Blog();

            if (vis != null && vis.Trim() == "on")
            {
                portfolio.IsVisible = true;
            }
            else
            {
                portfolio.IsVisible = false;
            }

            if (file != null)
            {
                byte[] b = new byte[file.ContentLength];
                file.InputStream.Read(b, 0, file.ContentLength);
                portfolio.Image = _data.UploadImageRet(new Image() { Data = b });
            }

            if (file1 != null)
            {
                byte[] b1 = new byte[file1.ContentLength];
                file1.InputStream.Read(b1, 0, file1.ContentLength);
                portfolio.Image1 = _data.UploadImageRet(new Image() { Data = b1 });
            }

            if (file2 != null)
            {
                byte[] b2 = new byte[file2.ContentLength];
                file2.InputStream.Read(b2, 0, file2.ContentLength);
                portfolio.Image2 = _data.UploadImageRet(new Image() { Data = b2 });
            }

            if (file3 != null)
            {
                byte[] b3 = new byte[file3.ContentLength];
                file3.InputStream.Read(b3, 0, file3.ContentLength);
                portfolio.Image3 = _data.UploadImageRet(new Image() { Data = b3 });
            }

            if (file4 != null)
            {
                byte[] b4 = new byte[file4.ContentLength];
                file4.InputStream.Read(b4, 0, file4.ContentLength);
                portfolio.Image4 = _data.UploadImageRet(new Image() { Data = b4 });
            }

            if (file5 != null)
            {
                byte[] b5 = new byte[file5.ContentLength];
                file5.InputStream.Read(b5, 0, file5.ContentLength);
                portfolio.Image5 = _data.UploadImageRet(new Image() { Data = b5 });
            }

            if (file6 != null)
            {
                byte[] b6 = new byte[file6.ContentLength];
                file6.InputStream.Read(b6, 0, file6.ContentLength);
                portfolio.Image6 = _data.UploadImageRet(new Image() { Data = b6 });
            }

            if (file7 != null)
            {
                byte[] b7 = new byte[file7.ContentLength];
                file7.InputStream.Read(b7, 0, file7.ContentLength);
                portfolio.Image7 = _data.UploadImageRet(new Image() { Data = b7 });
            }

            if (file8 != null)
            {
                byte[] b8 = new byte[file8.ContentLength];
                file8.InputStream.Read(b8, 0, file8.ContentLength);
                portfolio.Image8 = _data.UploadImageRet(new Image() { Data = b8 });
            }

            if (file9 != null)
            {
                byte[] b9 = new byte[file9.ContentLength];
                file9.InputStream.Read(b9, 0, file9.ContentLength);
                portfolio.Image9 = _data.UploadImageRet(new Image() { Data = b9 });
            }

            if (smallFile != null)
            {
                byte[] b10 = new byte[smallFile.ContentLength];
                smallFile.InputStream.Read(b10, 0, smallFile.ContentLength);
                portfolio.SmallImage = _data.UploadImageRet(new Image() { Data = b10 });
            }

            _data.UpdateSanta(id, text, name, shortText, longText, portfolio, filedel1, filedel2, filedel3, filedel4, filedel5, filedel6, filedel7, filedel8, filedel9, tag, smallFiledel);
            return Redirect(Url.Action("Blog", "Home"));
        }
        #endregion

    }

    public class SendEmail
    {

        public void SendMail(string from, string[] toArr, string[] ccArr, string[] bccArr, string subject, string body,
                             bool isBodyHtml, MailPriority mailPriority)
        {
            MailMessage mm = new MailMessage();
            mm.From = new MailAddress(from, from);

            foreach (string to in toArr)
            {
                mm.To.Add(to);
            }
            foreach (string toCC in ccArr)
                mm.CC.Add(toCC);
            foreach (string bCC in bccArr)
                mm.Bcc.Add(bCC);

            mm.Subject = subject;
            mm.Body = body;
            mm.IsBodyHtml = isBodyHtml;
            mm.Priority = mailPriority;

            //SmtpClient smtpClient = new SmtpClient("ox10m.atservers.net", 587);
            //smtpClient.Credentials = new NetworkCredential("rita@ritaislands.ru", "Srp4866543");

            //SmtpClient smtpClient = new SmtpClient("smtp.live.com", 587);
            //smtpClient.Credentials = new NetworkCredential("ritaislands@outlook.com", "Srp123321");

            //SmtpClient smtpClient = new SmtpClient("ox10m.atservers.net", 587);
            //smtpClient.Credentials = new NetworkCredential("rita@ritaislands.ru", "Srp4866543");

            SmtpClient smtpClient = new SmtpClient("smtp.yandex.ru", 25);
            smtpClient.Credentials = new NetworkCredential("rita@ritaislands.ru", "Srp4866543");

            smtpClient.EnableSsl = true;
            smtpClient.Send(mm);
        }
    }

  

 
   

}
