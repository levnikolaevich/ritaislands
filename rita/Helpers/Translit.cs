using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace rita.Helpers
{
    public static class Translit
    {
        private static readonly char[] cyrArr = {'А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П',
'Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я',
'а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п',
'р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я'};


        private static readonly string[] latArr = {"A","B","V","G","D","E","YO","ZH","Z","I","Y","K","L","M","N","O","P",
"R","S","T","U","F","H","C","CH","SH","SCH","~","Y","'","E","YU","YA",
"a","b","v","g","d","e","yo","zh","z","i","y","k","l","m","n","o","p",
"r","s","t","u","f","h","c","ch","sh","sch","","y","","e","yu","ya"};

        private static Int32[] displacementArr;
        private static Int32 minValue = Int32.MaxValue;
        private static Int32 maxValue = Int32.MinValue;

        static Translit()
        {
            Int32 val;
            for (Int32 i = 0; i < cyrArr.Length; i++)
            {
                val = (Int32)cyrArr[i];
                if (val < minValue) minValue = val;
                if (maxValue < val) maxValue = val;
            }
            Int32 delta = maxValue - minValue;
            displacementArr = new Int32[delta + 1];
            for (Int32 i = 0; i < displacementArr.Length; i++)
                displacementArr[i] = -1;
            for (int i = 0; i < cyrArr.Length; i++)
            {
                val = (Int32)cyrArr[i];
                delta = val - minValue;
                displacementArr[delta] = i;
            }
            cyrArr = null;
        }

        public static string Translate(string sourseStr)
        {
            char[] sourseCArr = sourseStr.Replace("_", "").Replace("-", "").Replace(" ", "-").Replace(@"""", "").Replace(",", "").Replace(".", "").Replace(":", "").Replace(";", "").Replace("?", "").Replace("&", "").ToCharArray();
            StringBuilder sb = new StringBuilder(sourseStr.Length * 2);
            Int32 val;
            Int32 displacement;
            for (Int32 i = 0; i < sourseCArr.Length; i++)
            {
                val = (Int32)sourseCArr[i];
                if (val < minValue || maxValue < val)
                {
                    sb.Append(sourseCArr[i]);
                }
                else
                {
                    displacement = displacementArr[val - minValue];
                    if (displacement < 0)
                    {
                        sb.Append(sourseCArr[i]);
                    }
                    else
                    {
                        sb.Append(latArr[displacement]);
                    }
                }
            }
            return sb.ToString();
        }
    }
}