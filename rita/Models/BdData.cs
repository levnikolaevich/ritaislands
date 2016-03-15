using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Web.Services.Description;
using rita.Helpers;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage;
using rita.Controllers;

namespace rita.Models
{
    
    public class BdData
    {
        private user1109194_bdEntities10 _context = new user1109194_bdEntities10();

        #region Статические переменные

        private int _countItemPortfolio = 5;
        private int _countItemSantorini = 5;

        #endregion
 
        public bool IsAuthorize(string email, string password)
        {
            try
            {
                User user = _context.User.First(x => x.Email == email);
                return user != null && SimpleHash.VerifyHash(password, "md5", user.Password);
            }
// ReSharper disable once EmptyGeneralCatchClause
            catch
            {
                
            }
            return false;
        }

        public bool IsAction()
        {
            try
            {
                if(_context.Actions.Where(x=> x.IsVisible == true).Count() > 0)
                    return true;
            }
            // ReSharper disable once EmptyGeneralCatchClause
            catch
            {

            }
            return false;
        }

        private CloudBlobContainer GetContainer()
        {
            var account = CloudStorageAccount.Parse(System.Configuration.ConfigurationManager.AppSettings["StorageConnectionString"]);
            var client = account.CreateCloudBlobClient();
            return client.GetContainerReference(@"images");
        }

        #region Packet
        public List<Packet> GetPackets()
        {
            try
            {
                return _context.Packet.ToList();
            }
            catch
            {
                return new List<Packet>();
            }
        }

        public void AddPacket(string name, string description, decimal price, int placeId, int sortNumberTab, decimal economy)
        {
            try
            {
                _context.Packet.Add(new Packet()
                {
                    Name = name,
                    Description = description,
                    Price = price,
                    PlaceId = placeId,
                    SortNumberTab = sortNumberTab,
                    Economy = economy
                });
                _context.SaveChanges();
            }
            catch
            {
                
            }
        }

        public void EditPacket(int id, string name, string description, decimal price, int placeId, int sortNumberTab, decimal economy)
        {
            try
            {
                Packet packet = _context.Packet.FirstOrDefault(x => x.Id == id);
                if (packet != null)
                {
                    packet.Name = name;
                    packet.Description = description;
                    packet.Price = price;
                    packet.PlaceId = placeId;
                    packet.SortNumberTab = sortNumberTab;
                    packet.Economy = economy;
                }
                _context.SaveChanges();
            }
            catch
            {

            }
        }

        public Packet GetPacket(int id)
        {
            try
            {
                return _context.Packet.FirstOrDefault(x => x.Id == id);
            }
            catch
            {
                return null;
            }
        }

        public void DelPacket(int id)
        {
            try
            {
                foreach (PacketService packetService in _context.PacketService.Where(x=> x.PacketId == id))
                {
                    _context.PacketService.Remove(packetService);
                }
                _context.Packet.Remove(_context.Packet.FirstOrDefault(x => x.Id == id));
                _context.SaveChanges();
            }
            catch
            {
            }
        }

        public void AddPacketService(int packetId, int serviceId, int? count)
        {
            try
            {
                PacketService packetService = _context.PacketService.Create();
                packetService.Count = count;
                packetService.PacketId = packetId;
                packetService.ServiceId = serviceId;
                _context.PacketService.Add(packetService);
                _context.SaveChanges();
            }
            catch
            {
            }
        }

        public void DelPacketService(int packetId, int serviceId)
        {
            try
            {
                PacketService packetService = _context.PacketService.First(x => x.PacketId == packetId && x.ServiceId == serviceId);
                _context.PacketService.Remove(packetService);
                _context.SaveChanges();
            }
            catch
            {
            }
        }
        #endregion


        #region Feedback
        public List<Feedback> GetFeedbacks()
        {
            try
            {
                return _context.Feedback.OrderByDescending(y => y.CreationDate).ToList();
            }
            catch
            {
                return new List<Feedback>();
            }
        }

        

        public Feedback GetFeedbackId(int idFeedback)
        {
            try
            {
                return _context.Feedback.Where(x => x.Id == idFeedback).First();
            }
            catch
            {
                return null;
            }
        }

        public void AddFeedback(Feedback feedback)
        {
            try
            {
                _context.Feedback.Add(feedback);
                _context.SaveChanges();
            }
            catch
            {
                
            }
        }

        public void UpdateFeedback(Feedback feedback)
        {
            try
            {               
                _context.SaveChanges();
            }
            catch
            {

            }
        }

        public void DelFeedback(Feedback feedback)
        {
            try
            {
                _context.Feedback.Remove(feedback);
                _context.SaveChanges();
            }
            catch
            {

            }
        }

        #endregion 


        #region Service

        public void SavePlayService(int placeId, Dictionary<int, decimal?> dictServices)
        {
            Places place = _context.Places.First(x => x.Id == placeId);
            Dictionary<int, PlaceService> dict = _context.PlaceService.Where(x => x.PlaceId == placeId).ToDictionary(x => x.ServiceId);

            foreach (KeyValuePair<int, decimal?> pair in dictServices)
            {
                decimal price = 0;
                if (pair.Value != null)
                {
                    price = pair.Value.Value;
                }

                if (dict.ContainsKey(pair.Key))
                {
                    dict[pair.Key].Price = price;
                }
                else
                {
                    PlaceService placeService = new PlaceService
                    {
                        PlaceId = placeId,
                        Price = price,
                        ServiceId = pair.Key
                    };
                    _context.PlaceService.Add(placeService);
                }
            }

            foreach (KeyValuePair<int, PlaceService> pair in dict)
            {
                if (!dictServices.ContainsKey(pair.Key))
                {
                    _context.PlaceService.Remove(pair.Value);
                }
            }

            _context.SaveChanges();
        }

        public Service GetService(int id)
        {
            try
            {
                return _context.Service.First(x => x.Id == id);
            }
            catch
            {
                return null;
            }
        }

        public void ServiceEdit(int id, string name, string description, int serviceTypeId, int serviceCategoryId)
        {
            try
            {
                Service service = _context.Service.First(x => x.Id == id);
                service.Name = name;
                service.Description = description;
                service.ServiceTypeId = serviceTypeId;
                service.ServiceCategoryId = serviceCategoryId;
                _context.SaveChanges();
            }
            catch
            {
            }
        }

        public void ServiceDel(int id)
        {
            Service service = _context.Service.First(x => x.Id == id);
            _context.Service.Remove(service);
            _context.SaveChanges();
        }

        public void PlaceServiceDel(int placeId, int serviceId)
        {
            try
            {
                PlaceService service = _context.PlaceService.First(x => x.PlaceId == placeId && x.ServiceId == serviceId);
                _context.PlaceService.Remove(service);
                _context.SaveChanges();
            }
            catch
            {
                
            }
        }

        public void ServiceAdd(string name, string description, int serviceTypeId, int serviceCategoryId)
        {
            Service service = _context.Service.Create();
            service.Name = name;
            service.Description = description;
            service.ServiceTypeId = serviceTypeId;
            service.ServiceCategoryId = serviceCategoryId;
            service.CreationDate = DateTime.Now;
            _context.Service.Add(service);
            _context.SaveChanges();
        }

        public List<Service> GetServices()
        {
            try
            {
                return _context.Service.ToList();
            }
            catch
            {
                return new List<Service>();
            }
        }

        public List<PlaceService> GetPacketService(int packetId)
        {
            try
            {
                Packet packet = _context.Packet.First(x => x.Id == packetId);
                return _context.PlaceService.Where(x => x.PlaceId == packet.PlaceId && x.Service.PacketService.Count(y=> y.PacketId == packetId) == 0).ToList();
            }
            catch
            {
                return new List<PlaceService>();
            }
        }

        public List<PlaceService> GetPlaceServices(int placeId)
        {
            try
            {
                return _context.PlaceService.Where(x=> x.PlaceId == placeId)./*Select(x=> x.Service).*/ToList();
            }
            catch
            {
                return new List<PlaceService>();
            }
        }

        public void AddPlaceService(int placeId, int serviceId, decimal price)
        {
            try
            {
                PlaceService placeService = _context.PlaceService.Create();
                placeService.PlaceId = placeId;
                placeService.ServiceId = serviceId;
                placeService.Price = price;
                _context.PlaceService.Add(placeService);
                _context.SaveChanges();
            }
            catch
            {
            }
        }

        public List<ServiceType> GetServiceTypes()
        {
            try
            {
                return _context.ServiceType.ToList();
            }
            catch
            {
                return new List<ServiceType>();
            }
        }

        public List<ServiceCategory> GetServiceCategorys()
        {
            try
            {
                return _context.ServiceCategory.ToList();
            }
            catch
            {
                return new List<ServiceCategory>();
            }
        }
        #endregion

        #region Cookie
        public Cookie AddCookie(Cookie cookie)
        {
            try
            {
                cookie.Id = Guid.NewGuid();
                cookie.CreationDate = DateTime.Now;
                _context.Cookie.Add(cookie);
                _context.SaveChanges();
                return cookie;
            }
// ReSharper disable once EmptyGeneralCatchClause
            catch
            {
                return null;
            }
        }

        public Cookie GetCookie(Guid id)
        {
            try
            {
                return _context.Cookie.First(x => x.Id == id);
            }
            catch
            {
                return null;
            }
        }

        public Cookie GetCookieUser(int userId)
        {
            try
            {
                return _context.Cookie.First(x => x.User.Id == userId);
            }
            catch
            {
                return null;
            }
        }

        public void UpdateCookie(Cookie cookie)
        {
            try
            {
                _context.SaveChanges();
            }
            catch
            {
            }
        }

        public void AddCookieLog(List<CookieLog> listCookie)
        {
            try
            {
                foreach (CookieLog cookie in listCookie)
                {
                    cookie.CreationDate = DateTime.Now;
                    _context.CookieLog.Add(cookie);
                }
                _context.SaveChanges();
            }
            // ReSharper disable once EmptyGeneralCatchClause
            catch
            {
            }
        }

        public void CalculateRatingPartners(DateTime date)
        {
            try
            {
                DateTime dt = date.Date;
                DateTime df = date.AddDays(1).Date;
                foreach (Partners partners in _context.Partners.Where(x => x.IsEnabled && x.PartnersRating.Count(y => y.Date == date.Date) == 0))
                {
                    if (partners.Rating == null)
                    {
                        partners.Rating = 0;
                    }
                    List<string> listIp = new List<string>();
                    foreach (CookieLog cookieLog in _context.CookieLog.Where(x => x.CreationDate >= dt && x.CreationDate < df && x.Url.Contains(partners.TrName) && x.Cookie.UserId == null))
                    {
                        if (listIp.Contains(cookieLog.Ip)) continue;
                        if (cookieLog.Cookie.StartPointUrl.Contains(partners.TrName))
                        {
                            partners.Rating += (int) RatingPartners.StartPointPartner;
                        }
                        else
                        {
                            partners.Rating += (int) RatingPartners.StartPointNotPartner;
                        }
                        listIp.Add(cookieLog.Ip);
                    }
                    _context.PartnersRating.Add(new PartnersRating() {PartnersId = partners.Id, Date = date});
                }
                _context.SaveChanges();
                WriteLog(String.Format("CalculateRatingPartners End date={0}", date));
            }
            catch (Exception exception)
            {
                WriteLog(String.Format("CalculateRatingPartners error date={0} error=", date, exception.Message));
            }
        }
        #endregion

        #region RolePermission
        public string[] GetAllPermissions()
        {
// ReSharper disable once SpecifyACultureInStringConversionExplicitly
            return _context.Permission.Select(x => x.Id.ToString()).ToArray();
        }

        public List<int> GetPermissions(int userId)
        {
            List<int> list = new List<int>();
            foreach (Role role in _context.User.Where(x => x.Id == userId).First().Role)
            {
                foreach (Permission permission in role.Permission)
                {
                    list.Add(permission.Id);
                }
            }
            return list;
        }

        #endregion

        #region Users
        public User AddUser(User user)
        {
            user.Password = SimpleHash.ComputeHash(user.Password, "md5", null);
            _context.User.Add(user);
            _context.SaveChanges();
            Role role = _context.Role.Where(x => x.Id == 2).First();
            user.Role.Add(role);
            _context.SaveChanges();
            return user;
        }

        public bool CheckGuidRecovery(Guid id)
        {
            try
            {
                return _context.UrlRecoveryPassword.Where(x => x.Id == id && x.DateEnd > DateTime.Now).Count() > 0;
            }
            catch
            {
                return false;
            }
        }

        public UrlRecoveryPassword GetGuidRecovery(Guid id)
        {
            try
            {
                return _context.UrlRecoveryPassword.Where(x => x.Id == id).First();
            }
            catch
            {
                return null;
            }
        }

        public bool RecoveryPassword(string email, string ip)
        {
            try
            {
                User user = _context.User.Where(x => x.Email == email).First();
                UrlRecoveryPassword url = _context.UrlRecoveryPassword.Create();
                url.Email = user.Email;
                url.Id = Guid.NewGuid();
                url.CreationDate = DateTime.Now;
                url.DateEnd = DateTime.Now.AddDays(2);
                url.Ip = ip;
                _context.UrlRecoveryPassword.Add(url);
                _context.SaveChanges();

                string body = @"
Добрый день, на сайте RitaIslands.ru запросили восстановление пароля для Вашего аккаунта.
Если это делали не Вы, то проигнорируйте это письмо.
Ссылка на восстановление http://ritaislands.ru/svadba-za-granicey/RecoveryPasswordFromEmail/" + url.Id.ToString();


                WriteEmail(body, "Recovery password");
                SendEmail sendEmail = new SendEmail();
                sendEmail.SendMail(@"rita@ritaislands.ru", new[] { email }, new string[0], new string[0], "Recovery password", body, true, MailPriority.High);

                return true;
            }
            catch
            {
                return false;
            }
        }

        public void ChangePassword(User user)
        {
            user.Password = SimpleHash.ComputeHash(user.Password, "md5", null);
            _context.SaveChanges();
        }

        public void DeleteUser(string email)
        {
            _context.User.Remove(GetUser(email));
            _context.SaveChanges();
        }

        public void DeleteUser(int id)
        {
            _context.User.Remove(GetUser(id));
            _context.SaveChanges();
        }


        //public void ConvertPassword()
        //{
        //    foreach (User user in _context.User)
        //    {
        //        user.Password = SimpleHash.ComputeHash(user.Password, "md5", null);
        //    }
        //    _context.SaveChanges();
        //}

        public User GetUser(string email)
        {
            try
            {
                User user = _context.User.Where(x => x.Email == email).First();
                user.Permissions = GetPermissions(user.Id);
                return user;
            }
            catch (Exception)
            {
                return null;
            }
        }


        public User GetUser(int id)
        {
            try
            {
                User user = _context.User.Where(x => x.Id == id).First();
                user.Permissions = GetPermissions(user.Id);
                return user;
            }
            catch (Exception)
            {
                return null;
            }
        }


        public string[] GetUserFromPerm(int permId)
        {
            try
            {
                List<string> list = new List<string>();
                foreach (Permission permission in _context.Permission.Where(x => x.Id == permId))
                {
                    foreach (Role role in permission.Role)
                    {
                        foreach (User user in role.User)
                        {
                            if (!list.Contains(user.Email))
                            {
                                list.Add(user.Email);
                            }
                        }
                    }
                }
                return list.ToArray();
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region Action

        public void AddAction(Actions action)
        {
            try
            {
                WriteLog("Нач");
                action.CreationDate = DateTime.Now;
                action.TrName = Translit.Translate(action.Name);

                _context.Actions.Add(action);
                _context.SaveChanges();
            }
            catch (Exception exception)
            {
                WriteLog(exception.Message);
            }
            
        }

        public void UpdateAction(Actions action)
        {

            _context.SaveChanges();
        }

        public List<ActionType> GetActionType()
        {
            return _context.ActionType.ToList();
        }

        public List<Actions> GetActions()
        {
            return _context.Actions.OrderByDescending(x => x.Id).ToList();
        }

        public List<Actions> GetActionsTopX(int id)
        {
            return _context.Actions.Where(x => x.IsVisible == true).OrderByDescending(x => x.CreationDate).Take(id).ToList();
        }

        public List<Actions> GetActionsFromDirTrname(string id)
        {
            List<Actions> result = new List<Actions>();
            foreach (var VARIABLE in _context.ActionDirection.Where(x => x.Direction.TrName == id))
            {
                result.Add(VARIABLE.Actions);
            }

            return result;
        }

        public List<Actions> GetActionsFromDirTrnameVis(string id)
        {
            List<Actions> result = new List<Actions>();
            foreach (var VARIABLE in _context.ActionDirection.Where(x => x.Direction.TrName == id && x.Actions.IsVisible == true))
            {
                result.Add(VARIABLE.Actions);
            }

            return result;
        }

        public List<Actions> GetActionsFromPartTrname(string id)
        {
            List<Actions> result = new List<Actions>();
            foreach (var VARIABLE in _context.ActionPartner.Where(x => x.Partners.TrName == id))
            {
                result.Add(VARIABLE.Actions);
            }

            return result;
        }

        public List<Actions> GetActionsFromPartTrnameVis(string id)
        {
            List<Actions> result = new List<Actions>();
            foreach (var VARIABLE in _context.ActionPartner.Where(x => x.Partners.TrName == id && x.Actions.IsVisible == true))
            {
                result.Add(VARIABLE.Actions);
            }

            return result;
        }

        public List<Actions> GetActionsFromPlaceTrnameVis(string id)
        {
            List<Actions> result = new List<Actions>();
            foreach (var VARIABLE in _context.ActionPlace.Where(x => x.Places.TrName == id && x.Actions.IsVisible == true))
            {
                result.Add(VARIABLE.Actions);
            }

            return result;
        }

        public List<Actions> GetActionsFromPlaceTrname(string id)
        {
            List<Actions> result = new List<Actions>();
            foreach (var VARIABLE in _context.ActionPlace.Where(x => x.Places.TrName == id))
            {
                result.Add(VARIABLE.Actions);
            }

            return result;
        }

        public List<Direction> GetDirectionWithAction()
        {
            return _context.Direction.Where(x => x.ActionDirection.Count > 0).ToList();
        }

        public List<Direction> GetDirectionWithActionVis()
        {
            List<Direction> result = new List<Direction>();
            foreach (var VARIABLE in _context.ActionDirection.Where(x => x.Actions.IsVisible == true))
            {
                if (!result.Contains(VARIABLE.Direction))
                {
                    result.Add(VARIABLE.Direction);
                }
            }
            return result;
        }

      

        /// <summary>
        /// Получить видимые акции
        /// </summary>
        /// <returns></returns>
        public List<Actions> GetAllVisibleActions()
        {
            return _context.Actions.Where(x => x.IsVisible == true).OrderByDescending(x => x.Id).ToList();
        }

        /// <summary>
        /// Получить Акцию по ID
        /// </summary>
        /// <param name="id">id акции</param>
        /// <returns></returns>
        public Actions GetActionId(int id)
        {
            return _context.Actions.Where(x => x.Id == id).First();
        }

        public Actions GetActionVisible(int id)
        {
            try
            {
                return _context.Actions.Where(x => x.Id == id && x.IsVisible == true).First();
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Получить Акцию по TrName
        /// </summary>
        /// <param name="id">TrName</param>
        /// <returns></returns>
        public Actions GetActionTrName(string id)
        {
            try
            {
                return _context.Actions.Where(x => x.TrName == id).First();
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Удалить акцию
        /// </summary>
        /// <param name="id">id акции</param>
        public void DelAction(int id)
        {
            try
            {
                DelActionPackAll(id);
                DelActionPlaceAll(id);
                DelActionDirectionAll(id);
                Actions action = _context.Actions.Where(x => x.Id == id).First();
                _context.Actions.Remove(action);
                _context.SaveChanges();
            }
            catch
            {
            }
        }

        public Actions GetActionsLast()
        {
            try
            {
                return _context.Actions.Where(u => u.IsVisible == true).OrderByDescending(u => u.Id).FirstOrDefault();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public int? GetActionsMaxId()
        {
            try
            {
                return _context.Actions.Where(u => u.IsVisible == true).OrderByDescending(u => u.Id).FirstOrDefault().Id;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public int? GetActionsMinId()
        {
            try
            {
                return _context.Actions.Where(u => u.IsVisible == true).OrderBy(u => u.Id).FirstOrDefault().Id;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public ActionType GetActionType(int id)
        {
            try
            {
                return _context.ActionType.Where(x => x.Id == id).First();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Actions GetAction(int id)
        {
            try
            {
                return _context.Actions.Where(x => x.Id == id).First();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public ActionDirection AddActionDirection(int actionId, int directionId)
        {
            ActionDirection actionDirection = new ActionDirection();
            actionDirection.ActionId = actionId;
            actionDirection.DirectionId = directionId;
            actionDirection.CreationDate = DateTime.Now;
            _context.ActionDirection.Add(actionDirection);
            _context.SaveChanges();
            return actionDirection;
        }

        public ActionPlace AddActionPlace(int actionId, int placeId)
        {
            ActionPlace actionDirection = new ActionPlace();
            actionDirection.ActionId = actionId;
            actionDirection.PlaceId = placeId;
            actionDirection.CreationDate = DateTime.Now;
            _context.ActionPlace.Add(actionDirection);
            _context.SaveChanges();
            return actionDirection;
        }

        public ActionPack AddActionPack(int actionId, int packId)
        {
            ActionPack actionDirection = new ActionPack();
            actionDirection.ActionId = actionId;
            actionDirection.PackId = packId;
            actionDirection.CreationDate = DateTime.Now;
            _context.ActionPack.Add(actionDirection);
            _context.SaveChanges();
            return actionDirection;
        }

        public void DelActionPack(int actionId, int packId)
        {
            ActionPack actionPack = _context.ActionPack.Where(x=> x.ActionId == actionId && x.PackId == packId).First();
            _context.ActionPack.Remove(actionPack);
            _context.SaveChanges();
        }

        public void DelActionPlace(int actionId, int placeId)
        {
            foreach (var source in _context.ActionPack.Where(x=> x.Pack.PlaceId == placeId))
            {
                _context.ActionPack.Remove(source);
            }
            ActionPlace actionPlace = _context.ActionPlace.Where(x => x.ActionId == actionId && x.PlaceId == placeId).First();
            _context.ActionPlace.Remove(actionPlace);
            _context.SaveChanges();
        }

        public void DelActionDirection(int actionId, int directionId)
        {
            foreach (var source in _context.ActionPack.Where(x => x.Pack.Places.DirectionId == directionId))
            {
                _context.ActionPack.Remove(source);
            }
            foreach (var source in _context.ActionPlace.Where(x => x.Places.DirectionId == directionId))
            {
                _context.ActionPlace.Remove(source);
            }
            ActionDirection actionDirection = _context.ActionDirection.Where(x => x.ActionId == actionId && x.DirectionId == directionId).First();
            _context.ActionDirection.Remove(actionDirection);
            _context.SaveChanges();
        }

        public void DelActionDirectionAll(int id)
        {
            foreach (var perem in _context.ActionDirection.Where(x=> x.ActionId == id))
            {
                _context.ActionDirection.Remove(perem);
            }
            _context.SaveChanges();
        }

        public void DelActionPlaceAll(int id)
        {
            foreach (var perem in _context.ActionPlace.Where(x => x.ActionId == id))
            {
                _context.ActionPlace.Remove(perem);
            }
            _context.SaveChanges();
        }

        public void DelActionPackAll(int id)
        {
            foreach (var perem in _context.ActionPack.Where(x => x.ActionId == id))
            {
                _context.ActionPack.Remove(perem);
            }
            _context.SaveChanges();
        }

        public List<ActionDirection> GetActionDirections(int actionId)
        {
            try
            {
                return _context.ActionDirection.Where(x => x.ActionId == actionId).ToList();
            }
            catch (Exception)
            {
                return new List<ActionDirection>();
            }
        }

        public Dictionary<int, ActionPlace> GetAllPlacesIds(int actionId)
        {
            return _context.ActionPlace.Where(x => x.ActionId == actionId).ToDictionary(y => y.PlaceId);
        }

        public Dictionary<int, ActionPack> GetAllPacksIds(int actionId)
        {
            return _context.ActionPack.Where(x => x.ActionId == actionId).ToDictionary(y => y.PackId);
        }
        #endregion

        #region Logs
        public void WriteLog(string text)
        {
            _context.Logs.Add(new Logs() {Text = text, Date = DateTime.Now});
            _context.SaveChanges();
        }

        public void WriteEmail(string text, string subject)
        {
            try
            {
                _context.Notification.Add(new Notification() { Text = text, CreationDate = DateTime.Now, Subject = subject });
                _context.SaveChanges();
            }
            catch { }
        }


        #endregion

        #region Pack
        //public List<Pack> GetPacksMain(int PlaceId)
        //{
        //    List<Pack> list = _context.Pack.Where(x => x.PlaceId == PlaceId).ToList();
        //    return list;
        //}
        public List<Pack> GetPacks(int placeId)
        {
            return _context.Pack.Where(x => x.PlaceId == placeId).ToList();
        }

        public List<Pack> GetPacksAll()
        {
            return _context.Pack.ToList();
        }

        public void AddPack(Pack packet)
        {
            //packet.CreationDate = DateTime.Now;
            _context.Pack.Add(packet);
            _context.SaveChanges();
        }

        public void UpdatePack(Pack packet)
        {
            _context.SaveChanges();
        }

        public void DelPack(int id)
        {
            try
            {
                Pack packet = _context.Pack.Where(x => x.Id == id).First();
                _context.Pack.Remove(packet);
                _context.SaveChanges();
            }
            catch (Exception exception)
            {
            }
        }

        public Pack GetPack(int id)
        {
            try
            {
                return _context.Pack.Where(x => x.Id == id).First();
            }
            catch (Exception)
            {
                return null;
            }
        }

        #endregion

        #region Direction


        public Direction GetDirectionLast()
        {
            try
            {
                return _context.Direction.OrderByDescending(u => u.Id).FirstOrDefault();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public int? GetDirectionMaxRate(int DirectionRate)
        {
            try
            {
                return _context.Direction.Where(u => u.Rate == DirectionRate).OrderByDescending(u => u.Rate).FirstOrDefault().Rate;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public int? GetDirectionMinRate(int DirectionRate)
        {
            try
            {
                return _context.Direction.Where(u => u.Rate == DirectionRate).OrderBy(u => u.Rate).FirstOrDefault().Rate;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Direction GetDirectionRate(int rate)
        {
            try
            {
                return _context.Direction.Where(x => x.Rate == rate && x.IsVisible == true).First();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<Direction> GetDirectionTopX(int id)
        {
            return _context.Direction.Where(x => x.IsVisible == true).OrderByDescending(x => x.CreationDate).Take(id).ToList();
        }
        
        
        public Direction GetDirection(string TrName)
        {
            try
            {
                return _context.Direction.Where(x => x.TrName == TrName).First();
            }
            catch
            {
                return null;
            }
            
        }

        public Direction GetDirectionFirst()
        {
            try
            {
                return _context.Direction.First();
            }
            catch
            {
                return null;
            }

        }

        public Direction GetDirectionID(int id)
        {
            try
            {
                return _context.Direction.Where(x => x.Id == id).First();
            }
            catch
            {
                return null;
            }

        }

        public List<Direction> GetDirections3()
        {
            List<Direction> l = _context.Direction.Where(x => x.IsVisible == true && x.Gallery.Count > 0).OrderBy(x => x.Rate).ToList();
            return l;
        }

      
        public List<Direction> GetDirections2()
        {
            List<Direction> l = _context.Direction.Where(x => x.IsVisible == true && x.Places.Count > 0).OrderBy(x => x.Rate).ToList();
            return l;
        }

        public List<Direction> GetDirections()
        {
            return _context.Direction.Where(x=> x.IsVisible == true).OrderBy(x=> x.Rate).ToList();
        }

        public List<Direction> GetDirectionsAll()
        {
            return _context.Direction.OrderBy(x => x.Rate).ToList();
        }

        public List<Direction> GetDirectionsWithout(int actionId)
        {
            List<Direction> list = _context.Direction.OrderBy(x => x.Rate).ToList();
            List<Direction> result = new List<Direction>();
            foreach (Direction direction in list)
            {
                if (direction.ActionDirection.Where(x => x.ActionId == actionId).Count() == 0)
                {
                    result.Add(direction);
                }
            }
            return result;
        }

        public List<Direction> GetDirectionsAllVisible()
        {
            return _context.Direction.Where(x => x.IsVisible == true).OrderBy(x => x.Rate).ToList();
        }

        #endregion

        #region Slider
        public List<Slider> GetSliders(int directionId)
        {
            return _context.Slider.Where(x => x.DirectionId == directionId).ToList();
        }
        #endregion

        #region SiteMap

        public DateTime GetDateIndex()
        {
            return _context.Portfolio.OrderByDescending(x => x.CreationDate).First().CreationDate;
        }

        public DateTime GetDateGallery()
        {
            return _context.Gallery.OrderByDescending(x => x.CreationDate).First().CreationDate;
        }

        public DateTime GetDateActions()
        {
            return _context.Actions.OrderByDescending(x => x.CreationDate).First().CreationDate;
        }

        public DateTime GetDateFeedback()
        {
            return _context.Feedback.OrderByDescending(x => x.CreationDate).First().CreationDate;
        }

        public DateTime GetDateSantorini()
        {
            return _context.Blog.OrderByDescending(x => x.CreationDate).First().CreationDate;
        }

        public DateTime GetDatePortfolio()
        {
            return _context.Portfolio.OrderByDescending(x => x.CreationDate).First().CreationDate;
        }

        #endregion

        #region Блог
        //public byte[] GetImageSanta(int id, int? img)
        //{
        //    switch (img)
        //    {
        //        case 1:
        //            return _context.Blog.Where(x => x.Id == id).First().Image1;
        //        case 2:
        //            return _context.Blog.Where(x => x.Id == id).First().Image2;
        //        case 3:
        //            return _context.Blog.Where(x => x.Id == id).First().Image3;
        //        case 4:
        //            return _context.Blog.Where(x => x.Id == id).First().Image4;
        //        case 5:
        //            return _context.Blog.Where(x => x.Id == id).First().Image5;
        //        case 6:
        //            return _context.Blog.Where(x => x.Id == id).First().Image6;
        //        case 7:
        //            return _context.Blog.Where(x => x.Id == id).First().Image7;
        //        case 8:
        //            return _context.Blog.Where(x => x.Id == id).First().Image8;
        //        case 9:
        //            return _context.Blog.Where(x => x.Id == id).First().Image9;
        //        case -1:
        //            if (_context.Santorini.Where(x => x.Id == id).First().SmallImage != null)
        //                return _context.Santorini.Where(x => x.Id == id).First().SmallImage;
        //            else
        //                return _context.Santorini.Where(x => x.Id == id).First().Image;
        //        case null:
        //            return _context.Santorini.Where(x => x.Id == id).First().Image;
        //        default:
        //            return _context.Santorini.Where(x => x.Id == id).First().Image;
        //    }

        //}

        public void AddSanta(Blog portfolio)
        {
            portfolio.TranslitName = Translit.Translate(portfolio.Name);
            _context.Blog.Add(portfolio);
            _context.SaveChanges();
        }

        public List<Blog> GetSantas()
        {
            return _context.Blog.Where(x => x.IsVisible == true).OrderByDescending(x => x.CreationDate).ToList();
        }

        public void DelSanta(int id)
        {
            try
            {
                Blog portfolio = _context.Blog.Where(x => x.Id == id).First();
                _context.Blog.Remove(portfolio);
                _context.SaveChanges();
            }
            catch
            {

            }
        }

        public Blog GetSanta(string name)
        {
            try
            {
                return _context.Blog.Where(x => x.TranslitName == name).First();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Blog GetSanta(int id)
        {
            try
            {
                return _context.Blog.Where(x => x.Id == id).First();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Blog GetBlogVisible(int id)
        {
            try
            {
                return _context.Blog.Where(x => x.Id == id && x.IsVisible == true).First();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public int? GetBlogMaxId()
        {
            try
            {
                return _context.Blog.Where(u => u.IsVisible == true).OrderByDescending(u => u.Id).FirstOrDefault().Id;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Blog GetBlogLast()
        {
            try
            {
                return _context.Blog.Where(u => u.IsVisible == true).OrderByDescending(u => u.Id).FirstOrDefault();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<Blog> GetBlogTopX(int id)
        {
            return _context.Blog.Where(x => x.IsVisible == true).OrderByDescending(x => x.CreationDate).Take(id).ToList();
        }

        public int? GetBlogMinId()
        {
            try
            {
                return _context.Blog.Where(u => u.IsVisible == true).OrderBy(u => u.Id).FirstOrDefault().Id;
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Все видимые посты + сортировка по дате создания
        /// </summary>
        /// <returns></returns>
        public List<Blog> GetAllBlogVisible()
        {

            return _context.Blog.Where(x => x.IsVisible == true).OrderBy(x => x.CreationDate).ToList();
           
        }

        public List<Blog> GetSantas(int page)
        {
            if (page < 1)
                page = 1;
            return _context.Blog.Where(x => x.IsVisible == true).OrderByDescending(x => x.CreationDate).Skip((page - 1) * _countItemSantorini).Take(_countItemSantorini).ToList();
        }

        public List<Blog> GetSantasNoPage()
        {
            return _context.Blog.Where(x => x.IsVisible == true).OrderByDescending(x => x.CreationDate).ToList();
        }

        public int GetCountPageSanta()
        {
            int page = 0;
            int count = _context.Blog.Where(x => x.IsVisible == true).OrderByDescending(x => x.CreationDate).Count();
            page = count / _countItemSantorini;
            if (count % _countItemSantorini > 0)
            {
                page += 1;
            }
            return page;
        }

        public List<Blog> GetSantasAll(int page)
        {
            if (page < 1)
                page = 1;
            return _context.Blog.OrderByDescending(x => x.CreationDate).Skip((page - 1) * _countItemSantorini).Take(_countItemSantorini).ToList();
        }

        public int GetCountPageSantaAll()
        {
            int page = 0;
            int count = _context.Blog.OrderByDescending(x => x.CreationDate).Count();
            page = count / _countItemSantorini;
            if (count % _countItemSantorini > 0)
            {
                page += 1;
            }
            return page;
        }

        public void UpdateSanta(int id, string text, string name, string shortText, string longText, Blog port, string filedel1, string filedel2, string filedel3, string filedel4, string filedel5, string filedel6, string filedel7, string filedel8, string filedel9, string tag, string smallFiledel)
        {
            Blog portfolio = _context.Blog.Where(x => x.Id == id).First();
            portfolio.Text = text;
            portfolio.ShortText = shortText;
            portfolio.LongText = longText;
            portfolio.Name = name;
            portfolio.TranslitName = Translit.Translate(portfolio.Name);
            portfolio.IsVisible = port.IsVisible;
            portfolio.Tag = tag;

            if (port.Image != null && port.Image != 0)
            {
                portfolio.Image = port.Image;
            }

            if (port.Image1 != null && port.Image1 != 0)
            {
                portfolio.Image1 = port.Image1;
            }

            if (port.Image2 != null && port.Image2 != 0)
            {
                portfolio.Image2 = port.Image2;
            }

            if (port.Image3 != null && port.Image3 != 0)
            {
                portfolio.Image3 = port.Image3;
            }

            if (port.Image4 != null && port.Image4 != 0)
            {
                portfolio.Image4 = port.Image4;
            }

            if (port.Image5 != null && port.Image5 != 0)
            {
                portfolio.Image5 = port.Image5;
            }

            if (port.Image6 != null && port.Image6 != 0)
            {
                portfolio.Image6 = port.Image6;
            }

            if (port.Image7 != null && port.Image7 != 0)
            {
                portfolio.Image7 = port.Image7;
            }

            if (port.Image8 != null && port.Image8 != 0)
            {
                portfolio.Image8 = port.Image8;
            }

            if (port.Image9 != null && port.Image9 != 0)
            {
                portfolio.Image9 = port.Image9;
            }

            if (port.SmallImage != null && port.SmallImage != 0)
            {
                portfolio.SmallImage = port.SmallImage;
            }

            if (filedel1 != null && filedel1.Trim() == "on")
            {
                portfolio.Image1 = null;
            }

            if (filedel2 != null && filedel2.Trim() == "on")
            {
                portfolio.Image2 = null;
            }

            if (filedel3 != null && filedel3.Trim() == "on")
            {
                portfolio.Image3 = null;
            }

            if (filedel4 != null && filedel4.Trim() == "on")
            {
                portfolio.Image4 = null;
            }

            if (filedel5 != null && filedel5.Trim() == "on")
            {
                portfolio.Image5 = null;
            }

            if (filedel6 != null && filedel6.Trim() == "on")
            {
                portfolio.Image6 = null;
            }

            if (filedel7 != null && filedel7.Trim() == "on")
            {
                portfolio.Image7 = null;
            }

            if (filedel8 != null && filedel8.Trim() == "on")
            {
                portfolio.Image8 = null;
            }

            if (filedel9 != null && filedel9.Trim() == "on")
            {
                portfolio.Image9 = null;
            }

            if (smallFiledel != null && smallFiledel.Trim() == "on")
            {
                portfolio.SmallImage = null;
            }

            _context.SaveChanges();
        }
        #endregion

        #region Галерея
        public void AddGallery(Gallery gallery)
        {
            gallery.ImageId = UploadImageRet(new Image() { Data = gallery.Data });
            gallery.Data = null;
            _context.Gallery.Add(gallery);
            _context.SaveChanges();
        }

        public void UpdateGallery(Gallery gallery)
        {
           _context.SaveChanges();
        }

        public byte[] GetGalleryImage(int id)
        {
            return GetImage(_context.Gallery.Where(x => x.Id == id).First().ImageId.Value);
        }

        public List<Gallery> GetGallerysSkip(int skip)
        {
            try
            {
                return _context.Gallery.OrderByDescending(x=>x.Id).Skip(skip).Take(5).ToList();
            }
            catch(Exception exception)
            {
                return null;
            }

        }

        public List<Gallery> GetGallerysAll(int id)
        {
            try
            {
                return _context.Gallery.Where(x => x.DirectionId == id).OrderByDescending(x => x.Id).ToList();
            }
            catch (Exception exception)
            {
                return null;
            }

        }

        public int GetGallerysCount()
        {
            try
            {
                return _context.Gallery.Count();
            }
            catch
            {
                return 0;
            }

        }

        public List<Gallery> GetGallerys(int top)
        {
            try
            {
                return _context.Gallery.OrderByDescending(x=> x.Id).Take(top).ToList();
            }
            catch
            {
                return null;
            }

        }

        public Gallery GetGalleryUpdate(int id)
        {
            try
            {
                return _context.Gallery.Where(x => x.Id == id).First();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public void DelGallery(int id)
        {
            try
            {
                Gallery gallery = _context.Gallery.Where(x => x.Id == id).First();
                _context.Gallery.Remove(gallery);
                _context.SaveChanges();
            }
            catch
            {

            }
        }
        #endregion

        #region Image
        public void UploadAllImg()
        {
            List<Image> list = _context.Image.Where(x => x.Data != null).ToList();
            foreach (Image image in list)
            {
                UploadBlob(image);
                image.Data = null;
                _context.SaveChanges();
            }

        }

        public void UploadAllGallery()
        {
            List<Gallery> list = _context.Gallery.Where(x=> x.Data != null).ToList();
            foreach (Gallery image in list)
            {
                image.ImageId = UploadImageRet(new Image() {Data = image.Data});
                image.Data = null;
                _context.SaveChanges();
            }
            
        }

        public void UploadAllImage()
        {
            List<Image> list = _context.Image.ToList();
            foreach (Image image in list)
            {
                UploadBlob(image);
            }
        }

        public byte[] GetImage(int id)
        {
            CloudBlockBlob blockBlob = this.GetContainer().GetBlockBlobReference(@"Image" + id + @".jpg");
            Stream stream = new MemoryStream();
            blockBlob.DownloadToStream(stream);
            return Utility.ReadToEnd(stream);
        }

        public void UploadBlob(Image model)
        {
            model.Data = ImageHelper.ConvertJPG(model.Data);
            Stream stream = new MemoryStream(model.Data);
            CloudBlockBlob blockBlob = this.GetContainer().GetBlockBlobReference(@"Image" + model.Id + @".jpg");
            blockBlob.UploadFromStream(stream);
        }

        public int UploadImageRet(Image model)
        {
            model.Data = ImageHelper.ConvertJPG(model.Data);
            Stream stream = new MemoryStream(model.Data);
            model.Data = null;
            _context.Image.Add(model);
            _context.SaveChanges();

            CloudBlockBlob blockBlob = this.GetContainer().GetBlockBlobReference(@"Image" + model.Id + @".jpg");
            blockBlob.UploadFromStream(stream);

            return model.Id;
        }

        public void ReplaceFile()
        {
            foreach (Image image in _context.Image.ToList())
            {
                image.Data = ImageHelper.ConvertJPG(GetImage(image.Id));
                UploadBlob(image);
            }
        }


        #endregion

        #region Портфолио
        public byte[] GetImagePortfolio(int id)
        {
            return GetImage(id);
        }

        public void AddPortfolio(Portfolio portfolio)
        {
            portfolio.TranslitName = Translit.Translate(portfolio.Name);
            _context.Portfolio.Add(portfolio);
            _context.SaveChanges();
        }

        public List<Portfolio> GetPortfoliosTop3(int id)
        {
            //Пока для направления мало портфолио, берем все.
            //return _context.Portfolio.Where(x => x.DirectionId == id).OrderByDescending(x => x.CreationDate).Take(3).ToList();
            return _context.Portfolio.OrderByDescending(x => x.CreationDate).Take(3).ToList();
        }

        public List<Portfolio> GetPortfoliosTopX(int id)
        {
            return _context.Portfolio.Where(x => x.IsVisible == true).OrderByDescending(x => x.CreationDate).Take(id).ToList();
        }

        /// <summary>
        /// Все видимые портфолио + сортировка по дате создания
        /// </summary>
        /// <returns></returns>
        public List<Portfolio> GetPortfoliosAllVisible()
        {
            return _context.Portfolio.Where(x=> x.IsVisible == true).OrderByDescending(x => x.CreationDate).ToList();
        }

        /// <summary>
        /// Все портфолио + сортировка по дате создания
        /// </summary>
        /// <returns></returns>
        //public List<Portfolio> GetPortfoliosAll()
        //{
        //    return _context.Portfolio.OrderByDescending(x => x.CreationDate).ToList();
        //}

        public List<Portfolio> GetPortfolios(int page)
        {
            if (page < 1)
                page = 1;
            return _context.Portfolio.Where(x=> x.IsVisible == true).OrderByDescending(x => x.CreationDate).Skip((page - 1) * _countItemPortfolio).Take(_countItemPortfolio).ToList();
        }

        public List<Portfolio> GetPortfoliosNoPage()
        {
            return _context.Portfolio.Where(x => x.IsVisible == true).OrderByDescending(x => x.CreationDate).ToList();
        }

        public List<Portfolio> GetPortfoliosAll(int page)
        {
            if (page < 1)
                page = 1;
            return _context.Portfolio.OrderByDescending(x => x.CreationDate).Skip((page - 1) * _countItemPortfolio).Take(_countItemPortfolio).ToList();
        }


        public int GetCountPagePortfolios()
        {
            int page = 0;
            int count = _context.Portfolio.Where(x => x.IsVisible == true).OrderByDescending(x => x.CreationDate).Count();
            page = count / _countItemPortfolio;
            if (count % _countItemPortfolio > 0)
            {
                page += 1;
            }
            return page;
        }

        public int GetCountPagePortfoliosAll()
        {
            int page = 0;
            int count = _context.Portfolio.OrderByDescending(x => x.CreationDate).Count();
            page = count / _countItemPortfolio;
            if (count % _countItemPortfolio > 0)
            {
                page += 1;
            }
            return page;
        }
        
        public void DelPortfolio(int id)
        {
            try
            {
                Portfolio portfolio = _context.Portfolio.Where(x => x.Id == id).First();
                _context.Portfolio.Remove(portfolio);
                _context.SaveChanges();
            }
            catch
            {
            }
        }

        public Portfolio GetPortfolio(string id)
        {
            try
            {
                return _context.Portfolio.Where(x => x.TranslitName == id).First();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Portfolio GetPortfolio(int id)
        {
            try
            {
                return _context.Portfolio.Where(x => x.Id == id).First();
            }
            catch (Exception)
            {
                return null;
            }
        }


        public Portfolio GetPortfolioVisible(int id)
        {
            try
            {
                return _context.Portfolio.Where(x => x.Id == id && x.IsVisible == true).First();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Portfolio GetPortfolioLast()
        {
            try
            {
                return _context.Portfolio.Where(u => u.IsVisible == true).OrderByDescending(u => u.Id).FirstOrDefault();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public int? GetPortfolioMaxId()
        {
            try
            {
                return _context.Portfolio.Where(u => u.IsVisible == true).OrderByDescending(u => u.Id).FirstOrDefault().Id;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public int? GetPortfolioMinId()
        {
            try
            {
                return _context.Portfolio.Where(u => u.IsVisible == true).OrderBy(u => u.Id).FirstOrDefault().Id;
            }
            catch (Exception)
            {
                return null;
            }
        }


       
        public void UpdatePortfolio(int id, string text, string name, string shortText, string longText, Portfolio port, string filedel1, string filedel2, string filedel3, string filedel4, string filedel5, string filedel6, string filedel7, string filedel8, string filedel9, string smallFiledel, string tag)
        {
            Portfolio portfolio = _context.Portfolio.Where(x => x.Id == id).First();
            portfolio.Text = text;
            portfolio.ShortText = shortText;
            portfolio.LongText = longText;
            portfolio.Name = name;
            portfolio.TranslitName = Translit.Translate(portfolio.Name);
            portfolio.Tag = tag;
            portfolio.IsVisible = port.IsVisible;

            if (port.Image != null && port.Image != 0)
            {
                portfolio.Image = port.Image;
            }

            if (port.Image1 != null && port.Image1 != 0)
            {
                portfolio.Image1 = port.Image1;
            }

            if (port.Image2 != null && port.Image2 != 0)
            {
                portfolio.Image2 = port.Image2;
            }

            if (port.Image3 != null && port.Image3 != 0)
            {
                portfolio.Image3 = port.Image3;
            }

            if (port.Image4 != null && port.Image4 != 0)
            {
                portfolio.Image4 = port.Image4;
            }

            if (port.Image5 != null && port.Image5 != 0)
            {
                portfolio.Image5 = port.Image5;
            }

            if (port.Image6 != null && port.Image6 != 0)
            {
                portfolio.Image6 = port.Image6;
            }

            if (port.Image7 != null && port.Image7 != 0)
            {
                portfolio.Image7 = port.Image7;
            }

            if (port.Image8 != null && port.Image8 != 0)
            {
                portfolio.Image8 = port.Image8;
            }

            if (port.Image9 != null && port.Image9 != 0)
            {
                portfolio.Image9 = port.Image9;
            }

            if (port.SmallImage != null && port.SmallImage != 0)
            {
                portfolio.SmallImage = port.SmallImage;
            }

            if (filedel1 != null && filedel1.Trim() == "on")
            {
                portfolio.Image1 = null;
            }

            if (filedel2 != null && filedel2.Trim() == "on")
            {
                portfolio.Image2 = null;
            }

            if (filedel3 != null && filedel3.Trim() == "on")
            {
                portfolio.Image3 = null;
            }

            if (filedel4 != null && filedel4.Trim() == "on")
            {
                portfolio.Image4 = null;
            }

            if (filedel5 != null && filedel5.Trim() == "on")
            {
                portfolio.Image5 = null;
            }

            if (filedel6 != null && filedel6.Trim() == "on")
            {
                portfolio.Image6 = null;
            }

            if (filedel7 != null && filedel7.Trim() == "on")
            {
                portfolio.Image7 = null;
            }

            if (filedel8 != null && filedel8.Trim() == "on")
            {
                portfolio.Image8 = null;
            }

            if (filedel9 != null && filedel9.Trim() == "on")
            {
                portfolio.Image9 = null;
            }

            if (smallFiledel != null && smallFiledel.Trim() == "on")
            {
                portfolio.SmallImage = null;
            }

            _context.SaveChanges();
        }
       
        #endregion

        #region Place

        public int? GetPlaceMaxId(int TypePlaceID, int DirectionID)
        {
            try
            {
                return _context.Places.Where(u => u.PlaceTypeId == TypePlaceID && u.DirectionId == DirectionID && u.IsEnabled == true).OrderByDescending(u => u.Id).FirstOrDefault().Id;
            }
            catch (Exception)
            {
                return null;
            }
        }


        public int? GetPlaceMinId(int TypePlaceID, int DirectionID)
        {
            try
            {
                return _context.Places.Where(u => u.PlaceTypeId == TypePlaceID && u.DirectionId == DirectionID && u.IsEnabled == true).OrderBy(u => u.Id).FirstOrDefault().Id;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Places GetPlaceLast()
        {
            try
            {
                return _context.Places.Where(u => u.IsEnabled == true).OrderByDescending(u => u.Id).FirstOrDefault();
            }
            catch (Exception)
            {
                return null;
            }
        }


        public List<Places> GetPlacesTopX(int id)
        {
            return _context.Places.Where(x => x.IsEnabled == true).OrderByDescending(x => x.CreationDate).Take(id).ToList();
        }

        public Places GetPlaceTD(int id, int TypePlaceID, int DirectionID)
        {
            try
            {
                return _context.Places.Where(x => x.Id == id && x.PlaceTypeId == TypePlaceID && x.DirectionId == DirectionID && x.IsEnabled == true).First();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public DateTime GetDateIndexPlaces()
        {
            return _context.Places.OrderByDescending(x => x.CreationDate).First().CreationDate;
        }

        public List<Direction> GetPlaceCategories()
        {
            return _context.Direction.ToList();
        }

        public Direction GetPlaceCategoriesFirst()
        {
            return _context.Direction.First();
        }

        public Direction GetPlaceCategorie(string trName)
        {
            return _context.Direction.Where(x => x.TrName == trName).First();
        }

        public List<Places> GetAllPlaces(string trName, int placeTypeId)
        {
            return _context.Places.Include("Pack").Where(x => x.Direction.TrName == trName && x.PlaceTypeId == placeTypeId).OrderBy(x => x.Rate).ToList();
        }

        public List<Places> GetTopXPlaces(string trName, int placeTypeId, int X)
        {
            return _context.Places.Include("Pack").Where(x => x.Direction.TrName == trName && x.PlaceTypeId == placeTypeId && x.IsEnabled == true).OrderBy(x => x.Rate).Take(X).ToList();
        }

        /// <summary>
        /// Получение ТОП-Х мест
        /// </summary>
        /// <param name="trName">направление</param>
        /// <param name="placeTypeId">тип места (рестораны или площадка)</param>
        /// <param name="X">количество мест</param>
        /// <returns></returns>
        public List<Places> GetTopXPlacesAll(string trName, int placeTypeId, int X)
        {
            return _context.Places.Include("Pack").Where(x => x.Direction.TrName == trName && x.PlaceTypeId == placeTypeId).OrderBy(x => x.Rate).Take(X).ToList();
        }

        public List<Places> GetAllPlaces(string trName)
        {
            return _context.Places.Include("Pack").Where(x => x.Direction.TrName == trName).OrderBy(x => x.Rate).ToList();
        }

        public List<Places> GetAllPlacesType(string trName, int type)
        {
            return _context.Places.Include("Pack").Where(x => x.Direction.TrName == trName && x.PlaceTypeId == type).OrderBy(x => x.Rate).ToList();
        }

        public List<Places> GetAllPlaces2()
        {
            return _context.Places.OrderBy(x => x.Rate).ToList();
        }

        /// <summary>
        /// Получить видимые ПЛОЩАДКИ + сортровка по рейтингу
        /// </summary>
        /// <returns></returns>
        public List<Places> GetAllVisiblePlaces()
        {
            return _context.Places.Where(x => x.IsEnabled == true).OrderBy(x => x.Rate).ToList();
        }

        public byte[] GetImagePlace(int id)
        {
            return GetImage(id);
            //switch (img)
            //{
            //    case 1:
            //        return _context.Place.Where(x => x.Id == id).First().Image;
            //    case null:
            //        return _context.Place.Where(x => x.Id == id).First().SmallImage;
            //    default:
            //        return _context.Place.Where(x => x.Id == id).First().SmallImage;
            //}
        }

        public void AddPlace(Places place)
        {
            place.CreationDate = DateTime.Now;
            place.Rate = 0;
            place.TrName = Translit.Translate(place.Name);
            _context.Places.Add(place);
            _context.SaveChanges();
        }

        public void DelPlace(int id)
        {
            try
            {
                Places place = _context.Places.Where(x => x.Id == id).First();
                _context.Places.Remove(place);
                _context.SaveChanges();
            }
            catch(Exception exception)
            {
            }
        }

        public Places GetPlace(string id)
        {
            try
            {
                return _context.Places.Where(x => x.TrName == id).First();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Places GetPlace(int id)
        {
            try
            {
                return _context.Places.Where(x => x.Id == id).First();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public void UpdatePlace(Places place)
        {
            
            _context.SaveChanges();
        }

        public void AddPlacePhoto(PlacesImage placeImage)
        {
            placeImage.CreationDate = DateTime.Now;
            _context.PlacesImage.Add(placeImage);
            _context.SaveChanges();
        }

        public List<PlacesImage> GetPlaceImages(int partnerId)
        {
            return _context.PlacesImage.Where(x => x.PlaceId == partnerId).ToList();
        }

        public void DelPlacePhoto(int id)
        {
            PlacesImage placeImage = _context.PlacesImage.Where(x => x.Id == id).First();
            _context.PlacesImage.Remove(placeImage);
            _context.SaveChanges();
        }

        public void DelPlaceAllPhoto(int id)
        {
            List<PlacesImage> placeImage = _context.PlacesImage.Where(x => x.PlaceId == id).ToList();
            foreach (PlacesImage image in placeImage)
            {
                _context.PlacesImage.Remove(image);
            }
            _context.SaveChanges();
        }

        public byte[] GetImagePlacePhoto(int id)
        {
            return GetImage(id);
        }

        public List<Pack> GetPlacePacks(int placeId)
        {
            return _context.Pack.Where(x => x.PlaceId == placeId).OrderBy(x=> x.SortNumberTab).ToList();
        }

        #endregion

        #region Partner
        public List<Places> GetRes(List<int> listCountry, int countGuests, decimal money, bool isAction, int placeType)
        {
            List<Places> list = _context.Places.Where(x => x.IsEnabled).ToList();
            if (listCountry != null && listCountry.Count > 0)
            {
                list = list.Where(x => listCountry.Contains(x.Direction.CountryId)).ToList();
            }

            //Количество гостей
            if (countGuests > 0)
            {
                list = list.Where(x => x.CountGuests >= countGuests).ToList();
            }

            //Деньги
            if (money > 0)
            {
                list = list.Where(x => x.Pack.Any(y=> y.Price != null && y.Price <= money)).ToList();
            }

            //Наличие акций и скидок
            if (isAction)
            {
                list = list.Where(x => x.ActionPlace.Count > 0 || x.Direction.ActionDirection.Count > 0 || x.Pack.Any(y=> y.ActionPack.Count > 0)).ToList();
            }

            //Площадки или рестораны?
            if (placeType != 0)
            {
                list = list.Where(x => x.PlaceTypeId == placeType).ToList();
            }

            return list;
        }

        /// <summary>
        /// Поиск максимального ID партнера
        /// </summary>
        /// <param name="CategoryId"></param>
        /// <returns></returns>
        public int? GetPartnerMaxIdAll()
        {
            try
            {
                return _context.Partners.OrderByDescending(u => u.Id).FirstOrDefault().Id;
            }
            catch (Exception)
            {
                return null;
            }
        }


        public int? GetPartnerMaxId(int CategoryId)
        {
            try
            {
                return _context.Partners.Where(u => u.CategoryId == CategoryId && u.IsEnabled == true).OrderByDescending(u => u.Id).FirstOrDefault().Id;
            }
            catch (Exception)
            {
                return null;
            }
        }


        public Partners GetPartnerLast()
        {
            try
            {
                return _context.Partners.Where(u => u.IsEnabled == true).OrderByDescending(u => u.Id).FirstOrDefault();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<Partners> GetPartnersTopX(int id)
        {
            return _context.Partners.Where(x => x.IsEnabled == true).OrderByDescending(x => x.CreationDate).Take(id).ToList();
        }

        public int? GetPartnerMinId(int CategoryId)
        {
            try
            {
                return _context.Partners.Where(u => u.CategoryId == CategoryId && u.IsEnabled == true).OrderBy(u => u.Id).FirstOrDefault().Id;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Partners GetPartnerTD(int id, int CategoryId)
        {
            try
            {
                return _context.Partners.Where(x => x.Id == id && x.CategoryId == CategoryId && x.IsEnabled == true).First();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public PartnersImage GetPartnersImageByImageId(int id)
        {
            try
            {
                return _context.PartnersImage.Where(x => x.id == id).First();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public DateTime GetDatePartners()
        {
            return _context.Partners.OrderByDescending(x => x.CreationDate).First().CreationDate;
        }

        public List<PartnerCategory> GetPartnerCategories2()
        {
            return _context.PartnerCategory.Where(x=> x.Partners.Count > 0).ToList();
        }

        public List<PartnerCategory> GetPartnerCategories()
        {
            return _context.PartnerCategory.ToList();
        }

        public PartnerCategory GetPartnerCategoriesFirst()
        {
            return _context.PartnerCategory.First();
        }

        public PartnerCategory GetPartnerCategorie(string trName)
        {
            return _context.PartnerCategory.Where(x=> x.TrName == trName).First();
        }

        public List<Partners> GetAllPartners(string trName)
        {
            return _context.Partners.Where(x => x.PartnerCategory.TrName == trName).OrderByDescending(x=> x.Rating).ToList();
        }

        public List<Partners> GetAllPartners2()
        {
            return _context.Partners.OrderBy(x=> x.Rate).ToList();
        }

        public List<Partners> GetAllPartners3()
        {
            return _context.Partners.OrderBy(x => x.PartnerCategory.Id).ThenBy(x => x.Rate).ToList();
        }

        /// <summary>
        /// Получить видимых партнеров + сортировка по рейтингу
        /// </summary>
        /// <returns></returns>
        public List<Partners> GetOnlyVisiblePartners()
        {
            return _context.Partners.Where(x=> x.IsEnabled == true ).OrderBy(x => x.Rate).ToList();
        }

        public byte[] GetImagePartner(int id)
        {
            return GetImage(id);
        }

        public void AddPartner(Partners partner)
        {
            partner.Description = HtmlSanitizer2.sanitize(partner.Description);
            partner.Description = HtmlSanitizer.SanitizeHtml(partner.Description, null);
            partner.TrName = Translit.Translate(partner.FirstName + " " + partner.LastName);
            partner.ImageProfile = 8280;
            partner.Avatar = 8252;
            partner.Image = 8253;
            partner.Moderated = 0;
            _context.Partners.Add(partner);
            _context.SaveChanges();
        }

        public void PartnerOnModerated(Partners partner)
        {
            
            partner.Moderated = 1;
            _context.SaveChanges();
        }

        
            public void PublicatedOff(Partners partner)
        {
            partner.IsEnabled = false;
            partner.Moderated = 0;
            _context.SaveChanges();
        }

        public void DelPartner(int id)
        {
            try
            {
                Partners partner = _context.Partners.Where(x => x.Id == id).First();
                _context.Partners.Remove(partner);
                _context.SaveChanges();
            }
            catch(Exception exception)
            {

            }
        }

        public Partners GetPartner(string id)
        {
            try
            {
                return _context.Partners.Where(x => x.TrName == id).First();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Partners GetPartner(int id)
        {
            try
            {
                return _context.Partners.Where(x => x.Id == id).First();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public void UpdatePartner(Partners part)
        {

            part.Description = HtmlSanitizer2.sanitize(part.Description);
            part.Description = HtmlSanitizer.SanitizeHtml(part.Description, null);
            //part.TrName = Translit.Translate(part.FirstName + " " + part.LastName);
            _context.SaveChanges();
        }

        public void SavePartner(Partners part)
        {
            _context.SaveChanges();
        }

        public void AddPartnerPhoto(PartnersImage partnerImage)
        {
            partnerImage.CreationDate = DateTime.Now;
            _context.PartnersImage.Add(partnerImage);
            _context.SaveChanges();
        }

        public List<PartnersImage> GetPartnerImages(int partnerId)
        {
            return _context.PartnersImage.Where(x => x.PartnerId == partnerId).ToList();
        }

        public void DelPartnerPhoto(int id)
        {
            PartnersImage partnerImage = _context.PartnersImage.Where(x => x.id == id).First();
            _context.PartnersImage.Remove(partnerImage);
            _context.SaveChanges();
        }

        public void DelPartnerAllPhoto(int id)
        {
            List<PartnersImage> partnerImage = _context.PartnersImage.Where(x => x.PartnerId == id).ToList();
            foreach (PartnersImage image in partnerImage)
            {
                _context.PartnersImage.Remove(image);
            }
            _context.SaveChanges();
        }

        public byte[] GetImagePartnerPhoto(int id)
        {
            return GetImage(id);
        }

        #endregion

        #region Wedding
        public void AddWedding(Wedding partner)
        {
            partner.Description = HtmlSanitizer2.sanitize(partner.Description);
            partner.Description = HtmlSanitizer.SanitizeHtml(partner.Description, null);
            partner.TrName = Translit.Translate(partner.Name);
            partner.Moderated = 0;
            partner.CreationDate = DateTime.Now;
            partner.Date = DateTime.Now;
            _context.Wedding.Add(partner);
            _context.SaveChanges();
        }

        public List<Wedding> GetWeddings(bool isEnabled)
        {
            try
            {
                return _context.Wedding.Where(x => x.IsEnabled == isEnabled).ToList();
            }
            catch (Exception exception)
            {
                return new List<Wedding>();
            }
        }
        #endregion
    }
}