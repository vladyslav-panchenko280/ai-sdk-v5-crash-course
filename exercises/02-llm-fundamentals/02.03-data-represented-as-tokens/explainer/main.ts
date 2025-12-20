import { Tiktoken } from 'js-tiktoken/lite';
import o200k_base from 'js-tiktoken/ranks/o200k_base';

const tokenizer = new Tiktoken(
  // NOTE: o200k_base is the tokenizer for GPT-4o
  o200k_base,
);

const tokenize = (text: string) => {
  return tokenizer.encode(text);
};

const DATA = [
  {
    url: 'https://aihero.dev',
    title: 'AI Hero',
  },
  {
    url: 'https://totaltypescript.com',
    title: 'Total TypeScript',
  },
  {
    url: 'https://mattpocock.com',
    title: 'Matt Pocock',
  },
  {
    url: 'https://twitter.com/mattpocockuk',
    title: 'Twitter',
  },
];

const asXML = DATA.map(
  (item) =>
    `<item url="${item.url}" title="${item.title}"></item>`,
).join('\n');

const asJSON = JSON.stringify(DATA, null, 2);

const asMarkdown = DATA.map(
  (item) => `- [${item.title}](${item.url})`,
).join('\n');

// TOON format - Token-Oriented Object Notation
// Tabular format: [count]{fields}:\nvalues
const asTOON = `[${DATA.length}]{url,title}:
${DATA.map((item) => `${item.url},${item.title}`).join('\n')}`;

console.log('TOON tokens:', tokenize(asTOON).length);
console.log(asTOON);
console.log('--------------------------------');
console.log('Markdown tokens:', tokenize(asMarkdown).length);
console.log(asMarkdown);
console.log('--------------------------------');
console.log('XML tokens:', tokenize(asXML).length);
console.log(asXML);
console.log('--------------------------------');
console.log('JSON tokens:', tokenize(asJSON).length);
console.log(asJSON);
