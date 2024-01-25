using System.ComponentModel.DataAnnotations;

namespace HelpHunterBE.Dto
{
    public class RatingDto
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int ReviewerId { get; set; }

        public string? ReviewerName { get; set; }

        public int? ReviewerAvatar {  get; set; }

        [Required]
        [Range(1, 5)]
        public int Rating { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string Comment { get; set; }

        public RatingDto() { }

        public override string ToString()
        {
            return $"RatingDto(Id={Id}, UserId={UserId}, ReviewerId={ReviewerId}, Rating={Rating}, Comment={Comment})";
        }
    }
}
