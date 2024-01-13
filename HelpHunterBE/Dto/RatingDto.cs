using System.ComponentModel.DataAnnotations;

namespace HelpHunterBE.Dto
{
    public class RatingDto
    {
        public int Id { get; set; }

        [Required]
        public int SpecialistId { get; set; }

        [Required]
        public int ReviewerId { get; set; }

        [Required]
        [Range(1, 5)]
        public int Rating { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string Comment { get; set; }

        public RatingDto() { }

        public override string ToString()
        {
            return $"RatingDto(Id={Id}, SpecId={SpecialistId}, ReviewerId={ReviewerId}, Rating={Rating}, Comment={Comment})";
        }
    }
}
