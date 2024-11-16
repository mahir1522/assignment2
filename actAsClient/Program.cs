using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using actAsCLient.Models;
using System.Text;
using System.Linq.Expressions;



var url = "http://localhost:3000";
var endpoint_getLanguages = "/api/languages";
var endpoint_getTimeOfDay = "/api/timesofday";
var endpoint_getGreet = "/api/Greet";

using (HttpClient client = new HttpClient())
{
    while (true)
    {
        try
        {

            //will fetch lanaguages
            HttpResponseMessage getLanguage = await client.GetAsync(url + endpoint_getLanguages);
            string jsonGetLanguage = await getLanguage.Content.ReadAsStringAsync();
            Console.WriteLine("--------------Laguages are as follo-w------------");

            List<string> languages = JsonSerializer.Deserialize<List<string>>(jsonGetLanguage);
            foreach (var lan in languages)
            {
                System.Console.WriteLine("Languages are: " + lan);
            }
            Console.WriteLine("\n\n");


            Console.WriteLine("Please enter language: ");
            string userLan = Console.ReadLine();
            Console.WriteLine("\n\n");


            //will fetch timeofday
            HttpResponseMessage getTimeOfDay = await client.GetAsync(url + endpoint_getTimeOfDay);
            string jsonGetTimeOfDay = await getTimeOfDay.Content.ReadAsStringAsync();
            List<string> timeofday = JsonSerializer.Deserialize<List<string>>(jsonGetTimeOfDay);


            Console.WriteLine("--------------time of day are as follow-------------");

            foreach (var time in timeofday)
            {
                System.Console.WriteLine("Time of day: " + time);
            }
            Console.WriteLine("\n\n");




            Console.WriteLine("Please enter time of day");
            string userTimeOfDay = Console.ReadLine();


            Console.WriteLine("\n\n");



            Console.WriteLine("Please enter tone you want (Formal or Casual)");
            string userTone = Console.ReadLine();


            var postData = new
            {
                language = userLan,
                timeOfDay = userTimeOfDay,
                tone = userTone
            };

            string jsonPostData = JsonSerializer.Serialize(postData);
            StringContent content = new StringContent(jsonPostData, Encoding.UTF8, "application/json");

            HttpResponseMessage response = await client.PostAsync(url + endpoint_getGreet, content);

            string greetingString = await response.Content.ReadAsStringAsync();
            Console.WriteLine(greetingString);

            Console.WriteLine("\n\n");
            Console.WriteLine("\nPress Ctrl + C to exit, or continue...\n");
        }
        catch (Exception ex)
        {
            Console.WriteLine("\nAn error occurred: " + ex.Message);
            Console.WriteLine("Please try again");
        } 
    }
}