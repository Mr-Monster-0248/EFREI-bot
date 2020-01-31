import * as request from "request";
import * as cheerio from 'cheerio';

export interface MajorCard {
    readonly img: string,
    readonly title: string,
    readonly descript: string,
    readonly link: string
}

export async function getMajeures() {
    return new Promise<MajorCard[]>((resolve, reject) => {
        const url =
            "https://www.efrei.fr/programme-grande-ecole/le-cycle-ingenieur/majeures-specialisation/";
        let tab: MajorCard[] = [];
        request(url, (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);

                $(".element-anime").each((i, elem) => {
                    let text: string = <string>$(elem).find(".imgbg").attr("style");
                    tab[i] = {
                        img: text.substring(16, text.length - 3),
                        descript: $(elem).find("p").text(),
                        title: $(elem).find("h3").text(),
                        link: <string> $(elem).find("a").attr("href")
                    }
                });
            } else {
                reject("Could not resolve url");
            }

            resolve(tab);
        });
    });
}
