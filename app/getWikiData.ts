import * as cheerio from 'cheerio';

export default async function getWikiData(page: string) {
  const res = await fetch(`https://wiki.ktolliver.org/api/wiki.php?page=${page}`);
  const html = await res.text();

  const $ = cheerio.load(html);
  $('a.folder').removeAttr('href');
  $('a.folder').css('cursor', 'default');
  $('a.wikilink1').removeAttr('href');
  $('a.wikilink1').css('cursor', 'default');
  $('.media').removeAttr('href');
  $('.media').css('cursor', 'default');

  return $.html(); // Return the modified HTML
}
