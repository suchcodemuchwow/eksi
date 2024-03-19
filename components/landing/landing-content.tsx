import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Josh",
    avatar: "J",
    img: "https://yt3.googleusercontent.com/BOomnT3SS1g-FQSUVBy51TaK2ylqbQzD8zeV783mM-W1q3MMbvE8jdjEeWwFqHmlm5Dk4dSAtg=s176-c-k-c0x00ffffff-no-rj",
    title: "Software Engineer",
    description: "This is the best app I've ever used! 🤩 I use it every day! 📅 It's so easy to use and it's awesome! 🎉",
  },
  {
    name: "Sonny",
    avatar: "S",
    img: "https://yt3.googleusercontent.com/FjeN785fVWx0Pr6xCbwPhhq8hHj_gocc3FygDXYDEQgp2gE_FQzRNsFHFAjQ3oE-VJaeGR1a=s176-c-k-c0x00ffffff-no-rj",
    title: "Developer",
    //add long testimonial with emoji and line breaks
    description:
      "This app has changed my life, cannot imagine working without it! 🤩\n\nThe best in class, definitely worth the premium subscription! 🎉",
  },
  {
    name: "Lee",
    avatar: "L",
    img: "https://yt3.googleusercontent.com/WfEqekfCKp7ZOAuFAOY6mJ6mM9vyfZsSJOVgNTkON4iCZ7k5GdfEmnzvO4OBlaO8m4_oJbsu-Q=s176-c-k-c0x00ffffff-no-rj",
    title: "Developer Advocate",
    description: "This app has changed my life, cannot imagine working without it!",
  },
  {
    name: "Theo",
    avatar: "T",
    img: "https://yt3.googleusercontent.com/4NapxEtLcHQ6wN2zA_DMmkOk47RFb_gy6sjSmUZGg_ARHjlIUjFsrNFddrcKMkTYpBNxCp3J=s176-c-k-c0x00ffffff-no-rj",
    title: "CEO of ping.gg",
    description: "The best in class, definitely worth the premium subscription!",
  },
];

export const LandingContent = () => {
  return (
    <div className={"px-10"}>
      <div className={"grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}>
        {testimonials.map((item) => (
          <Card key={item.description} className={"flex h-full flex-col justify-between"}>
            <CardContent className={"px-6 pt-4"}>
              <p className={"text-md font-semibold italic text-slate-700"}>{'"' + item.description + '"'}</p>
            </CardContent>
            <CardHeader>
              <CardTitle className={"flex items-center gap-x-2"}>
                <div className={"flex items-center"}>
                  <Avatar className={"mr-4 h-full"}>
                    <AvatarImage src={item.img} alt={item.name} />
                    <AvatarFallback>{item.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className={"text-lg"}>{item.name}</p>
                    <p className={"text-xs text-muted-foreground"}>{item.title}</p>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
