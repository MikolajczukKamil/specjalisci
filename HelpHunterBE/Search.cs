public class SearchCriteria
{
    public string Location { get; set; }
    public decimal PriceMax { get; set; }
    public decimal PriceMin { get; set; }
    public string CategoryOrServiceName { get; set; }
    public decimal RatingMax { get; set; }
    public decimal RatingMin { get; set; }
    public float UserCoordinateX { get; set; }
    public float UserCoordinateY { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
}