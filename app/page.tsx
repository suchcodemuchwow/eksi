import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plate } from "@udecode/plate-common";


const basliklar = [
  "gündem",
  "debe",
  "sorunsallar",
  "#spor",
  "#iliskiler",
  "#siyaset",
  "#seyahat",
  "#tv",
  "#muzik",
  "#haber",
  "#bilim",
  "#egitim",
  "#ekonomi",
  "basiboslar",
  "tum kanallar",
];

const gundem = [
  "boş tencerenin yıkamayacağı iktidar yoktur 153",
  "fiyatların çıldırmış olması 416",
  "ibb kent lokantası ve kreşlerinin kiralık çıkması 104",
  "ayasofya'da yunan bayrağı açılması 169",
  "kocaeli'nde konteyner gemisinin vinçleri yıkması 23",
  "fenerbahçe futbol takımı nisan 2024 fikstürü 177",
  "turgut altınok'un 5 milyon metrekarelik tarlası 452",
  "ilk erkeğim değilsin ama son erkeğim olacaksın 55",
  "rte'nin erzurum mitinginde yaşanan histerik dram 42",
  "sekülerlerin muhafazakarlara olan anlamsız kini 120",
  "gibi (dizi) 383",
  "canan karatay'ın kaju yemeyin açıklaması 64",
  "kürtçe öğrenmeyi sorumluluk kabul ediyorum 99",
  "büzüğüm yemiyor diyerek araçtan inmeyen sürücü 319",
  "hasan imamoğlu'nun kazdağları'ndaki arsası 22",
  "sırp denince akla gelenler 145",
  "7 nisan 2024 galatasaray fenerbahçe maçı 127",
  "kredi kartı nakit çekim faiz oranına zam gelmesi 125",
  "transfermarkt.com.tr 47",
  "ekrem imamoğlu 119",
  "karşı cinsle tokalaşmayan türbanlı kadın 31",
  "dünyanın en kötü tatlısı 301",
  "fenerbahçe 27",
  "30 yaşında saçın beyazlaması 132",
  "manisa'da polis tarafından tekmelenen sürücü 144",
  "turgut altınok'un malvarlığını kısmen açıklaması 312",
  "kocası vefat etmiş teyzeye yürüyen dede 191",
  "turgut altınok 60",
  "kadınların sürekli gezmek istemesi 91",
  "kadınların evin içinde kötü giyinmesi 84",
  "ikinci el otomobil piyasası 28",
  "ibb ile cengiz holding'in işbirliği belgeleri 24",
  "cennetten indiği düşünülen melodi 16",
  "deprem çantamda rabbim ve ümmet var 25",
  "cevizli baklavanın fıstıklıdan daha güzel olması 109",
  "anne mi önce gelir yoksa eş mi sorunsalı 143",
  "31 mart 2024 yerel seçimleri 51",
  "işyerindeki müdürüne müdürüm diyen tip 25",
  "bir kadının kalitesiz oldugunu gösteren detaylar 53",
  "yalı çapkını (dizi) 25",
  "kızılcık şerbeti (dizi) 253",
  "havlayan köpeğin sahibine 677 bin lira ceza 41",
  "nesrin sipahi 40",
  "beyaz yakalıların en büyük sorunu 87",
  "stres + umutsuzluk + karamsarlık + üzüntü + korku 154",
  "ermenistan'ın ab üyeliği 182",
  "müzik öğretmeninin flüt çalamayana bir vermesi 31",
  "davutpaşa kütüphanesine sıçan memur çocuğu 55",
  "türk hava yolları düşük profil rezaleti 185",
  "ülkeyi terkeden doktora söylenmek istenenler 96",
];

function extractNumbers(arr: Array<string>) {
  return arr.map((item) => {
    const likeCount = item.match(/\d+/)![0]!;
    const title = item.replace(likeCount, "").trim();
    return { likeCount, title };
  });
}

// const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

const initialValue = [
  {
    children: [
      {
        text: "This is editable plain text with react and history plugins, just like a <textarea>!",
      },
    ],
    type: "p",
  },
];

export default function Page() {
  return (
    <div>
      <div className="px-48">
        <nav className="flex justify-between py-2">
          <Link href="/">
            <Button variant="ghost">👨🏻‍💻 kodcuSozluk</Button>
          </Link>
          <div className="flex w-80">
            <Input className="h-7 rounded-r-none border-r-0 text-xs " placeholder="baslik, #etiket, @kullanici_adi" />
            <Button className="rounded-l-none" size="xs">
              <SearchIcon size={12} />
            </Button>
          </div>
          <div>
            <Link href="/login">
              <Button size="sm" variant="link">
                giris
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" variant="link">
                kayit ol
              </Button>
            </Link>
          </div>
        </nav>
        <div className="flex w-full items-center justify-between px-8">
          {basliklar.map((baslik) => (
            <Link key={baslik} href={`/baslik/${baslik}`}>
              <Button size="sm" variant="ghost">
                {baslik}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      <Separator />
      <div className="flex px-48">
        <div className="h-screen py-4">
          <ScrollArea className="h-full w-64">
            <div className="pr-4">
              <div className="flex flex-col gap-y-4">
                <h4 className="text-xl font-medium leading-none">gündem</h4>
                {extractNumbers(gundem).map((g) => (
                  <Button
                    key={g.title}
                    className="flex justify-between gap-x-5 text-wrap px-0 text-left text-xs font-normal text-neutral-900"
                    variant="ghost"
                  >
                    <span className="">{g.title}</span>
                    <span className="text-neutral-500">{g.likeCount}</span>
                  </Button>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
        <div className="flex-1">
          <div className="px-2 py-8">
            <h1 className="text-xl font-extrabold text-gray-800">yeni başlayanlar için felsefe</h1>
            <p>
              {`felsefe son derece teknik bir uğraştır.

                evet sophienin dünyası veya action philosphers(plato smash*) okuyup gaza gelenler, kıtacılar veya dücanegillerin hakikat pornoculuğuna tutulanlar, felsefe yapmayı kimlik projelerine alet edenler, x şeyin felsefesi var deyip o şeyin kalitesini buna mal edenler vs. vs. yani felsefenin popüler kültürdeki yansımalarıyla işin içine gerçekten girdiğinizdeki şey bir değil.

                yani bu iş çok teknik bir iş olduğu için sıkıcıdır da.

                umberto eco gibi sevdiğiniz bir yazarın bile felsefe üzerine makalelerine (örneğin; kant ve ornitorek kitabı) katlanamazsınız felsefeden baydığınız bir dönemdeyseniz. yok dynamic numenon, yok semiotik, yok signifier başınızı ağrıtmak dışında bir şeye yaramaz.`}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
