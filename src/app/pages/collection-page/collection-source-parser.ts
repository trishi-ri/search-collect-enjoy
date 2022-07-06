import { RandomUtils } from 'src/app/utils/random.utils';
import { CollectionSource as CollectionSource } from './collection-generator.service';

interface PatternElement {
  visit(visitor: PatternElementVisitor): void;
}

interface PatternElementVisitor {
  visitWord(word: ParserWord): void;
  visitDictionary(dictionary: ParserDictionary): void;
  visitContextParameter(contextParameter: ParserContextParameter): void;
}

class ParserWord implements PatternElement {
  constructor(public value: string) {}
  visit(visitor: PatternElementVisitor): void {
    visitor.visitWord(this);
  }
}

class ParserDictionary implements PatternElement {
  constructor(
    public source: CollectionSource,
    public dictionaryName: keyof CollectionSource['dictionaries']
  ) {}
  visit(visitor: PatternElementVisitor): void {
    visitor.visitDictionary(this);
  }
}

class ParserContextParameter implements PatternElement {
  constructor(
    public context: Record<string, string>,
    public parameterKey: string
  ) {}
  visit(visitor: PatternElementVisitor): void {
    visitor.visitContextParameter(this);
  }
}

export class ParsedString implements PatternElementVisitor {
  constructor(public result: string = '') {}

  visitWord(word: ParserWord): void {
    this.result = [this.result, word.value].join(' ');
  }

  visitDictionary(dictionary: ParserDictionary): void {
    const elements = dictionary.source.dictionaries[dictionary.dictionaryName];
    this.result = [this.result, RandomUtils.getRandomElement(elements)].join(
      ' '
    );
  }

  visitContextParameter(contextParameter: ParserContextParameter): void {
    this.result = [
      this.result,
      contextParameter.context[contextParameter.parameterKey],
    ].join(' ');
  }
}

const getParsedObjects = (
  source: CollectionSource,
  pattern: string,
  context: Record<string, string> = {}
): PatternElement[] =>
  pattern.split(' ').map((word: string) => {
    const dictionaryRegexResult = word.match(
      new RegExp(JSON.parse(source.patternParsers.dictionary))
    );
    if (dictionaryRegexResult) {
      return new ParserDictionary(
        source,
        dictionaryRegexResult[1] as keyof CollectionSource['dictionaries']
      );
    }

    const contextParameterRegexResult = word.match(
      new RegExp(JSON.parse(source.patternParsers.contextParameter))
    );
    if (contextParameterRegexResult) {
      return new ParserContextParameter(
        context,
        contextParameterRegexResult[1]
      );
    }

    return new ParserWord(word);
  });

export const generateFromSource = (
  source: CollectionSource,
  pattern: string,
  context: Record<string, string> = {}
): string => {
  const parsedString = new ParsedString();
  getParsedObjects(source, pattern, context).forEach((obj) =>
    obj.visit(parsedString)
  );
  return parsedString.result;
};
