using GeoCoordinatePortable;


namespace HelpHunterBE.Utils
{
    public static class Utils
    {
        public static double? CalculateDistance(decimal? lat1, decimal? lon1, decimal? lat2, decimal? lon2)
        {
            if (lat1 != null & lon1 != null & lat2 != 0 & lon2 != 0)
            {
                GeoCoordinate pin1 = new GeoCoordinate(Convert.ToDouble(lat1), Convert.ToDouble(lon1));
                GeoCoordinate pin2 = new GeoCoordinate(Convert.ToDouble(lat2), Convert.ToDouble(lon2));

                Console.WriteLine(pin1.GetDistanceTo(pin2));
                return pin1.GetDistanceTo(pin2); // Returned value in meters
            }
            else
            {
                return null;
            }

        }
    }
}